// LeetCode 88: Merge Sorted Array (Easy)
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n.

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;
    
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }
    
    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
}

// Test cases
const nums1 = [1,2,3,0,0,0];
const nums2 = [2,5,6];
merge(nums1, 3, nums2, 3);
console.log(nums1); // [1,2,2,3,5,6]