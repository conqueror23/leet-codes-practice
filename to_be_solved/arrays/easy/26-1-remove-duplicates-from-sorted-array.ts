// LeetCode 26: Remove Duplicates from Sorted Array (Easy) - Advanced Solutions
// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.

// Solution 1: Optimized Two Pointers (Original approach but cleaner)
function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let writeIndex = 1;
    
    for (let readIndex = 1; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== nums[readIndex - 1]) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
}

// Solution 2: Generic Remove Duplicates (allows k duplicates)
function removeDuplicatesK(nums: number[], k: number): number {
    if (nums.length <= k) return nums.length;
    
    let writeIndex = k;
    
    for (let readIndex = k; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== nums[writeIndex - k]) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
}

// Solution 3: Using Set for Unique Count (Less optimal but demonstrates approach)
function removeDuplicatesSet(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    const uniqueElements = new Set<number>();
    let writeIndex = 0;
    
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (!uniqueElements.has(nums[readIndex])) {
            uniqueElements.add(nums[readIndex]);
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
}

// Solution 4: Functional Approach (Creates new array)
function removeDuplicatesFunctional(nums: number[]): number {
    const uniqueNums = nums.filter((num, index) => 
        index === 0 || num !== nums[index - 1]
    );
    
    // Copy back to original array
    for (let i = 0; i < uniqueNums.length; i++) {
        nums[i] = uniqueNums[i];
    }
    
    return uniqueNums.length;
}

// Solution 5: Single Pass with Early Termination
function removeDuplicatesOptimized(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let writeIndex = 0;
    let currentElement = nums[0];
    
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== currentElement) {
            currentElement = nums[readIndex];
            nums[++writeIndex] = currentElement;
        }
    }
    
    return writeIndex + 1;
}

// Test cases
console.log("Solution 1 - Two Pointers:");
let test1 = [1,1,2];
console.log(`Result: ${removeDuplicates(test1)}, Array: [${test1.slice(0, removeDuplicates([1,1,2]))}]`);

console.log("\nSolution 2 - Allow K=2 duplicates:");
let test2 = [1,1,1,2,2,3];
console.log(`Result: ${removeDuplicatesK(test2, 2)}, Array: [${test2.slice(0, removeDuplicatesK([1,1,1,2,2,3], 2))}]`);

console.log("\nSolution 3 - Using Set:");
let test3 = [0,0,1,1,1,2,2,3,3,4];
console.log(`Result: ${removeDuplicatesSet(test3)}, Array: [${test3.slice(0, removeDuplicatesSet([0,0,1,1,1,2,2,3,3,4]))}]`);

// Time Complexity Analysis:
// Solution 1: O(n) time, O(1) space - Most optimal
// Solution 2: O(n) time, O(1) space - Generic version
// Solution 3: O(n) time, O(k) space where k is unique elements
// Solution 4: O(n) time, O(n) space - Creates temporary array
// Solution 5: O(n) time, O(1) space - Alternative two-pointer approach