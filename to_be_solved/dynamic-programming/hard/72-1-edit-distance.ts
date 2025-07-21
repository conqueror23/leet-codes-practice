// LeetCode 72: Edit Distance (Hard) - Advanced Solutions
// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.
// You have the following three operations permitted on a word: Insert, Delete, Replace

/**
 * APPROACH 1: Classic 2D DP (Wagner-Fischer Algorithm)
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 * Best for: Understanding the problem structure, tracking actual operations
 */
function minDistanceClassic(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;
    
    // dp[i][j] = min operations to convert word1[0...i-1] to word2[0...j-1]
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i; // Delete all characters from word1
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j; // Insert all characters to match word2
    }
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // No operation needed
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,     // Delete from word1
                    dp[i][j - 1] + 1,     // Insert into word1
                    dp[i - 1][j - 1] + 1  // Replace in word1
                );
            }
        }
    }
    
    return dp[m][n];
}

/**
 * APPROACH 2: Space-Optimized 1D DP
 * Time Complexity: O(m * n)
 * Space Complexity: O(min(m, n))
 * Best for: Memory-constrained environments, large strings
 */
function minDistanceSpaceOptimized(word1: string, word2: string): number {
    let [shorter, longer] = word1.length <= word2.length ? [word1, word2] : [word2, word1];
    const m = shorter.length;
    const n = longer.length;
    
    let prev = Array.from({ length: m + 1 }, (_, i) => i);
    
    for (let j = 1; j <= n; j++) {
        let curr = [j]; // curr[0] = j (insert j characters)
        
        for (let i = 1; i <= m; i++) {
            if (shorter[i - 1] === longer[j - 1]) {
                curr[i] = prev[i - 1]; // No operation needed
            } else {
                curr[i] = Math.min(
                    prev[i] + 1,     // Delete
                    curr[i - 1] + 1, // Insert
                    prev[i - 1] + 1  // Replace
                );
            }
        }
        
        prev = curr;
    }
    
    return prev[m];
}

/**
 * APPROACH 3: Recursive with Memoization
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) for memoization + O(m + n) for call stack
 * Best for: Understanding recursive structure, easy to modify for variations
 */
function minDistanceMemo(word1: string, word2: string): number {
    const memo = new Map<string, number>();
    
    function helper(i: number, j: number): number {
        // Base cases
        if (i === 0) return j; // Insert all remaining characters from word2
        if (j === 0) return i; // Delete all remaining characters from word1
        
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key)!;
        
        let result: number;
        if (word1[i - 1] === word2[j - 1]) {
            result = helper(i - 1, j - 1); // Characters match, no operation needed
        } else {
            result = Math.min(
                helper(i - 1, j) + 1,     // Delete from word1
                helper(i, j - 1) + 1,     // Insert into word1
                helper(i - 1, j - 1) + 1  // Replace in word1
            );
        }
        
        memo.set(key, result);
        return result;
    }
    
    return helper(word1.length, word2.length);
}

/**
 * APPROACH 4: Hirschberg's Algorithm (Divide and Conquer)
 * Time Complexity: O(m * n)
 * Space Complexity: O(min(m, n))
 * Best for: Very large strings where space is critical, linear space guarantee
 */
function minDistanceHirschberg(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;
    
    if (m === 0) return n;
    if (n === 0) return m;
    if (m === 1 || n === 1) {
        return minDistanceSpaceOptimized(word1, word2);
    }
    
    // Find optimal split point
    const mid = Math.floor(m / 2);
    
    // Compute edit distances for first half
    const left = computeEditDistance(word1.substring(0, mid), word2);
    
    // Compute edit distances for second half (reversed)
    const right = computeEditDistance(
        word1.substring(mid).split('').reverse().join(''),
        word2.split('').reverse().join('')
    ).reverse();
    
    // Find optimal split point in word2
    let minCost = Infinity;
    for (let j = 0; j <= n; j++) {
        minCost = Math.min(minCost, left[j] + right[j]);
    }
    
    return minCost;
}

function computeEditDistance(word1: string, word2: string): number[] {
    const m = word1.length;
    const n = word2.length;
    
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    
    for (let i = 1; i <= m; i++) {
        let curr = [i];
        
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + 1);
            }
        }
        
        prev = curr;
    }
    
    return prev;
}

/**
 * APPROACH 5: Early Termination with Threshold
 * Time Complexity: O(m * n) worst case, often much better
 * Space Complexity: O(min(m, n))
 * Best for: When you only need to know if edit distance is below a threshold
 */
function minDistanceWithThreshold(word1: string, word2: string, threshold: number): number {
    const m = word1.length;
    const n = word2.length;
    
    // Early termination checks
    if (Math.abs(m - n) > threshold) return threshold + 1;
    if (m === 0) return n > threshold ? threshold + 1 : n;
    if (n === 0) return m > threshold ? threshold + 1 : m;
    
    let prev = Array.from({ length: n + 1 }, (_, i) => i > threshold ? threshold + 1 : i);
    
    for (let i = 1; i <= m; i++) {
        let curr = [i > threshold ? threshold + 1 : i];
        let hasValidValue = curr[0] <= threshold;
        
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + 1);
            }
            
            if (curr[j] <= threshold) {
                hasValidValue = true;
            } else {
                curr[j] = threshold + 1; // Cap at threshold + 1
            }
        }
        
        // Early termination: if no value in current row is within threshold
        if (!hasValidValue) {
            return threshold + 1;
        }
        
        prev = curr;
    }
    
    return Math.min(prev[n], threshold + 1);
}

