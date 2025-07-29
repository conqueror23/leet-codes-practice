/**
 * 88. Merge Sorted Array - Easy
 * 
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, 
 * and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 * 
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 * The final sorted array should not be returned by the function, but instead be stored inside the array nums1.
 */

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    // Advanced: Three-pointer approach (in-place, optimal)
    // Time: O(m + n), Space: O(1)
    
    let i = m - 1;      // Last element in nums1 actual data
    let j = n - 1;      // Last element in nums2
    let k = m + n - 1;  // Last position in nums1 (including extra space)
    
    // Merge from the end to avoid overwriting
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
    
    // Copy remaining elements from nums2 (nums1 elements are already in place)
    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
}

// Alternative: Forward merge with extra space
function mergeForward(nums1: number[], m: number, nums2: number[], n: number): void {
    // Create copy of nums1's actual data
    const nums1Copy = nums1.slice(0, m);
    
    let i = 0, j = 0, k = 0;
    
    // Merge both arrays
    while (i < m && j < n) {
        if (nums1Copy[i] <= nums2[j]) {
            nums1[k] = nums1Copy[i];
            i++;
        } else {
            nums1[k] = nums2[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements
    while (i < m) {
        nums1[k] = nums1Copy[i];
        i++;
        k++;
    }
    
    while (j < n) {
        nums1[k] = nums2[j];
        j++;
        k++;
    }
}

// Advanced: Gap-based merge (Shell sort inspired)
function mergeGapBased(nums1: number[], m: number, nums2: number[], n: number): void {
    // First, place nums2 elements at the end of nums1
    for (let i = 0; i < n; i++) {
        nums1[m + i] = nums2[i];
    }
    
    const totalLength = m + n;
    let gap = Math.ceil(totalLength / 2);
    
    // Use gap method to sort
    while (gap > 0) {
        for (let i = 0; i + gap < totalLength; i++) {
            if (nums1[i] > nums1[i + gap]) {
                [nums1[i], nums1[i + gap]] = [nums1[i + gap], nums1[i]];
            }
        }
        gap = gap === 1 ? 0 : Math.ceil(gap / 2);
    }
}

// Merge sort inspired approach
function mergeSortStyle(nums1: number[], m: number, nums2: number[], n: number): void {
    const merged: number[] = [];
    let i = 0, j = 0;
    
    // Merge phase
    while (i < m && j < n) {
        if (nums1[i] <= nums2[j]) {
            merged.push(nums1[i++]);
        } else {
            merged.push(nums2[j++]);
        }
    }
    
    // Add remaining elements
    while (i < m) merged.push(nums1[i++]);
    while (j < n) merged.push(nums2[j++]);
    
    // Copy back to nums1
    for (let k = 0; k < merged.length; k++) {
        nums1[k] = merged[k];
    }
}

// Binary search insertion approach
function mergeBinarySearch(nums1: number[], m: number, nums2: number[], n: number): void {
    // Insert each element from nums2 into correct position in nums1
    let insertPos = m;
    
    for (let i = 0; i < n; i++) {
        const target = nums2[i];
        
        // Binary search for insertion position
        let left = 0, right = insertPos;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (nums1[mid] <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // Shift elements to make space
        for (let j = insertPos; j > left; j--) {
            nums1[j] = nums1[j - 1];
        }
        
        // Insert the element
        nums1[left] = target;
        insertPos++;
    }
}

// Optimized for nearly sorted arrays
function mergeOptimized(nums1: number[], m: number, nums2: number[], n: number): void {
    if (n === 0) return;
    if (m === 0) {
        for (let i = 0; i < n; i++) {
            nums1[i] = nums2[i];
        }
        return;
    }
    
    // Quick check: if all nums2 elements are >= last nums1 element
    if (nums2[0] >= nums1[m - 1]) {
        for (let i = 0; i < n; i++) {
            nums1[m + i] = nums2[i];
        }
        return;
    }
    
    // Quick check: if all nums1 elements are >= last nums2 element
    if (nums1[0] >= nums2[n - 1]) {
        // Shift nums1 elements to the right
        for (let i = m - 1; i >= 0; i--) {
            nums1[i + n] = nums1[i];
        }
        // Copy nums2 to the beginning
        for (let i = 0; i < n; i++) {
            nums1[i] = nums2[i];
        }
        return;
    }
    
    // Use standard three-pointer approach
    merge(nums1, m, nums2, n);
}

// Test cases
function testMerge() {
    console.log("=== 88. Merge Sorted Array Tests ===");
    
    // Test case 1
    let nums1 = [1,2,3,0,0,0];
    let nums2 = [2,5,6];
    merge(nums1, 3, nums2, 3);
    console.log("Test 1:", nums1); // Expected: [1,2,2,3,5,6]
    
    // Test case 2
    nums1 = [1];
    nums2 = [];
    merge(nums1, 1, nums2, 0);
    console.log("Test 2:", nums1); // Expected: [1]
    
    // Test case 3
    nums1 = [0];
    nums2 = [1];
    merge(nums1, 0, nums2, 1);
    console.log("Test 3:", nums1); // Expected: [1]
    
    // Test case 4: All nums2 elements larger
    nums1 = [1,2,3,0,0,0];
    nums2 = [4,5,6];
    merge(nums1, 3, nums2, 3);
    console.log("Test 4:", nums1); // Expected: [1,2,3,4,5,6]
    
    // Test case 5: All nums2 elements smaller
    nums1 = [4,5,6,0,0,0];
    nums2 = [1,2,3];
    merge(nums1, 3, nums2, 3);
    console.log("Test 5:", nums1); // Expected: [1,2,3,4,5,6]
    
    // Test case 6: Duplicates
    nums1 = [1,2,2,0,0,0];
    nums2 = [2,3,3];
    merge(nums1, 3, nums2, 3);
    console.log("Test 6:", nums1); // Expected: [1,2,2,2,3,3]
    
    // Test case 7: Large numbers
    nums1 = [-1,0,0,3,3,3,0,0,0];
    nums2 = [1,2,2];
    merge(nums1, 6, nums2, 3);
    console.log("Test 7:", nums1); // Expected: [-1,0,0,1,2,2,3,3,3]
}

testMerge();

// Performance comparison
function performanceTest() {
    console.log("\n=== Performance Comparison ===");
    
    const testCases = [
        {nums1: [1,3,5,0,0,0], m: 3, nums2: [2,4,6], n: 3},
        {nums1: [1,2,3,0,0,0], m: 3, nums2: [4,5,6], n: 3},
        {nums1: [4,5,6,0,0,0], m: 3, nums2: [1,2,3], n: 3}
    ];
    
    testCases.forEach((test, i) => {
        const nums1Copy = [...test.nums1];
        merge(nums1Copy, test.m, test.nums2, test.n);
        console.log(`Test ${i + 1} - Three pointer:`, nums1Copy);
        
        const nums1Copy2 = [...test.nums1];
        mergeOptimized(nums1Copy2, test.m, test.nums2, test.n);
        console.log(`Test ${i + 1} - Optimized:`, nums1Copy2);
    });
}

performanceTest();