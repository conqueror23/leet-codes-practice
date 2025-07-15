// LeetCode 26: Remove Duplicates from Sorted Array (Easy)
// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.

function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let k = 1;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }
    
    return k;
}

// Test cases
console.log(removeDuplicates([1,1,2])); // 2, nums = [1,2,_]
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // 5, nums = [0,1,2,3,4,_,_,_,_,_]