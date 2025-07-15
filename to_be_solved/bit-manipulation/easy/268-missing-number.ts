// LeetCode 268: Missing Number (Easy)
// Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

function missingNumber(nums: number[]): number {
    const n = nums.length;
    let xor = 0;
    
    for (let i = 0; i <= n; i++) {
        xor ^= i;
    }
    
    for (const num of nums) {
        xor ^= num;
    }
    
    return xor;
}

// Alternative solution using sum
function missingNumberSum(nums: number[]): number {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
}

// Test cases
console.log(missingNumber([3,0,1])); // 2
console.log(missingNumber([0,1])); // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8