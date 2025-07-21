// LeetCode 1: Two Sum (Easy) - Advanced Solutions
// Given an array of integers nums and an integer target, return indices of the two numbers 
// such that they add up to target. You may assume that each input would have exactly one solution, 
// and you may not use the same element twice.

/**
 * APPROACH 1: One-pass Hash Table (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Best for: Most efficient solution, single pass through array
 */
function twoSumOnePass(nums: number[], target: number): number[] {
    const numMap = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement)!, i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return []; // Should never reach here based on problem constraints
}

/**
 * APPROACH 2: Two-pass Hash Table
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Best for: When you prefer separate build and query phases
 */
function twoSumTwoPass(nums: number[], target: number): number[] {
    const numMap = new Map<number, number>();
    
    // First pass: build the hash table
    for (let i = 0; i < nums.length; i++) {
        numMap.set(nums[i], i);
    }
    
    // Second pass: find the complement
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement) && numMap.get(complement) !== i) {
            return [i, numMap.get(complement)!];
        }
    }
    
    return [];
}

/**
 * APPROACH 3: Brute Force (Baseline)
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * Best for: Understanding the problem, when space is extremely limited
 */
function twoSumBruteForce(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

/**
 * APPROACH 4: Two Pointers (requires sorting, loses original indices)
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * Best for: Educational purposes, shows alternative thinking
 * Note: Modified to return original indices despite sorting
 */
function twoSumTwoPointers(nums: number[], target: number): number[] {
    // Create array of [value, originalIndex] pairs
    const indexedNums = nums.map((num, index) => ({ value: num, index }));
    
    // Sort by value
    indexedNums.sort((a, b) => a.value - b.value);
    
    let left = 0;
    let right = indexedNums.length - 1;
    
    while (left < right) {
        const sum = indexedNums[left].value + indexedNums[right].value;
        
        if (sum === target) {
            const leftIndex = indexedNums[left].index;
            const rightIndex = indexedNums[right].index;
            return leftIndex < rightIndex ? [leftIndex, rightIndex] : [rightIndex, leftIndex];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];
}

/**
 * APPROACH 5: Set-based approach (alternative hash implementation)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Best for: When you want to use Set instead of Map
 */
function twoSumSet(nums: number[], target: number): number[] {
    const numSet = new Map<number, number[]>(); // Handle duplicates
    
    // Build map of number to all its indices
    for (let i = 0; i < nums.length; i++) {
        if (!numSet.has(nums[i])) {
            numSet.set(nums[i], []);
        }
        numSet.get(nums[i])!.push(i);
    }
    
    // Find complement
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numSet.has(complement)) {
            const indices = numSet.get(complement)!;
            
            if (complement === nums[i]) {
                // Same number, need two different indices
                if (indices.length > 1) {
                    return [indices[0], indices[1]];
                }
            } else {
                // Different numbers
                return [i, indices[0]];
            }
        }
    }
    
    return [];
}

/**
 * BONUS: Multiple solutions variant
 * Returns all pairs of indices that sum to target
 */
function twoSumAllPairs(nums: number[], target: number): number[][] {
    const result: number[][] = [];
    const numMap = new Map<number, number[]>();
    
    // Build map of all indices for each number
    for (let i = 0; i < nums.length; i++) {
        if (!numMap.has(nums[i])) {
            numMap.set(nums[i], []);
        }
        numMap.get(nums[i])!.push(i);
    }
    
    const seen = new Set<string>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            const complementIndices = numMap.get(complement)!;
            
            for (const j of complementIndices) {
                if (i < j) { // Ensure i < j to avoid duplicates
                    const pairKey = `${i},${j}`;
                    if (!seen.has(pairKey)) {
                        result.push([i, j]);
                        seen.add(pairKey);
                    }
                }
            }
        }
    }
    
    return result;
}

/**
 * Performance Comparison Function
 */
function performanceComparison(nums: number[], target: number): void {
    console.log(`\n=== Two Sum Performance Comparison ===`);
    console.log(`Array size: ${nums.length}, Target: ${target}`);
    
    const methods = [
        { name: 'One-pass Hash', func: twoSumOnePass, complexity: 'O(n) time, O(n) space' },
        { name: 'Two-pass Hash', func: twoSumTwoPass, complexity: 'O(n) time, O(n) space' },
        { name: 'Brute Force', func: twoSumBruteForce, complexity: 'O(n²) time, O(1) space' },
        { name: 'Two Pointers', func: twoSumTwoPointers, complexity: 'O(n log n) time, O(n) space' },
        { name: 'Set-based', func: twoSumSet, complexity: 'O(n) time, O(n) space' }
    ];
    
    methods.forEach(method => {
        const start = performance.now();
        const result = method.func([...nums], target); // Clone to avoid mutation
        const end = performance.now();
        
        console.log(`${method.name.padEnd(16)}: [${result.join(', ').padEnd(6)}] | ${(end - start).toFixed(4)}ms | ${method.complexity}`);
    });
}

/**
 * Advanced Test Cases
 */
