// LeetCode 88: Merge Sorted Array (Easy) - Advanced Solutions
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n.

// Solution 1: Three Pointers from End (Original optimized)
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;
    
    while (i >= 0 && j >= 0) {
        nums1[k--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
    }
    
    // Copy remaining elements from nums2
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}

// Solution 2: Two Pointers from Start (Requires extra space)
function mergeFromStart(nums1: number[], m: number, nums2: number[], n: number): void {
    const temp = nums1.slice(0, m);
    let i = 0, j = 0, k = 0;
    
    while (i < temp.length && j < n) {
        nums1[k++] = temp[i] <= nums2[j] ? temp[i++] : nums2[j++];
    }
    
    while (i < temp.length) {
        nums1[k++] = temp[i++];
    }
    
    while (j < n) {
        nums1[k++] = nums2[j++];
    }
}

// Solution 3: Using Built-in Sort (Less optimal but simple)
function mergeWithSort(nums1: number[], m: number, nums2: number[], n: number): void {
    for (let i = 0; i < n; i++) {
        nums1[m + i] = nums2[i];
    }
    nums1.sort((a, b) => a - b);
}

// Solution 4: Insertion Sort Approach
function mergeInsertionSort(nums1: number[], m: number, nums2: number[], n: number): void {
    for (let i = 0; i < n; i++) {
        nums1[m + i] = nums2[i];
    }
    
    // Insertion sort from position m
    for (let i = m; i < m + n; i++) {
        let j = i;
        while (j > 0 && nums1[j] < nums1[j - 1]) {
            [nums1[j], nums1[j - 1]] = [nums1[j - 1], nums1[j]];
            j--;
        }
    }
}

// Solution 5: Gap Method (Shell Sort inspired)
function mergeGapMethod(nums1: number[], m: number, nums2: number[], n: number): void {
    // First copy nums2 to nums1
    for (let i = 0; i < n; i++) {
        nums1[m + i] = nums2[i];
    }
    
    let gap = Math.ceil((m + n) / 2);
    
    while (gap > 0) {
        for (let i = 0; i + gap < m + n; i++) {
            if (nums1[i] > nums1[i + gap]) {
                [nums1[i], nums1[i + gap]] = [nums1[i + gap], nums1[i]];
            }
        }
        gap = gap === 1 ? 0 : Math.ceil(gap / 2);
    }
}

// Solution 6: Binary Search Insertion
function mergeBinarySearch(nums1: number[], m: number, nums2: number[], n: number): void {
    function binaryInsert(arr: number[], val: number, end: number): void {
        let left = 0, right = end;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] > val) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        // Shift elements to the right
        for (let i = end; i > left; i--) {
            arr[i] = arr[i - 1];
        }
        arr[left] = val;
    }
    
    let currentSize = m;
    for (let i = 0; i < n; i++) {
        binaryInsert(nums1, nums2[i], currentSize);
        currentSize++;
    }
}

// Test cases
console.log("Solution 1 - Three Pointers from End:");
let test1 = [1,2,3,0,0,0];
merge([...test1], 3, [2,5,6], 3);
console.log(test1); // [1,2,2,3,5,6]

console.log("\nSolution 2 - From Start with Extra Space:");
let test2 = [1,2,3,0,0,0];
mergeFromStart(test2, 3, [2,5,6], 3);
console.log(test2); // [1,2,2,3,5,6]

console.log("\nSolution 3 - Built-in Sort:");
let test3 = [1,2,3,0,0,0];
mergeWithSort(test3, 3, [2,5,6], 3);
console.log(test3); // [1,2,2,3,5,6]

console.log("\nSolution 6 - Binary Search Insertion:");
let test6 = [1,2,3,0,0,0];
mergeBinarySearch(test6, 3, [2,5,6], 3);
console.log(test6); // [1,2,2,3,5,6]

// Time Complexity Analysis:
// Solution 1: O(m + n) time, O(1) space - Most optimal
// Solution 2: O(m + n) time, O(m) space - Extra space for temp array
// Solution 3: O((m+n)log(m+n)) time, O(1) space - Built-in sort
// Solution 4: O(n * (m+n)) time, O(1) space - Insertion sort
// Solution 5: O((m+n)log(m+n)) time, O(1) space - Gap method
// Solution 6: O(n * log(m) + n * m) time, O(1) space - Binary search + shifting