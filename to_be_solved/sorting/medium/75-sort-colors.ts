/**
 * 75. Sort Colors - Medium
 * 
 * Given an array nums with n objects colored red, white, or blue, sort them in-place 
 * so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
 * 
 * We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
 * You must solve this problem without using the library's sort function.
 */

function sortColors(nums: number[]): void {
    // Advanced: Dutch National Flag Algorithm (Three-way partitioning)
    // Time: O(n), Space: O(1)
    
    let low = 0;    // Boundary for 0s (red)
    let mid = 0;    // Current pointer
    let high = nums.length - 1; // Boundary for 2s (blue)
    
    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap with low boundary and move both pointers
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            // White is in correct position, just move mid
            mid++;
        } else { // nums[mid] === 2
            // Swap with high boundary, only move high (mid needs to check new value)
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}

// Alternative: Two-pass counting sort
function sortColorsCounting(nums: number[]): void {
    // Count occurrences of each color
    const count = [0, 0, 0]; // [red, white, blue]
    
    for (const num of nums) {
        count[num]++;
    }
    
    // Fill array with counted colors
    let index = 0;
    for (let color = 0; color < 3; color++) {
        for (let i = 0; i < count[color]; i++) {
            nums[index++] = color;
        }
    }
}

// Advanced: Stable partitioning (maintains relative order within same color)
function sortColorsStable(nums: number[]): void {
    // First pass: move all 0s to the front
    let writeIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            if (i !== writeIndex) {
                // Shift elements to maintain stability
                const temp = nums[i];
                for (let j = i; j > writeIndex; j--) {
                    nums[j] = nums[j - 1];
                }
                nums[writeIndex] = temp;
            }
            writeIndex++;
        }
    }
    
    // Second pass: move all 2s to the back
    writeIndex = nums.length - 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] === 2) {
            if (i !== writeIndex) {
                const temp = nums[i];
                for (let j = i; j < writeIndex; j++) {
                    nums[j] = nums[j + 1];
                }
                nums[writeIndex] = temp;
            }
            writeIndex--;
        }
    }
}

// Quicksort-style partitioning
function sortColorsQuickSort(nums: number[]): void {
    // Partition around 1 (white)
    function partition(arr: number[], target: number): number {
        let left = 0;
        let right = arr.length - 1;
        
        while (left <= right) {
            while (left <= right && arr[left] < target) left++;
            while (left <= right && arr[right] > target) right--;
            
            if (left <= right) {
                [arr[left], arr[right]] = [arr[right], arr[left]];
                left++;
                right--;
            }
        }
        
        return left;
    }
    
    // First partition: separate 0s from 1s and 2s
    const pivot1 = partition(nums, 1);
    
    // Second partition: separate 1s from 2s in the right part
    if (pivot1 < nums.length) {
        const rightPart = nums.slice(pivot1);
        partition(rightPart, 2);
        
        // Copy back
        for (let i = 0; i < rightPart.length; i++) {
            nums[pivot1 + i] = rightPart[i];
        }
    }
}

// Lomuto partitioning approach
function sortColorsLomuto(nums: number[]): void {
    // Two-pass Lomuto partitioning
    function lomutoPartition(arr: number[], pivotValue: number): number {
        let j = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] <= pivotValue) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                j++;
            }
        }
        return j;
    }
    
    // First pass: partition 0s
    const boundary1 = lomutoPartition(nums, 0);
    
    // Second pass: partition 1s in the remaining part
    if (boundary1 < nums.length) {
        const remaining = nums.slice(boundary1);
        lomutoPartition(remaining, 1);
        
        // Copy back
        for (let i = 0; i < remaining.length; i++) {
            nums[boundary1 + i] = remaining[i];
        }
    }
}

// Recursive approach
function sortColorsRecursive(nums: number[]): void {
    function dutchFlag(arr: number[], start: number, end: number, pivot: number): void {
        if (start >= end) return;
        
        let low = start;
        let mid = start;
        let high = end;
        
        while (mid <= high) {
            if (arr[mid] < pivot) {
                [arr[low], arr[mid]] = [arr[mid], arr[low]];
                low++;
                mid++;
            } else if (arr[mid] === pivot) {
                mid++;
            } else {
                [arr[mid], arr[high]] = [arr[high], arr[mid]];
                high--;
            }
        }
    }
    
    dutchFlag(nums, 0, nums.length - 1, 1);
}

