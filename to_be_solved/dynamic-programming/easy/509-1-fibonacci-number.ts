// LeetCode 509: Fibonacci Number (Easy) - Advanced Solutions

// Solution 1: Iterative DP - Space Optimized (Original)
function fib(n: number): number {
    if (n <= 1) return n;
    
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        [prev, curr] = [curr, prev + curr];
    }
    return curr;
}

// Solution 2: Memoized Recursion
function fibMemo(n: number): number {
    const memo = new Map<number, number>();
    
    function helper(num: number): number {
        if (num <= 1) return num;
        if (memo.has(num)) return memo.get(num)!;
        
        const result = helper(num - 1) + helper(num - 2);
        memo.set(num, result);
        return result;
    }
    
    return helper(n);
}

// Solution 3: Matrix Exponentiation - O(log n)
function fibMatrix(n: number): number {
    if (n <= 1) return n;
    
    function multiply(a: number[][], b: number[][]): number[][] {
        return [
            [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
            [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
        ];
    }
    
    function matrixPower(matrix: number[][], power: number): number[][] {
        if (power === 1) return matrix;
        
        if (power % 2 === 0) {
            const half = matrixPower(matrix, power / 2);
            return multiply(half, half);
        } else {
            return multiply(matrix, matrixPower(matrix, power - 1));
        }
    }
    
    const baseMatrix = [[1, 1], [1, 0]];
    const result = matrixPower(baseMatrix, n);
    return result[0][1];
}

// Solution 4: Golden Ratio Formula (Binet's)
function fibFormula(n: number): number {
    const phi = (1 + Math.sqrt(5)) / 2;
    const psi = (1 - Math.sqrt(5)) / 2;
    return Math.round((Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5));
}

// Solution 5: Tabulation DP
function fibTabulation(n: number): number {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Test cases
console.log("Iterative:", fib(10)); // 55
console.log("Memoized:", fibMemo(10)); // 55
console.log("Matrix:", fibMatrix(10)); // 55
console.log("Formula:", fibFormula(10)); // 55
console.log("Tabulation:", fibTabulation(10)); // 55

// Time Complexity Analysis:
// Solution 1: O(n) time, O(1) space - Most practical
// Solution 2: O(n) time, O(n) space - Good for understanding
// Solution 3: O(log n) time, O(log n) space - Best for large n
// Solution 4: O(1) time, O(1) space - Fastest but precision issues
// Solution 5: O(n) time, O(n) space - Classical DP approach