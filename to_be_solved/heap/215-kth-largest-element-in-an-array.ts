// LeetCode 215: Kth Largest Element in an Array
// Given an integer array nums and an integer k, return the kth largest element in the array.

function findKthLargest(nums: number[], k: number): number {
    nums.sort((a, b) => b - a);
    return nums[k - 1];
}

// More efficient solution using Quick Select
function findKthLargestOptimal(nums: number[], k: number): number {
    function quickSelect(left: number, right: number): number {
        const pivot = partition(left, right);
        
        if (pivot === k - 1) {
            return nums[pivot];
        } else if (pivot < k - 1) {
            return quickSelect(pivot + 1, right);
        } else {
            return quickSelect(left, pivot - 1);
        }
    }
    
    function partition(left: number, right: number): number {
        const pivot = nums[right];
        let i = left;
        
        for (let j = left; j < right; j++) {
            if (nums[j] >= pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        
        [nums[i], nums[right]] = [nums[right], nums[i]];
        return i;
    }
    
    return quickSelect(0, nums.length - 1);
}

// Test cases
console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // 4