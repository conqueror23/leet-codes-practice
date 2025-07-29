/**
 * 435. Non-overlapping Intervals - Medium
 * 
 * Given an array of intervals intervals where intervals[i] = [starti, endi], 
 * return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
 */

function eraseOverlapIntervals(intervals: number[][]): number {
    if (intervals.length <= 1) return 0;
    
    // Advanced greedy: Sort by end time (Activity Selection Problem)
    // Time: O(n log n), Space: O(1)
    intervals.sort((a, b) => a[1] - b[1]);
    
    let nonOverlapping = 1; // First interval is always included
    let lastEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        // If current interval doesn't overlap with last selected
        if (intervals[i][0] >= lastEnd) {
            nonOverlapping++;
            lastEnd = intervals[i][1];
        }
        // Otherwise, current interval overlaps and should be removed
    }
    
    return intervals.length - nonOverlapping;
}

// Alternative: Sort by start time with tracking
function eraseOverlapIntervalsStartSort(intervals: number[][]): number {
    if (intervals.length <= 1) return 0;
    
    intervals.sort((a, b) => a[0] - b[0]);
    let removals = 0;
    let prevEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            // Overlap detected - remove the one with later end
            removals++;
            prevEnd = Math.min(prevEnd, intervals[i][1]);
        } else {
            prevEnd = intervals[i][1];
        }
    }
    
    return removals;
}

// Advanced: Using sweep line algorithm
function eraseOverlapIntervalsSweep(intervals: number[][]): number {
    if (intervals.length <= 1) return 0;
    
    // Create events: start = +1, end = -1
    const events: [number, number][] = [];
    
    for (const [start, end] of intervals) {
        events.push([start, 1]);    // Start event
        events.push([end, -1]);     // End event
    }
    
    // Sort events: end events before start events at same time
    events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
    let activeIntervals = 0;
    let maxOverlap = 0;
    
    for (const [time, type] of events) {
        activeIntervals += type;
        maxOverlap = Math.max(maxOverlap, activeIntervals);
    }
    
    return intervals.length - (intervals.length - maxOverlap + 1);
}

// Test cases
console.log("=== 435. Non-overlapping Intervals Tests ===");
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // Expected: 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]])); // Expected: 2
console.log(eraseOverlapIntervals([[1,2],[2,3]])); // Expected: 0
console.log(eraseOverlapIntervals([[1,100],[11,22],[1,11],[2,12]])); // Expected: 2

// Edge cases
console.log(eraseOverlapIntervals([[1,2]])); // Expected: 0
console.log(eraseOverlapIntervals([])); // Expected: 0
console.log(eraseOverlapIntervals([[-52,31],[-73,-26],[82,97],[-65,-11],[-62,-49],[95,99],[58,95],[-31,49],[66,98],[-63,2],[30,47],[-40,-26]])); // Expected: 7