function runAdvancedTests(): void {
    console.log('=== Two Sum Advanced Test Cases ===');
    
    const testCases = [
        {
            nums: [2, 7, 11, 15], target: 9, expected: [0, 1],
            description: 'Standard case: first two elements sum to target'
        },
        {
            nums: [3, 2, 4], target: 6, expected: [1, 2],
            description: 'Elements not at beginning'
        },
        {
            nums: [3, 3], target: 6, expected: [0, 1],
            description: 'Duplicate elements'
        },
        {
            nums: [-1, -2, -3, -4, -5], target: -8, expected: [2, 4],
            description: 'All negative numbers'
        },
        {
            nums: [0, 4, 3, 0], target: 0, expected: [0, 3],
            description: 'Zero target with zeros in array'
        },
        {
            nums: [1, 2, 3, 4, 5], target: 8, expected: [2, 4],
            description: 'Sequential array'
        },
        {
            nums: [1, 5, 2, 4, 3], target: 7, expected: [1, 2],
            description: 'Unsorted array'
        },
        {
            nums: [-3, 4, 3, 90], target: 0, expected: [0, 2],
            description: 'Mixed positive and negative'
        }
    ];
    
    const methods = [
        { name: 'OnePass', func: twoSumOnePass },
        { name: 'TwoPass', func: twoSumTwoPass },
        { name: 'Brute', func: twoSumBruteForce },
        { name: 'TwoPtr', func: twoSumTwoPointers },
        { name: 'Set', func: twoSumSet }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`nums=[${testCase.nums.join(', ')}], target=${testCase.target}, expected=[${testCase.expected.join(', ')}]`);
        
        methods.forEach(method => {
            const result = method.func([...testCase.nums], testCase.target);
            // Check if result matches expected (order might be different)
            const passed = (result.length === testCase.expected.length) && 
                          (result.includes(testCase.expected[0]) && result.includes(testCase.expected[1]));
            console.log(`  ${method.name.padEnd(8)}: [${result.join(', ').padEnd(6)}] ${passed ? '✓' : '✗'}`);
        });
    });
}

/**
 * Algorithm Analysis
 */
function algorithmAnalysis(): void {
    console.log('\n=== Algorithm Analysis ===');
    console.log('PROBLEM PATTERN: Complement Search with Hash Table');
    console.log('');
    console.log('APPROACH COMPARISON:');
    console.log('1. One-pass Hash: Optimal solution, builds map while searching');
    console.log('2. Two-pass Hash: Clear separation of concerns, same complexity');
    console.log('3. Brute Force: O(n²) baseline, no extra space');
    console.log('4. Two Pointers: O(n log n) due to sorting, clever alternative');
    console.log('5. Set-based: Alternative implementation, handles duplicates explicitly');
    console.log('');
    console.log('KEY INSIGHTS:');
    console.log('- Hash table trades space for time: O(n) space → O(n) time');
    console.log('- One-pass is optimal: check complement before storing current');
    console.log('- Problem guarantees exactly one solution exists');
    console.log('- Index preservation is key constraint (rules out naive sorting)');
    console.log('');
    console.log('RECOMMENDED: One-pass hash table for optimal performance');
}

/**
 * Edge Cases and Variations
 */
function edgeCasesAndVariations(): void {
    console.log('\n=== Edge Cases and Variations ===');
    console.log('EDGE CASES HANDLED:');
    console.log('- Duplicate numbers in array');
    console.log('- Negative numbers and zero');
    console.log('- Target is zero');
    console.log('- Array with only two elements');
    console.log('');
    console.log('PROBLEM VARIATIONS:');
    console.log('1. Two Sum II: Sorted array → use two pointers');
    console.log('2. Three Sum: Find triplets that sum to zero');
    console.log('3. Four Sum: Find quadruplets with specific sum');
    console.log('4. Two Sum BST: Find pairs in binary search tree');
    console.log('5. Two Sum Count: Count pairs instead of returning indices');
    console.log('6. Two Sum Range: Find pairs within a sum range');
    console.log('');
    console.log('EXTENSIONS:');
    console.log('- Return all pairs (not just first one found)');
    console.log('- Return actual values instead of indices');
    console.log('- Handle multiple solutions');
    console.log('- Optimize for repeated queries on same array');
}

/**
 * Hash Table Internals Discussion
 */
function hashTableInternals(): void {
    console.log('\n=== Hash Table Internals ===');
    console.log('WHY HASH TABLE WORKS:');
    console.log('- Average O(1) lookup time');
    console.log('- JavaScript Map uses hash table internally');
    console.log('- Hash function distributes keys across buckets');
    console.log('');
    console.log('POTENTIAL ISSUES:');
    console.log('- Hash collisions: worst case O(n) lookup');
    console.log('- Memory overhead: storing key-value pairs');
    console.log('- Hash function quality affects performance');
    console.log('');
    console.log('ALTERNATIVE DATA STRUCTURES:');
    console.log('- Array (if numbers are in small range)');
    console.log('- Balanced BST: O(log n) lookup, O(n) space');
    console.log('- Bloom filter: probabilistic, space-efficient');
}

// Demo with comprehensive testing
function comprehensiveDemo(): void {
    console.log('=== Two Sum Comprehensive Demo ===');
    
    // Test with different array sizes to show performance differences
    const smallArray = [2, 7, 11, 15];
    const mediumArray = Array.from({length: 100}, (_, i) => i);
    const largeArray = Array.from({length: 1000}, (_, i) => i);
    
    console.log('\nPerformance on different sizes:');
    performanceComparison(smallArray, 9);
    performanceComparison(mediumArray, 99);
    performanceComparison(largeArray, 999);
    
    // Test all pairs variant
    console.log('\nAll pairs example:');
    const allPairs = twoSumAllPairs([1, 2, 3, 4, 3, 2], 5);
    console.log('Array: [1, 2, 3, 4, 3, 2], Target: 5');
    console.log('All pairs:', allPairs);
}

// Run all tests and analysis
runAdvancedTests();
algorithmAnalysis();
edgeCasesAndVariations();
hashTableInternals();
comprehensiveDemo();

export { 
    twoSumOnePass, 
    twoSumTwoPass, 
    twoSumBruteForce, 
    twoSumTwoPointers, 
    twoSumSet,
    twoSumAllPairs 
};