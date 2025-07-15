// LeetCode 152: Maximum Product Subarray (Medium)
// Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

function maxProduct(nums: number[]): number {
    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const curr = nums[i];
        const tempMax = Math.max(curr, maxSoFar * curr, minSoFar * curr);
        minSoFar = Math.min(curr, maxSoFar * curr, minSoFar * curr);
        
        maxSoFar = tempMax;
        result = Math.max(result, maxSoFar);
    }
    
    return result;
}

// Test cases
console.log(maxProduct([2,3,-2,4])); // 6
console.log(maxProduct([-2,0,-1])); // 0
console.log(maxProduct([-2,3,-4])); // 24