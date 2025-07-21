// LeetCode 4: Median of Two Sorted Arrays (Hard) - Advanced Solutions
// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

// Solution 1: Optimized Binary Search (Original)
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
    
    return 0;
}

// Solution 2: Merge and Find (O(m+n) space)
function findMedianMerge(nums1: number[], nums2: number[]): number {
    const merged: number[] = [];
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            merged.push(nums1[i++]);
        } else {
            merged.push(nums2[j++]);
        }
    }
    
    while (i < nums1.length) {
        merged.push(nums1[i++]);
    }
    
    while (j < nums2.length) {
        merged.push(nums2[j++]);
    }
    
    const totalLength = merged.length;
    if (totalLength % 2 === 0) {
        return (merged[totalLength / 2 - 1] + merged[totalLength / 2]) / 2;
    } else {
        return merged[Math.floor(totalLength / 2)];
    }
}

// Solution 3: Partial Merge (Only merge until median)
function findMedianPartialMerge(nums1: number[], nums2: number[]): number {
    const totalLength = nums1.length + nums2.length;
    const isEven = totalLength % 2 === 0;
    const medianIndex = Math.floor(totalLength / 2);
    
    let i = 0, j = 0, current = 0, prev = 0;
    
    for (let k = 0; k <= medianIndex; k++) {
        prev = current;
        
        if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
            current = nums1[i++];
        } else {
            current = nums2[j++];
        }
    }
    
    return isEven ? (prev + current) / 2 : current;
}

// Solution 4: Recursive Binary Search
function findMedianRecursive(nums1: number[], nums2: number[]): number {
    const totalLength = nums1.length + nums2.length;
    const isEven = totalLength % 2 === 0;
    
    if (isEven) {
        const left = findKthElement(nums1, 0, nums2, 0, Math.floor(totalLength / 2));
        const right = findKthElement(nums1, 0, nums2, 0, Math.floor(totalLength / 2) + 1);
        return (left + right) / 2;
    } else {
        return findKthElement(nums1, 0, nums2, 0, Math.floor(totalLength / 2) + 1);
    }
}

function findKthElement(nums1: number[], start1: number, nums2: number[], start2: number, k: number): number {
    if (start1 >= nums1.length) {
        return nums2[start2 + k - 1];
    }
    if (start2 >= nums2.length) {
        return nums1[start1 + k - 1];
    }
    if (k === 1) {
        return Math.min(nums1[start1], nums2[start2]);
    }
    
    const mid = Math.floor(k / 2);
    const mid1 = start1 + mid - 1 < nums1.length ? nums1[start1 + mid - 1] : Infinity;
    const mid2 = start2 + mid - 1 < nums2.length ? nums2[start2 + mid - 1] : Infinity;
    
    if (mid1 < mid2) {
        return findKthElement(nums1, start1 + mid, nums2, start2, k - mid);
    } else {
        return findKthElement(nums1, start1, nums2, start2 + mid, k - mid);
    }
}

// Solution 5: Two Pointers with Early Termination
function findMedianTwoPointers(nums1: number[], nums2: number[]): number {
    const m = nums1.length;
    const n = nums2.length;
    const totalLength = m + n;
    const isEven = totalLength % 2 === 0;
    const targetIndex = Math.floor(totalLength / 2);
    
    let i = 0, j = 0;
    let current = 0, prev = 0;
    
    // Handle edge cases
    if (m === 0) {
        return isEven ? (nums2[targetIndex - 1] + nums2[targetIndex]) / 2 : nums2[targetIndex];
    }
    if (n === 0) {
        return isEven ? (nums1[targetIndex - 1] + nums1[targetIndex]) / 2 : nums1[targetIndex];
    }
    
    for (let count = 0; count <= targetIndex; count++) {
        prev = current;
        
        if (i >= m) {
            current = nums2[j++];
        } else if (j >= n) {
            current = nums1[i++];
        } else if (nums1[i] <= nums2[j]) {
            current = nums1[i++];
        } else {
            current = nums2[j++];
        }
    }
    
    return isEven ? (prev + current) / 2 : current;
}

