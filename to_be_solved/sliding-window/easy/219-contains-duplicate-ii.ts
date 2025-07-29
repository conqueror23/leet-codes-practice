/**
 * 219. Contains Duplicate II - Easy
 * 
 * Given an integer array nums and an integer k, return true if there are two distinct indices i and j 
 * in the array such that nums[i] == nums[j] and abs(i - j) <= k.
 */

function containsNearbyDuplicate(nums: number[], k: number): boolean {
    // Advanced: Sliding window with hash set
    // Time: O(n), Space: O(min(n, k))
    
    if (k <= 0) return false;
    
    const window = new Set<number>();
    
    for (let i = 0; i < nums.length; i++) {
        // Maintain window size of k+1
        if (window.size > k) {
            window.delete(nums[i - k - 1]);
        }
        
        // Check if current number exists in window
        if (window.has(nums[i])) {
            return true;
        }
        
        window.add(nums[i]);
    }
    
    return false;
}

// Alternative: Hash map with index tracking
function containsNearbyDuplicateMap(nums: number[], k: number): boolean {
    const indexMap = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        
        if (indexMap.has(num)) {
            const prevIndex = indexMap.get(num)!;
            if (i - prevIndex <= k) {
                return true;
            }
        }
        
        indexMap.set(num, i);
    }
    
    return false;
}

// Optimized: Early termination with frequency tracking
function containsNearbyDuplicateOptimized(nums: number[], k: number): boolean {
    if (k <= 0 || nums.length <= 1) return false;
    
    // If k >= n-1, we can check entire array
    if (k >= nums.length - 1) {
        const seen = new Set<number>();
        for (const num of nums) {
            if (seen.has(num)) return true;
            seen.add(num);
        }
        return false;
    }
    
    const window = new Map<number, number>(); // value -> count
    
    // Initialize first window
    for (let i = 0; i <= Math.min(k, nums.length - 1); i++) {
        const count = window.get(nums[i]) || 0;
        if (count > 0) return true;
        window.set(nums[i], count + 1);
    }
    
    // Slide window
    for (let i = k + 1; i < nums.length; i++) {
        // Remove leftmost element
        const leftNum = nums[i - k - 1];
        const leftCount = window.get(leftNum)!;
        if (leftCount === 1) {
            window.delete(leftNum);
        } else {
            window.set(leftNum, leftCount - 1);
        }
        
        // Add rightmost element
        const rightNum = nums[i];
        if (window.has(rightNum)) return true;
        window.set(rightNum, 1);
    }
    
    return false;
}

// Deque-based approach for educational purposes
function containsNearbyDuplicateDeque(nums: number[], k: number): boolean {
    if (k <= 0) return false;
    
    const window: number[] = []; // Using array as deque
    const valueSet = new Set<number>();
    
    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (window.length > k) {
            const removed = window.shift()!;
            valueSet.delete(removed);
        }
        
        // Check for duplicate
        if (valueSet.has(nums[i])) {
            return true;
        }
        
        // Add current element
        window.push(nums[i]);
        valueSet.add(nums[i]);
    }
    
    return false;
}

// Two-pointer approach variation
function containsNearbyDuplicateTwoPointer(nums: number[], k: number): boolean {
    for (let i = 0; i < nums.length; i++) {
        // Check within window [i, i+k]
        for (let j = i + 1; j <= Math.min(i + k, nums.length - 1); j++) {
            if (nums[i] === nums[j]) {
                return true;
            }
        }
    }
    
    return false;
}

// Bit manipulation optimization for small values
function containsNearbyDuplicateBits(nums: number[], k: number): boolean {
    if (k <= 0) return false;
    
    // Only works for non-negative integers up to 31
    const allPositive = nums.every(n => n >= 0 && n <= 31);
    
    if (allPositive) {
        let windowMask = 0;
        
        for (let i = 0; i < nums.length; i++) {
            // Remove element outside window
            if (i > k) {
                windowMask &= ~(1 << nums[i - k - 1]);
            }
            
            // Check if bit is already set
            if (windowMask & (1 << nums[i])) {
                return true;
            }
            
            // Set bit for current number
            windowMask |= (1 << nums[i]);
        }
        
        return false;
    }
    
    // Fallback to regular approach
    return containsNearbyDuplicate(nums, k);
}

// Test cases
console.log("=== 219. Contains Duplicate II Tests ===");
console.log(containsNearbyDuplicate([1,2,3,1], 3)); // Expected: true
console.log(containsNearbyDuplicate([1,0,1,1], 1)); // Expected: true
console.log(containsNearbyDuplicate([1,2,3,1,2,3], 2)); // Expected: false
console.log(containsNearbyDuplicate([99,99], 2)); // Expected: true

// Edge cases
console.log(containsNearbyDuplicate([], 1)); // Expected: false
console.log(containsNearbyDuplicate([1], 1)); // Expected: false
console.log(containsNearbyDuplicate([1,2], 0)); // Expected: false

// Large test case
const largeArray = Array.from({length: 10000}, (_, i) => i % 100);
console.log(containsNearbyDuplicate(largeArray, 99)); // Expected: true

// Performance comparison
console.log("\n=== Performance Comparison ===");
const testCases = [
    [[1,2,3,1,2,3], 2],
    [[1,0,1,1], 1],
    [[1,2,1], 0],
    [Array.from({length: 1000}, (_, i) => i % 50), 25]
];

console.log("Sliding window:", testCases.map(([arr, k]) => containsNearbyDuplicate(arr as number[], k as number)));
console.log("Hash map:", testCases.map(([arr, k]) => containsNearbyDuplicateMap(arr as number[], k as number)));
console.log("Two pointer:", testCases.map(([arr, k]) => containsNearbyDuplicateTwoPointer(arr as number[], k as number)));