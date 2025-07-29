/**
 * 50. Pow(x, n) - Medium
 * 
 * Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).
 */

function myPow(x: number, n: number): number {
    // Advanced: Fast Exponentiation (Binary Exponentiation)
    // Time: O(log n), Space: O(log n) due to recursion
    
    if (n === 0) return 1;
    if (n < 0) return 1 / myPow(x, -n);
    
    // Recursive fast exponentiation
    if (n % 2 === 0) {
        const half = myPow(x, n / 2);
        return half * half;
    } else {
        return x * myPow(x, n - 1);
    }
}

// Iterative approach - more space efficient
function myPowIterative(x: number, n: number): number {
    // Time: O(log n), Space: O(1)
    if (n === 0) return 1;
    
    let result = 1;
    let power = Math.abs(n);
    let base = x;
    
    // Binary exponentiation using bit manipulation
    while (power > 0) {
        if (power & 1) { // If power is odd
            result *= base;
        }
        base *= base;    // Square the base
        power >>= 1;     // Divide power by 2
    }
    
    return n < 0 ? 1 / result : result;
}

// Advanced: Handle edge cases and precision
function myPowAdvanced(x: number, n: number): number {
    // Handle special cases
    if (n === 0) return 1;
    if (x === 0) return 0;
    if (x === 1) return 1;
    if (x === -1) return n % 2 === 0 ? 1 : -1;
    
    // Handle overflow for large negative n
    if (n === -2147483648) { // Integer.MIN_VALUE
        return myPowAdvanced(x, -2147483647) / x;
    }
    
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    
    let result = 1;
    let currentPower = x;
    
    // Use binary representation of n
    while (n > 0) {
        if (n % 2 === 1) {
            result *= currentPower;
        }
        currentPower *= currentPower;
        n = Math.floor(n / 2);
    }
    
    return result;
}

// Matrix exponentiation approach for educational purposes
function myPowMatrix(x: number, n: number): number {
    if (n === 0) return 1;
    if (n < 0) return 1 / myPowMatrix(x, -n);
    
    // Represent x^n as matrix multiplication
    // [x 0] ^ n = [x^n 0]
    // [0 1]       [0   1]
    
    function matrixMultiply(a: number[][], b: number[][]): number[][] {
        return [
            [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
            [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
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
    
    const baseMatrix = [[x, 0], [0, 1]];
    const resultMatrix = matrixPower(baseMatrix, n);
    return resultMatrix[0][0];
}

// Memoized version for repeated calculations
const powMemo = new Map<string, number>();

function myPowMemoized(x: number, n: number): number {
    const key = `${x},${n}`;
    if (powMemo.has(key)) return powMemo.get(key)!;
    
    let result: number;
    if (n === 0) {
        result = 1;
    } else if (n < 0) {
        result = 1 / myPowMemoized(x, -n);
    } else if (n % 2 === 0) {
        const half = myPowMemoized(x, n / 2);
        result = half * half;
    } else {
        result = x * myPowMemoized(x, n - 1);
    }
    
    powMemo.set(key, result);
    return result;
}

// Test cases
console.log("=== 50. Pow(x, n) Tests ===");
console.log(myPow(2.0, 10));     // Expected: 1024.0
console.log(myPow(2.1, 3));      // Expected: 9.261
console.log(myPow(2.0, -2));     // Expected: 0.25
console.log(myPow(1.0, 2147483647)); // Expected: 1.0

// Edge cases
console.log(myPow(0.0, 5));      // Expected: 0.0
console.log(myPow(1.0, -2147483648)); // Expected: 1.0
console.log(myPow(-1.0, 2147483647)); // Expected: -1.0
console.log(myPow(2.0, 0));      // Expected: 1.0

// Performance comparison
console.log("\n=== Performance Test ===");
const testCases = [[2, 1000], [1.5, 500], [10, 100], [-2, 63]];

console.log("Recursive:", testCases.map(([x, n]) => myPow(x, n)));
console.log("Iterative:", testCases.map(([x, n]) => myPowIterative(x, n)));
console.log("Advanced:", testCases.map(([x, n]) => myPowAdvanced(x, n)));