// Solution 6: Binary Search on Answer
function findMedianBinarySearchAnswer(nums1: number[], nums2: number[]): number {
    const minVal = Math.min(nums1[0] || Infinity, nums2[0] || Infinity);
    const maxVal = Math.max(nums1[nums1.length - 1] || -Infinity, nums2[nums2.length - 1] || -Infinity);
    const totalLength = nums1.length + nums2.length;
    const targetCount = Math.floor((totalLength + 1) / 2);
    
    let left = minVal;
    let right = maxVal;
    const epsilon = 1e-9;
    
    while (right - left > epsilon) {
        const mid = (left + right) / 2;
        const count = countLessEqual(nums1, mid) + countLessEqual(nums2, mid);
        
        if (count < targetCount) {
            left = mid;
        } else {
            right = mid;
        }
    }
    
    const candidate1 = left;
    
    if (totalLength % 2 === 1) {
        return candidate1;
    } else {
        // Find the next smallest element for even case
        const count1 = countLessEqual(nums1, candidate1) + countLessEqual(nums2, candidate1);
        let nextCandidate = Infinity;
        
        // Find the smallest element greater than candidate1
        for (const num of [...nums1, ...nums2]) {
            if (num > candidate1) {
                nextCandidate = Math.min(nextCandidate, num);
            }
        }
        
        return (candidate1 + nextCandidate) / 2;
    }
}

function countLessEqual(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Test cases
console.log("Solution 1 - Optimized Binary Search:");
console.log(findMedianSortedArrays([1,3], [2])); // 2.0
console.log(findMedianSortedArrays([1,2], [3,4])); // 2.5

console.log("\nSolution 2 - Merge and Find:");
console.log(findMedianMerge([1,3], [2])); // 2.0
console.log(findMedianMerge([1,2], [3,4])); // 2.5

console.log("\nSolution 3 - Partial Merge:");
console.log(findMedianPartialMerge([1,3], [2])); // 2.0
console.log(findMedianPartialMerge([1,2], [3,4])); // 2.5

console.log("\nSolution 4 - Recursive Binary Search:");
console.log(findMedianRecursive([1,3], [2])); // 2.0
console.log(findMedianRecursive([1,2], [3,4])); // 2.5

console.log("\nSolution 5 - Two Pointers:");
console.log(findMedianTwoPointers([1,3], [2])); // 2.0
console.log(findMedianTwoPointers([1,2], [3,4])); // 2.5

// Edge cases
console.log("\nEdge Cases:");
console.log("Empty first array:", findMedianSortedArrays([], [1,2,3])); // 2.0
console.log("Empty second array:", findMedianSortedArrays([1,2,3], [])); // 2.0
console.log("Single elements:", findMedianSortedArrays([1], [2])); // 1.5
console.log("Large difference:", findMedianSortedArrays([1,2], [1000,1001])); // 501.5

// Performance comparison
const largeArray1 = Array.from({length: 1000}, (_, i) => i * 2);
const largeArray2 = Array.from({length: 1000}, (_, i) => i * 2 + 1);

console.log("\nPerformance comparison on large arrays (1000 elements each):");
console.time("Binary Search");
findMedianSortedArrays([...largeArray1], [...largeArray2]);
console.timeEnd("Binary Search");

console.time("Partial Merge");
findMedianPartialMerge([...largeArray1], [...largeArray2]);
console.timeEnd("Partial Merge");

console.time("Two Pointers");
findMedianTwoPointers([...largeArray1], [...largeArray2]);
console.timeEnd("Two Pointers");

// Time Complexity Analysis:
// Solution 1: O(log(min(m,n))) time, O(1) space - Most optimal
// Solution 2: O(m+n) time, O(m+n) space - Simple merge approach
// Solution 3: O(m+n) time, O(1) space - Partial merge, better space
// Solution 4: O(log(m+n)) time, O(log(m+n)) space - Recursive approach
// Solution 5: O(m+n) time, O(1) space - Two pointers with early termination
// Solution 6: O((m+n)log(max-min)) time, O(1) space - Binary search on answer