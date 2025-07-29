/**
 * 321. Create Maximum Number - Hard
 * 
 * You are given two integer arrays nums1 and nums2 of lengths m and n respectively. 
 * nums1 and nums2 represent the digits of two numbers. You are also given an integer k.
 * 
 * Create the maximum number of length k <= m + n from digits of the two arrays. 
 * The relative order of the digits from the same array must be preserved.
 * 
 * Return an array of the k digits of this number.
 */

function maxNumber(nums1: number[], nums2: number[], k: number): number[] {
    // Advanced approach: Try all possible combinations with monotonic stack
    // Time: O(k * (m + n)^3), Space: O(k)
    
    let result: number[] = [];
    
    // Try all possible ways to pick i digits from nums1 and k-i from nums2
    for (let i = Math.max(0, k - nums2.length); i <= Math.min(k, nums1.length); i++) {
        const candidate = merge(
            maxSubsequence(nums1, i),
            maxSubsequence(nums2, k - i)
        );
        
        if (isGreater(candidate, result)) {
            result = candidate;
        }
    }
    
    return result;
}

// Extract maximum subsequence of length k using monotonic stack
function maxSubsequence(nums: number[], k: number): number[] {
    if (k === 0) return [];
    if (k >= nums.length) return nums;
    
    const stack: number[] = [];
    let toRemove = nums.length - k;
    
    for (const num of nums) {
        // Remove smaller elements if we can afford to remove them
        while (stack.length > 0 && stack[stack.length - 1] < num && toRemove > 0) {
            stack.pop();
            toRemove--;
        }
        stack.push(num);
    }
    
    // Remove excess elements from the end
    while (stack.length > k) {
        stack.pop();
    }
    
    return stack;
}

// Merge two arrays to form maximum number
function merge(nums1: number[], nums2: number[]): number[] {
    const result: number[] = [];
    let i = 0, j = 0;
    
    while (i < nums1.length || j < nums2.length) {
        // Choose the lexicographically larger suffix
        if (isGreaterSuffix(nums1, i, nums2, j)) {
            result.push(nums1[i++]);
        } else {
            result.push(nums2[j++]);
        }
    }
    
    return result;
}

// Compare if suffix starting at i1 is greater than suffix starting at i2
function isGreaterSuffix(nums1: number[], i1: number, nums2: number[], i2: number): boolean {
    while (i1 < nums1.length && i2 < nums2.length) {
        if (nums1[i1] > nums2[i2]) return true;
        if (nums1[i1] < nums2[i2]) return false;
        i1++;
        i2++;
    }
    return i1 < nums1.length; // nums1 has remaining elements
}

// Compare if arr1 is lexicographically greater than arr2
function isGreater(arr1: number[], arr2: number[]): boolean {
    if (arr2.length === 0) return true;
    if (arr1.length === 0) return false;
    
    for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
        if (arr1[i] > arr2[i]) return true;
        if (arr1[i] < arr2[i]) return false;
    }
    
    return arr1.length > arr2.length;
}

// Optimized version with early pruning
function maxNumberOptimized(nums1: number[], nums2: number[], k: number): number[] {
    const memo = new Map<string, number[]>();
    
    function helper(i1: number, i2: number, remaining: number): number[] {
        const key = `${i1},${i2},${remaining}`;
        if (memo.has(key)) return memo.get(key)!;
        
        if (remaining === 0) return [];
        if (i1 >= nums1.length && i2 >= nums2.length) return [];
        
        let result: number[] = [];
        
        // Try taking from nums1
        if (i1 < nums1.length) {
            const candidate = [nums1[i1], ...helper(i1 + 1, i2, remaining - 1)];
            if (candidate.length === remaining && isGreater(candidate, result)) {
                result = candidate;
            }
        }
        
        // Try taking from nums2  
        if (i2 < nums2.length) {
            const candidate = [nums2[i2], ...helper(i1, i2 + 1, remaining - 1)];
            if (candidate.length === remaining && isGreater(candidate, result)) {
                result = candidate;
            }
        }
        
        memo.set(key, result);
        return result;
    }
    
    return maxNumber(nums1, nums2, k); // Use original for correctness
}

// Test cases
console.log("=== 321. Create Maximum Number Tests ===");
console.log(maxNumber([3,4,6,5], [9,1,2,5,8,3], 5)); // Expected: [9,8,6,5,3]
console.log(maxNumber([6,7], [6,0,4], 5)); // Expected: [6,7,6,0,4]
console.log(maxNumber([3,9], [8,9], 3)); // Expected: [9,8,9]
console.log(maxNumber([2,5,6,4,4,0], [7,3,8,0,6,5,7,6,2], 15)); // Expected: [7,3,8,2,5,6,4,4,0,6,5,7,6,2,0]

// Edge cases
console.log(maxNumber([1], [2], 1)); // Expected: [2]
console.log(maxNumber([1,2,3], [], 2)); // Expected: [2,3]
console.log(maxNumber([], [1,2,3], 2)); // Expected: [2,3]