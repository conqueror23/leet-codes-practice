// LeetCode 41: First Missing Positive (Hard) - Advanced Solutions
// Given an unsorted integer array nums, return the smallest missing positive integer.

// Solution 1: Index as Hash (Original optimized)
function firstMissingPositive(nums: number[]): number {
    const n = nums.length;
    
    // Phase 1: Handle edge cases and clean data
    let containsOne = false;
    for (let i = 0; i < n; i++) {
        if (nums[i] === 1) containsOne = true;
        if (nums[i] <= 0 || nums[i] > n) nums[i] = 1;
    }
    
    if (!containsOne) return 1;
    
    // Phase 2: Mark presence using array indices
    for (let i = 0; i < n; i++) {
        const index = Math.abs(nums[i]) - 1;
        if (nums[index] > 0) nums[index] = -nums[index];
    }
    
    // Phase 3: Find first missing positive
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) return i + 1;
    }
    
    return n + 1;
}

// Solution 2: Cyclic Sort
function firstMissingPositiveCyclicSort(nums: number[]): number {
    const n = nums.length;
    
    // Place each positive number at its correct position
    for (let i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            // Swap nums[i] to its correct position
            const correctIndex = nums[i] - 1;
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        }
    }
    
    // Find the first missing positive
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    
    return n + 1;
}

// Solution 3: Set-based Approach (O(n) space)
function firstMissingPositiveSet(nums: number[]): number {
    const positiveSet = new Set<number>();
    let maxPositive = 0;
    
    // Collect all positive numbers
    for (const num of nums) {
        if (num > 0) {
            positiveSet.add(num);
            maxPositive = Math.max(maxPositive, num);
        }
    }
    
    // Find first missing positive
    for (let i = 1; i <= maxPositive + 1; i++) {
        if (!positiveSet.has(i)) {
            return i;
        }
    }
    
    return 1; // This should never be reached
}

// Solution 4: Segregation + Index Marking
function firstMissingPositiveSegregation(nums: number[]): number {
    const n = nums.length;
    
    // Phase 1: Segregate positive and non-positive numbers
    let j = 0;
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++;
        }
    }
    
    // Now positive numbers are from index 0 to j-1
    const positiveCount = j;
    if (positiveCount === 0) return 1;
    
    // Phase 2: Mark presence using signs (only for positive numbers)
    for (let i = 0; i < positiveCount; i++) {
        const index = Math.abs(nums[i]) - 1;
        if (index < positiveCount && nums[index] > 0) {
            nums[index] = -nums[index];
        }
    }
    
    // Phase 3: Find first missing positive
    for (let i = 0; i < positiveCount; i++) {
        if (nums[i] > 0) {
            return i + 1;
        }
    }
    
    return positiveCount + 1;
}

// Solution 5: Boolean Array Approach
function firstMissingPositiveBoolean(nums: number[]): number {
    const n = nums.length;
    const present = new Array(n + 1).fill(false);
    
    // Mark presence of numbers from 1 to n
    for (const num of nums) {
        if (num > 0 && num <= n) {
            present[num] = true;
        }
    }
    
    // Find first missing positive
    for (let i = 1; i <= n; i++) {
        if (!present[i]) {
            return i;
        }
    }
    
    return n + 1;
}

// Solution 6: Bucket Sort Approach
function firstMissingPositiveBucket(nums: number[]): number {
    const n = nums.length;
    const buckets = new Array(n + 1).fill(false);
    
    // Fill buckets
    for (const num of nums) {
        if (num > 0 && num <= n) {
            buckets[num] = true;
        }
    }
    
    // Find first empty bucket
    for (let i = 1; i <= n; i++) {
        if (!buckets[i]) {
            return i;
        }
    }
    
    return n + 1;
}