/**
 * BONUS: Get actual edit operations sequence
 */
function getEditOperations(word1: string, word2: string): string[] {
    const m = word1.length;
    const n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    // Fill DP table (same as classic approach)
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + 1
                );
            }
        }
    }
    
    // Backtrack to get operations
    const operations: string[] = [];
    let i = m, j = n;
    
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && word1[i - 1] === word2[j - 1]) {
            i--;
            j--;
        } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
            operations.unshift(`Replace '${word1[i - 1]}' with '${word2[j - 1]}' at position ${i - 1}`);
            i--;
            j--;
        } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            operations.unshift(`Delete '${word1[i - 1]}' at position ${i - 1}`);
            i--;
        } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
            operations.unshift(`Insert '${word2[j - 1]}' at position ${i}`);
            j--;
        }
    }
    
    return operations;
}

/**
 * Performance Comparison Function
 */
function performanceComparison(word1: string, word2: string): void {
    console.log(`\n=== Edit Distance Performance Comparison ===`);
    console.log(`Word1: "${word1}" (length: ${word1.length})`);
    console.log(`Word2: "${word2}" (length: ${word2.length})`);
    
    const methods = [
        { name: 'Classic 2D DP', func: minDistanceClassic, complexity: 'O(mn) time, O(mn) space' },
        { name: 'Space Optimized', func: minDistanceSpaceOptimized, complexity: 'O(mn) time, O(min(m,n)) space' },
        { name: 'Memoization', func: minDistanceMemo, complexity: 'O(mn) time, O(mn) space' },
        { name: 'Threshold (t=5)', func: (w1: string, w2: string) => minDistanceWithThreshold(w1, w2, 5), complexity: 'O(mn) worst, often better' }
    ];
    
    methods.forEach(method => {
        const start = performance.now();
        const result = method.func(word1, word2);
        const end = performance.now();
        
        console.log(`${method.name.padEnd(16)}: ${result.toString().padEnd(6)} | ${(end - start).toFixed(4)}ms | ${method.complexity}`);
    });
}

/**
 * Advanced Test Cases
 */
function runAdvancedTests(): void {
    console.log('=== Edit Distance Advanced Test Cases ===');
    
    const testCases = [
        {
            word1: 'horse', word2: 'ros', expected: 3,
            description: 'Classic example: horse → ros'
        },
        {
            word1: 'intention', word2: 'execution', expected: 5,
            description: 'Longer strings with multiple operations'
        },
        {
            word1: '', word2: 'abc', expected: 3,
            description: 'Empty string to non-empty'
        },
        {
            word1: 'abc', word2: '', expected: 3,
            description: 'Non-empty to empty string'
        },
        {
            word1: 'same', word2: 'same', expected: 0,
            description: 'Identical strings'
        },
        {
            word1: 'a', word2: 'b', expected: 1,
            description: 'Single character replacement'
        },
        {
            word1: 'kitten', word2: 'sitting', expected: 3,
            description: 'Classic edit distance example'
        },
        {
            word1: 'saturday', word2: 'sunday', expected: 3,
            description: 'Common substring optimization test'
        }
    ];
    
    const methods = [
        { name: 'Classic', func: minDistanceClassic },
        { name: 'Optimized', func: minDistanceSpaceOptimized },
        { name: 'Memo', func: minDistanceMemo }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`"${testCase.word1}" → "${testCase.word2}", Expected: ${testCase.expected}`);
        
        methods.forEach(method => {
            const result = method.func(testCase.word1, testCase.word2);
            const passed = result === testCase.expected;
            console.log(`  ${method.name.padEnd(10)}: ${result} ${passed ? '✓' : '✗'}`);
        });
        
        // Show actual operations for first few test cases
        if (index < 3) {
            const operations = getEditOperations(testCase.word1, testCase.word2);
            console.log(`  Operations: ${operations.length > 0 ? operations.join('; ') : 'None'}`);
        }
    });
}

/**
 * Algorithm Analysis
 */
function algorithmAnalysis(): void {
    console.log('\n=== Algorithm Analysis ===');
    console.log('1. Classic 2D DP: Most intuitive, allows backtracking for operations');
    console.log('2. Space Optimized: Best memory usage, same time complexity');
    console.log('3. Memoization: Good for understanding recursion, cache-friendly');
    console.log('4. Hirschberg: Linear space guarantee, good for huge strings');
    console.log('5. Threshold: Fast rejection when distance exceeds limit');
    console.log('\nKey Insights:');
    console.log('- Edit distance satisfies optimal substructure and overlapping subproblems');
    console.log('- Space optimization reduces O(mn) to O(min(m,n)) without time penalty');
    console.log('- Applications: Spell checking, DNA sequence alignment, version control');
}

// Run all tests and analysis
runAdvancedTests();
performanceComparison('intention', 'execution');
performanceComparison('kitten', 'sitting');
algorithmAnalysis();

export { 
    minDistanceClassic, 
    minDistanceSpaceOptimized, 
    minDistanceMemo, 
    minDistanceWithThreshold,
    getEditOperations 
};