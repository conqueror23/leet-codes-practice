## Ref

Functional Requirements

- upload a file

- download a file

- automatically Sync files across Devices



Out of Scope: 

- roll own blog storage



Non-functional requirements

- availability >> consistentcy

- low latency upload and download (ALAP)

- suppport large files as 50gb

	- resumable uplaods

-high data integrity( higth accuracy )



Core Entities

- File (raw bytes)

- File Metadata

- Users



API: 

Post /file ->200

body: File & FileMetadata

Get /files/:fieldId -> file & FilMatadata

Get /changes?since={timestamp}->file Metadata[]

[HelloInterview](https://www.hellointerview.com/learn/system-design/problem-breakdowns/dropbox)
[Design - DrawIo](https://app.diagrams.net/#G1Ujw7qA6V2qn35YmCyvTU3Urcqe51AnqB#%7B%22pageId%22%3A%22MQbOCa7r-FUt8ItRq1s7%22%7D)
[Claude Analysis](https://claude.ai/chat/c553413d-b54c-44b3-ad5f-02e3a3d7db4e)

[ChatGpt Analysis](https://chatgpt.com/g/g-p-6a350f5455888191b2ebca7fc9e3c217-system-design/c/6a76a6fa-4d94-83ec-887b-c1a4755040fa)

### Gemini Questions
Your system design covers the core architectural building blocks for a scale Dropbox/Google Drive clone (client-side chunking, pre-signed S3 URLs, metadata schemas, and delta sync concepts).

---

### **System Design Analysis**

**Strengths:**

* **Correct Data-Path Separation:** You offload heavy byte transfers to S3 via pre-signed URLs, keeping your API gateway and microservices lightweight.
* **Client-Side Intelligence:** Handing chunking (5MB chunks), fingerprinting (hash calculation), and OS-level file monitoring (`FileSystemWatcher`/`FSEvents`) on the client reduces server overhead significantly.
* **Schema Granularity:** Defining a dedicated `Chunks` schema alongside `File Metadata` shows you understand how block-level storage works in distributed file systems.

**Gaps & Weaknesses:**

* **Sync Efficiency:** The notes mention polling ("pull for changes" / "adaptive polling"), which doesn't scale well for real-time synchronization compared to long-polling or WebSockets.
* **No Cache Layer:** Lacks an in-memory caching tier (e.g., Redis) for active metadata or session cursors.
* **Conflict Resolution:** Lacks a strategy for handling concurrent edits on the same file across multiple devices.

---

### **Top Interview Questions & How to Answer Them**

**1. "How do you handle conflict resolution when two users edit the same file simultaneously?"**

* **Answer:** Use a **Last-Write-Wins (LWW)** model combined with **Conflict Files**:
1. The server tracks file versions using a monotonically increasing version number or vector clock in Postgres.
2. If Client B tries to commit a update based on `v1`, but the server is already at `v2`, the server rejects Client B’s commit.
3. Client B saves their local changes as a separate file (e.g., `Document (Conflicted Copy from Device B).docx`) and syncs that as a new file so no data is lost.



**2. "Instead of adaptive polling, how would you scale real-time file updates across millions of devices?"**

* **Answer:** Switch from polling to a **Push-Notification Model**:
1. Maintain persistent connections using **WebSockets** or **Server-Sent Events (SSE)** via a dedicated Notification Service.
2. When a file change is committed to Postgres, emit an event to a Redis Pub/Sub or Kafka topic.
3. The Notification Service consumes the event and pushes a light ping to connected devices telling them to pull updates using their sync `cursor`.
4. Fall back to long-polling only for clients behind strict corporate firewalls.



**3. "How does cross-user deduplication work, and what are its security implications?"**

* **Answer:**
1. **How it works:** Before uploading a chunk, the client sends its SHA-256 fingerprint to the server. If the hash already exists in the `Chunks` table, the server skips the S3 upload and simply links the chunk ID to the user's file metadata.
2. **Security Risk (Convergent Encryption attack):** If an attacker knows a file's hash, they could query the API to confirm if someone else uploaded that exact file.
3. **Mitigation:** Perform deduplication only within the same user's scope or enterprise tenant, or use convergent encryption with secret salts.



**4. "How do you ensure data consistency for multi-chunk uploads if an upload fails midway?"**

* **Answer:**
1. Use S3's **Multipart Upload API**. When an upload begins, request an `UploadId` from S3.
2. The client uploads chunks directly using the `UploadId` and chunk indices.
3. Once all chunks are finished, the client notifies the `File Service`, which calls S3 `CompleteMultipartUpload`.
4. If chunks are missing or time out, a background cleanup worker aborts uncommitted multipart uploads in S3 to prevent orphaned storage costs.



**5. "How would you shard the File Metadata Postgres database as traffic grows?"**

* **Answer:**
* **Shard Key:** Shard by `UserId` (or `OwnerId`). All metadata and folder structures for a single user live on the same database shard, avoiding cross-shard joins for directory views.
* **Global Index / Lookup:** Use a lightweight lookup service or cache mapping `UserId -> ShardId`.
* **Alternative:** Transition metadata storage to a distributed NoSQL database like **Cassandra** or **DynamoDB**, indexing files by `UserId` as the partition key and `Path` or `FileId` as the sort key.