// Solution 7: Mathematical Approach (Sum formula)
function firstMissingPositiveMath(nums: number[]): number {
    const n = nums.length;
    const positiveNums = nums.filter(num => num > 0 && num <= n);
    const uniquePositives = [...new Set(positiveNums)];
    
    // Expected sum from 1 to k (where k is max positive number <= n)
    if (uniquePositives.length === 0) return 1;
    
    uniquePositives.sort((a, b) => a - b);
    
    // Check for gaps
    let expected = 1;
    for (const num of uniquePositives) {
        if (num === expected) {
            expected++;
        } else if (num > expected) {
            return expected;
        }
    }
    
    return expected;
}

// Solution 8: Divide and Conquer
function firstMissingPositiveDivideConquer(nums: number[]): number {
    return firstMissingPositiveHelper(nums, 1, nums.length + 1);
}

function firstMissingPositiveHelper(nums: number[], left: number, right: number): number {
    if (left >= right) return left;
    
    const mid = Math.floor((left + right) / 2);
    
    // Count numbers in range [left, mid]
    let count = 0;
    for (const num of nums) {
        if (num >= left && num <= mid) {
            count++;
        }
    }
    
    // If count equals expected count, missing number is in right half
    const expectedCount = mid - left + 1;
    if (count === expectedCount) {
        return firstMissingPositiveHelper(nums, mid + 1, right);
    } else {
        return firstMissingPositiveHelper(nums, left, mid);
    }
}

// Test cases
console.log("Solution 1 - Index as Hash:");
console.log(firstMissingPositive([1,2,0])); // 3
console.log(firstMissingPositive([3,4,-1,1])); // 2
console.log(firstMissingPositive([7,8,9,11,12])); // 1

console.log("\nSolution 2 - Cyclic Sort:");
console.log(firstMissingPositiveCyclicSort([1,2,0])); // 3
console.log(firstMissingPositiveCyclicSort([3,4,-1,1])); // 2

console.log("\nSolution 3 - Set Approach:");
console.log(firstMissingPositiveSet([1,2,0])); // 3
console.log(firstMissingPositiveSet([7,8,9,11,12])); // 1

console.log("\nSolution 4 - Segregation:");
console.log(firstMissingPositiveSegregation([3,4,-1,1])); // 2

console.log("\nSolution 7 - Mathematical:");
console.log(firstMissingPositiveMath([1,2,0])); // 3

console.log("\nSolution 8 - Divide and Conquer:");
console.log(firstMissingPositiveDivideConquer([3,4,-1,1])); // 2

// Edge cases
console.log("\nEdge Cases:");
console.log("All negatives:", firstMissingPositive([-1,-2,-3])); // 1
console.log("Sequential from 1:", firstMissingPositive([1,2,3,4,5])); // 6
console.log("Large numbers:", firstMissingPositive([1000,1001,1002])); // 1
console.log("Single element:", firstMissingPositive([1])); // 2
console.log("Empty array:", firstMissingPositive([])); // 1

// Performance comparison
const largeArray = Array.from({length: 10000}, () => Math.floor(Math.random() * 20000) - 10000);

console.log("\nPerformance comparison on large array (10000 elements):");
console.time("Index as Hash");
firstMissingPositive([...largeArray]);
console.timeEnd("Index as Hash");

console.time("Cyclic Sort");
firstMissingPositiveCyclicSort([...largeArray]);
console.timeEnd("Cyclic Sort");

console.time("Set Approach");
firstMissingPositiveSet([...largeArray]);
console.timeEnd("Set Approach");

console.time("Segregation");
firstMissingPositiveSegregation([...largeArray]);
console.timeEnd("Segregation");

// Time Complexity Analysis:
// Solution 1: O(n) time, O(1) space - Most optimal, modifies input
// Solution 2: O(n) time, O(1) space - Cyclic sort approach, cleaner logic
// Solution 3: O(n) time, O(n) space - Set approach, doesn't modify input
// Solution 4: O(n) time, O(1) space - Segregation first, then marking
// Solution 5: O(n) time, O(n) space - Boolean array, simple logic
// Solution 6: O(n) time, O(n) space - Bucket sort variation
// Solution 7: O(n log n) time, O(n) space - Mathematical approach
// Solution 8: O(n log n) time, O(log n) space - Divide and conquer