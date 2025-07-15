// LeetCode 56: Merge Intervals
// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.

function merge(intervals: number[][]): number[][] {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result: number[][] = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = result[result.length - 1];
        
        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
        } else {
            result.push(current);
        }
    }
    
    return result;
}

// Test cases
console.log(merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log(merge([[1,4],[4,5]])); // [[1,5]]
console.log(merge([[1,4],[0,4]])); // [[0,4]]