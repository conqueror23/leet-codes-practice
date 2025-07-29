/**
 * 60. Permutation Sequence - Hard
 * 
 * The set [1, 2, 3, ..., n] contains a total of n! unique permutations.
 * By listing and labeling all of the permutations in order, we get the following sequence for n = 3:
 * "123", "132", "213", "231", "312", "321"
 * 
 * Given n and k, return the kth permutation sequence.
 */

function getPermutation(n: number, k: number): string {
    // Advanced: Mathematical approach using factorial number system
    // Time: O(n^2), Space: O(n)
    
    const factorial: number[] = [1];
    const numbers: number[] = [];
    
    // Precompute factorials and available numbers
    for (let i = 1; i <= n; i++) {
        factorial[i] = factorial[i - 1] * i;
        numbers.push(i);
    }
    
    k--; // Convert to 0-indexed
    const result: string[] = [];
    
    // Generate permutation digit by digit
    for (let i = n; i >= 1; i--) {
        const factorialValue = factorial[i - 1];
        const index = Math.floor(k / factorialValue);
        
        // Pick the number at calculated index
        result.push(numbers.splice(index, 1)[0].toString());
        
        // Update k for next iteration
        k %= factorialValue;
    }
    
    return result.join('');
}

// Alternative: Recursive approach with memoization
function getPermutationRecursive(n: number, k: number): string {
    const memo = new Map<string, string>();
    
    function solve(nums: number[], remaining: number): string {
        const key = `${nums.join(',')},${remaining}`;
        if (memo.has(key)) return memo.get(key)!;
        
        if (nums.length === 1) return nums[0].toString();
        if (remaining === 1) return nums.join('');
        
        const factorial = getFactorial(nums.length - 1);
        const groupSize = factorial;
        const groupIndex = Math.ceil(remaining / groupSize) - 1;
        
        const chosen = nums[groupIndex];
        const remainingNums = nums.filter((_, i) => i !== groupIndex);
        const positionInGroup = remaining - groupIndex * groupSize;
        
        const result = chosen + solve(remainingNums, positionInGroup);
        memo.set(key, result);
        return result;
    }
    
    function getFactorial(num: number): number {
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        return result;
    }
    
    const nums = Array.from({length: n}, (_, i) => i + 1);
    return solve(nums, k);
}

// Optimized: Using Lehmer code (factorial number system)
function getPermutationLehmer(n: number, k: number): string {
    // Convert k to Lehmer code, then to permutation
    const factoradic: number[] = [];
    const available = Array.from({length: n}, (_, i) => i + 1);
    
    k--; // Convert to 0-indexed
    
    // Convert k to factorial number system (Lehmer code)
    for (let i = n; i >= 1; i--) {
        const factorial = getFactorial(i - 1);
        const digit = Math.floor(k / factorial);
        factoradic.push(digit);
        k %= factorial;
    }
    
    // Convert Lehmer code to permutation
    const result: string[] = [];
    for (const digit of factoradic) {
        result.push(available.splice(digit, 1)[0].toString());
    }
    
    return result.join('');
    
    function getFactorial(num: number): number {
        let result = 1;
        for (let i = 1; i <= num; i++) {
            result *= i;
        }
        return result;
    }
}

// Advanced: Iterative with early termination
function getPermutationOptimized(n: number, k: number): string {
    // Precompute factorials up to n
    const factorials = new Array(n + 1);
    factorials[0] = 1;
    for (let i = 1; i <= n; i++) {
        factorials[i] = factorials[i - 1] * i;
    }
    
    // Early termination for edge cases
    if (k === 1) return Array.from({length: n}, (_, i) => i + 1).join('');
    if (k === factorials[n]) return Array.from({length: n}, (_, i) => n - i).join('');
    
    const digits = Array.from({length: n}, (_, i) => i + 1);
    const result: string[] = [];
    k--; // Convert to 0-indexed
    
    for (let i = n - 1; i >= 0; i--) {
        const factorial = factorials[i];
        const index = Math.floor(k / factorial);
        
        result.push(digits.splice(index, 1)[0].toString());
        k %= factorial;
        
        // Early exit if k becomes 0
        if (k === 0) {
            result.push(...digits.map(d => d.toString()));
            break;
        }
    }
    
    return result.join('');
}

// Cantor ranking approach
function getPermutationCantor(n: number, k: number): string {
    const numbers = Array.from({length: n}, (_, i) => i + 1);
    const result: string[] = [];
    
    k--; // Convert to 0-indexed
    
    for (let i = 0; i < n; i++) {
        const factorial = getFactorial(n - 1 - i);
        const index = Math.floor(k / factorial);
        
        result.push(numbers.splice(index, 1)[0].toString());
        k %= factorial;
    }
    
    return result.join('');
    
    function getFactorial(num: number): number {
        if (num <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        return result;
    }
}

// Test cases
console.log("=== 60. Permutation Sequence Tests ===");
console.log(getPermutation(3, 3)); // Expected: "213"
console.log(getPermutation(4, 9)); // Expected: "2314"
console.log(getPermutation(3, 1)); // Expected: "123"
console.log(getPermutation(1, 1)); // Expected: "1"

// Large test cases
console.log(getPermutation(9, 362880)); // Expected: "987654321" (last permutation)
console.log(getPermutation(9, 1));      // Expected: "123456789" (first permutation)
console.log(getPermutation(8, 20000));  // Expected: "65724318"

// Performance comparison
console.log("\n=== Performance Comparison ===");
const testCases = [[4, 14], [5, 96], [6, 463], [7, 2467]];
console.log("Main approach:", testCases.map(([n, k]) => getPermutation(n, k)));
console.log("Lehmer code:", testCases.map(([n, k]) => getPermutationLehmer(n, k)));
console.log("Optimized:", testCases.map(([n, k]) => getPermutationOptimized(n, k)));