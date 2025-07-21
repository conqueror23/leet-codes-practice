// LeetCode 4: Median of Two Sorted Arrays (Hard) - Advanced Solutions
// Note: This is a duplicate from arrays category but with binary search focus

// Solution 1: Optimized Binary Search on Smaller Array
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
    
    const m = nums1.length, n = nums2.length;
    let left = 0, right = m;
    
    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            return (m + n) % 2 === 0 
                ? (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2
                : Math.max(maxLeftX, maxLeftY);
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
    return 0;
}

// Solution 2: Kth Element Binary Search
function findMedianKth(nums1: number[], nums2: number[]): number {
    const totalLength = nums1.length + nums2.length;
    const isEven = totalLength % 2 === 0;
    
    const findKthElement = (k: number): number => {
        let i = 0, j = 0;
        while (k > 1) {
            const half = Math.floor(k / 2);
            const ni = Math.min(i + half - 1, nums1.length - 1);
            const nj = Math.min(j + half - 1, nums2.length - 1);
            
            if (i >= nums1.length) return nums2[j + k - 1];
            if (j >= nums2.length) return nums1[i + k - 1];
            
            if (nums1[ni] <= nums2[nj]) {
                k -= (ni - i + 1);
                i = ni + 1;
            } else {
                k -= (nj - j + 1);
                j = nj + 1;
            }
        }
        
        if (i >= nums1.length) return nums2[j];
        if (j >= nums2.length) return nums1[i];
        return Math.min(nums1[i], nums2[j]);
    };
    
    if (isEven) {
        const k1 = findKthElement(totalLength / 2);
        const k2 = findKthElement(totalLength / 2 + 1);
        return (k1 + k2) / 2;
    }
    return findKthElement(Math.floor(totalLength / 2) + 1);
}

// Test cases
console.log("Binary Search:", findMedianSortedArrays([1,3], [2])); // 2.0
console.log("Kth Element:", findMedianKth([1,2], [3,4])); // 2.5