# Heap (Priority Queue) Problems

## Basic Heap Operations
1. **Kth Largest Element in Array** (#215) - Find kth largest using min heap
2. **Last Stone Weight** (#1046) - Simulate stone collisions
3. **K Closest Points to Origin** (#973) - Find k closest points
4. **Top K Frequent Elements** (#347) - Most frequent k elements
5. **Kth Smallest Element in Sorted Matrix** (#378) - Kth smallest in matrix

## Two Heaps Pattern
1. **Find Median from Data Stream** (#295) - Maintain median with two heaps
2. **Sliding Window Median** (#480) - Median in sliding window
3. **IPO** (#502) - Maximize capital with constraints

## Merge K Sorted
1. **Merge k Sorted Lists** (#23) - Merge linked lists using heap
2. **Smallest Range Covering Elements from K Lists** (#632) - Find smallest range
3. **Find K Pairs with Smallest Sums** (#373) - K pairs with smallest sums

## Scheduling Problems
1. **Meeting Rooms II** (#253) - Minimum meeting rooms needed
2. **Task Scheduler** (#621) - Schedule tasks with cooling time
3. **Reorganize String** (#767) - Rearrange string so no adjacent duplicates
4. **Rearrange String k Distance Apart** (#358) - K distance constraint

## Advanced Heap Problems
1. **Trapping Rain Water II** (#407) - 2D rain water trapping
2. **The Skyline Problem** (#218) - Building skyline using events
3. **Ugly Number II** (#264) - Generate ugly numbers
4. **Super Ugly Number** (#313) - Ugly numbers with custom primes

## Design Problems
1. **Design Twitter** (#355) - Social media timeline with heap
2. **Show the Most Recent Three Orders** - Real-time order tracking

## Dijkstra's Algorithm
1. **Network Delay Time** (#743) - Shortest path using Dijkstra
2. **Path with Maximum Minimum Value** (#1102) - Maximize minimum on path
3. **Swim in Rising Water** (#778) - Minimum time to reach destination

## Key Patterns
- **Top K**: Use heap of size k for memory efficiency
- **Two Heaps**: Max heap for smaller half, min heap for larger half
- **K-way Merge**: Merge multiple sorted sequences
- **Scheduling**: Use heap to track next available time/resource

## Implementation Notes
- Python: `heapq` module (min heap only, negate for max heap)
- Time Complexity: Insert/Delete O(log n), Peek O(1)
- Space Complexity: O(n) for heap storage