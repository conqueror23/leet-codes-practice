/**
 * 164. Maximum Gap
 * Difficulty: Hard
 * 
 * Given an integer array nums, return the maximum difference between two successive elements 
 * in its sorted form. If the array contains less than two elements, return 0.
 * 
 * You must write an algorithm that runs in O(n) time and uses O(n) extra space.
 * 
 * Example 1:
 * Input: nums = [3,6,9,1]
 * Output: 3
 * Explanation: The sorted form of the array is [1,3,6,9], and the maximum gap is 3.
 * 
 * Example 2:
 * Input: nums = [10]
 * Output: 0
 * Explanation: The array contains less than 2 elements, therefore return 0.
 */

function maximumGap(nums: number[]): number {
    if (nums.length < 2) return 0;
    
    const n = nums.length;
    const minVal = Math.min(...nums);
    const maxVal = Math.max(...nums);
    
    if (minVal === maxVal) return 0;
    
    const bucketSize = Math.max(1, Math.floor((maxVal - minVal) / (n - 1)));
    const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1;
    
    const buckets: Array<{ min: number; max: number; hasValue: boolean }> = 
        Array(bucketCount).fill(null).map(() => ({ min: Infinity, max: -Infinity, hasValue: false }));
    
    for (const num of nums) {
        const bucketIndex = Math.floor((num - minVal) / bucketSize);
        const bucket = buckets[bucketIndex];
        bucket.hasValue = true;
        bucket.min = Math.min(bucket.min, num);
        bucket.max = Math.max(bucket.max, num);
    }
    
    let maxGap = 0;
    let prevMax = minVal;
    
    for (const bucket of buckets) {
        if (bucket.hasValue) {
            maxGap = Math.max(maxGap, bucket.min - prevMax);
            prevMax = bucket.max;
        }
    }
    
    return maxGap;
}

console.log(maximumGap([3, 6, 9, 1]));
console.log(maximumGap([10]));
console.log(maximumGap([1, 1, 1, 1]));
console.log(maximumGap([1, 10000000]));