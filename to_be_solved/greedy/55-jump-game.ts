// LeetCode 55: Jump Game
// You are given an integer array nums. You are initially positioned at the array's first index.
// Each element represents your maximum jump length at that position.

function canJump(nums: number[]): boolean {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;
    }
    
    return true;
}

// Test cases
console.log(canJump([2,3,1,1,4])); // true
console.log(canJump([3,2,1,0,4])); // false
console.log(canJump([0])); // true