// Bit manipulation approach (for educational purposes)
function sortColorsBits(nums: number[]): void {
    // Use bit positions to represent colors
    let colorMask = 0;
    const n = nums.length;
    
    // Count using bit manipulation
    for (const num of nums) {
        const bitPos = num * 16; // Each color gets 16 bits for counting
        const currentCount = (colorMask >> bitPos) & 0xFFFF;
        colorMask = (colorMask & ~(0xFFFF << bitPos)) | ((currentCount + 1) << bitPos);
    }
    
    // Reconstruct array
    let index = 0;
    for (let color = 0; color < 3; color++) {
        const bitPos = color * 16;
        const count = (colorMask >> bitPos) & 0xFFFF;
        
        for (let i = 0; i < count; i++) {
            nums[index++] = color;
        }
    }
}

// Test cases
function testSortColors() {
    console.log("=== 75. Sort Colors Tests ===");
    
    // Test case 1
    const nums1 = [2,0,2,1,1,0];
    sortColors(nums1);
    console.log("Test 1:", nums1); // Expected: [0,0,1,1,2,2]
    
    // Test case 2
    const nums2 = [2,0,1];
    sortColors(nums2);
    console.log("Test 2:", nums2); // Expected: [0,1,2]
    
    // Test case 3: All same color
    const nums3 = [1,1,1];
    sortColors(nums3);
    console.log("Test 3:", nums3); // Expected: [1,1,1]
    
    // Test case 4: Already sorted
    const nums4 = [0,0,1,1,2,2];
    sortColors(nums4);
    console.log("Test 4:", nums4); // Expected: [0,0,1,1,2,2]
    
    // Test case 5: Reverse sorted
    const nums5 = [2,2,1,1,0,0];
    sortColors(nums5);
    console.log("Test 5:", nums5); // Expected: [0,0,1,1,2,2]
    
    // Test case 6: Single element
    const nums6 = [1];
    sortColors(nums6);
    console.log("Test 6:", nums6); // Expected: [1]
    
    // Test case 7: Two elements
    const nums7 = [2,0];
    sortColors(nums7);
    console.log("Test 7:", nums7); // Expected: [0,2]
    
    // Test case 8: No 1s
    const nums8 = [2,0,2,0,0,2];
    sortColors(nums8);
    console.log("Test 8:", nums8); // Expected: [0,0,0,2,2,2]
}

testSortColors();

// Performance comparison
function performanceTest() {
    console.log("\n=== Performance Comparison ===");
    
    const testArrays = [
        [2,0,2,1,1,0],
        [2,0,1],
        [1,1,1],
        [2,2,1,1,0,0],
        [0,1,2,0,1,2,0,1,2]
    ];
    
    testArrays.forEach((original, i) => {
        console.log(`\nTest ${i + 1}: [${original.join(',')}]`);
        
        // Dutch National Flag
        let nums = [...original];
        sortColors(nums);
        console.log(`Dutch Flag: [${nums.join(',')}]`);
        
        // Counting Sort
        nums = [...original];
        sortColorsCounting(nums);
        console.log(`Counting: [${nums.join(',')}]`);
        
        // Recursive
        nums = [...original];
        sortColorsRecursive(nums);
        console.log(`Recursive: [${nums.join(',')}]`);
    });
    
    // Large array test
    console.log("\n=== Large Array Test ===");
    const largeArray = Array.from({length: 10000}, () => Math.floor(Math.random() * 3));
    const originalSum = largeArray.reduce((a, b) => a + b, 0);
    
    sortColors(largeArray);
    const sortedSum = largeArray.reduce((a, b) => a + b, 0);
    
    console.log(`Large array sorted correctly: ${originalSum === sortedSum}`);
    console.log(`First 10 elements: [${largeArray.slice(0, 10).join(',')}]`);
    console.log(`Last 10 elements: [${largeArray.slice(-10).join(',')}]`);
}

performanceTest();