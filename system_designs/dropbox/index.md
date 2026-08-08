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

