// LeetCode 41: First Missing Positive (Hard)
// Given an unsorted integer array nums, return the smallest missing positive integer.

function firstMissingPositive(nums: number[]): number {
    const n = nums.length;
    
    // Replace numbers that are out of range [1, n] with 1
    let containsOne = false;
    for (let i = 0; i < n; i++) {
        if (nums[i] === 1) {
            containsOne = true;
        }
        if (nums[i] <= 0 || nums[i] > n) {
            nums[i] = 1;
        }
    }
    
    if (!containsOne) return 1;
    
    // Use array indices as hash keys and numbers as presence of keys
    for (let i = 0; i < n; i++) {
        const index = Math.abs(nums[i]) - 1;
        if (nums[index] > 0) {
            nums[index] = -nums[index];
        }
    }
    
    // Find the first missing positive
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            return i + 1;
        }
    }
    
    return n + 1;
}

// Test cases
console.log(firstMissingPositive([1,2,0])); // 3
console.log(firstMissingPositive([3,4,-1,1])); // 2
console.log(firstMissingPositive([7,8,9,11,12])); // 1