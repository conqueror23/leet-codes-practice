// LeetCode 509: Fibonacci Number (Easy) - Advanced Solutions
// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, 
// such that each number is the sum of the two preceding ones.

/**
 * APPROACH 1: Iterative with Space Optimization
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Best for: Most practical cases, excellent space efficiency
 */
function fibIterative(n: number): number {
    if (n <= 1) return n;
    
    let prev = 0;
    let curr = 1;
    
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}

/**
 * APPROACH 2: Recursive with Memoization (Top-down DP)
 * Time Complexity: O(n)
 * Space Complexity: O(n) - for memoization array and call stack
 * Best for: Understanding recursive structure, easier to extend to variations
 */
function fibMemoized(n: number): number {
    const memo: number[] = new Array(n + 1).fill(-1);
    
    function helper(num: number): number {
        if (num <= 1) return num;
        if (memo[num] !== -1) return memo[num];
        
        memo[num] = helper(num - 1) + helper(num - 2);
        return memo[num];
    }
    
    return helper(n);
}

/**
 * APPROACH 3: Tabulation (Bottom-up DP)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * Best for: Systematic approach, easy to understand DP concept
 */
function fibTabulation(n: number): number {
    if (n <= 1) return n;
    
    const dp: number[] = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

/**
 * APPROACH 4: Matrix Exponentiation
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Best for: Very large n values, fastest asymptotic complexity
 */
function fibMatrix(n: number): number {
    if (n <= 1) return n;
    
    // Matrix [[1, 1], [1, 0]]^n = [[F(n+1), F(n)], [F(n), F(n-1)]]
    function matrixMultiply(A: number[][], B: number[][]): number[][] {
        return [
            [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
            [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
        ];
    }
    
    function matrixPower(matrix: number[][], power: number): number[][] {
        if (power === 1) return matrix;
        if (power % 2 === 0) {
            const half = matrixPower(matrix, power / 2);
            return matrixMultiply(half, half);
        } else {
            return matrixMultiply(matrix, matrixPower(matrix, power - 1));
        }
    }
    
    const baseMatrix = [[1, 1], [1, 0]];
    const resultMatrix = matrixPower(baseMatrix, n);
    return resultMatrix[0][1]; // F(n) position in result matrix
}

/**
 * APPROACH 5: Binet's Formula (Golden Ratio)
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * Best for: Mathematical elegance, but limited by floating point precision
 * Note: Only accurate for smaller values of n due to floating point precision
 */
function fibBinet(n: number): number {
    if (n <= 1) return n;
    
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const psi = (1 - Math.sqrt(5)) / 2; // Conjugate of golden ratio
    
    return Math.round((Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5));
}

/**
 * Performance Comparison Function
 */
function performanceComparison(n: number): void {
    console.log(`\n=== Fibonacci Performance Comparison for n=${n} ===`);
    
    const methods = [
        { name: 'Iterative', func: fibIterative, complexity: 'O(n) time, O(1) space' },
        { name: 'Memoized', func: fibMemoized, complexity: 'O(n) time, O(n) space' },
        { name: 'Tabulation', func: fibTabulation, complexity: 'O(n) time, O(n) space' },
        { name: 'Matrix', func: fibMatrix, complexity: 'O(log n) time, O(1) space' },
        { name: 'Binet', func: fibBinet, complexity: 'O(1) time, O(1) space' }
    ];
    
    methods.forEach(method => {
        const start = performance.now();
        const result = method.func(n);
        const end = performance.now();
        
        console.log(`${method.name.padEnd(12)}: ${result.toString().padEnd(15)} | ${(end - start).toFixed(4)}ms | ${method.complexity}`);
    });
}

// Test cases with comprehensive edge cases
function runTests(): void {
    console.log('=== Fibonacci Advanced Solutions Test Cases ===');
    
    const testCases = [
        { input: 0, expected: 0, description: 'Base case: F(0)' },
        { input: 1, expected: 1, description: 'Base case: F(1)' },
        { input: 2, expected: 1, description: 'Small case: F(2)' },
        { input: 10, expected: 55, description: 'Medium case: F(10)' },
        { input: 20, expected: 6765, description: 'Larger case: F(20)' },
        { input: 30, expected: 832040, description: 'Large case: F(30)' }
    ];
    
    const methods = [
        { name: 'Iterative', func: fibIterative },
        { name: 'Memoized', func: fibMemoized },
        { name: 'Tabulation', func: fibTabulation },
        { name: 'Matrix', func: fibMatrix },
        { name: 'Binet', func: fibBinet }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\nTest: ${testCase.description}`);
        methods.forEach(method => {
            const result = method.func(testCase.input);
            const passed = result === testCase.expected;
            console.log(`  ${method.name}: ${result} ${passed ? '✓' : '✗'}`);
        });
    });
}

// Algorithm Analysis
function algorithmAnalysis(): void {
    console.log('\n=== Algorithm Analysis ===');
    console.log('1. Iterative: Most practical, constant space, linear time');
    console.log('2. Memoized: Good for understanding recursion, uses extra space');
    console.log('3. Tabulation: Classic DP, systematic bottom-up approach');
    console.log('4. Matrix: Best asymptotic complexity, good for very large n');
    console.log('5. Binet: Theoretical O(1), but precision issues for large n');
    console.log('\nRecommended approach: Iterative for most cases, Matrix for very large n');
}

// Run all tests and comparisons
runTests();
performanceComparison(30);
algorithmAnalysis();

export { fibIterative, fibMemoized, fibTabulation, fibMatrix, fibBinet };