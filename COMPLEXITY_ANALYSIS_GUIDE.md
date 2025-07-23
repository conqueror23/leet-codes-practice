# Time and Space Complexity Analysis Guide

This document provides a comprehensive guide to understanding and calculating time and space complexity for algorithms, with practical examples from LeetCode problems.

## Table of Contents

1. [Introduction to Complexity Analysis](#introduction)
2. [Big O Notation](#big-o-notation)
3. [Time Complexity](#time-complexity)
4. [Space Complexity](#space-complexity)
5. [Common Complexity Classes](#common-complexity-classes)
6. [Analysis Techniques](#analysis-techniques)
7. [Practical Examples](#practical-examples)
8. [Advanced Topics](#advanced-topics)
9. [Best Practices](#best-practices)

## Introduction

Complexity analysis is a fundamental skill for evaluating algorithm efficiency. It helps us:

- Compare different algorithms
- Predict performance with larger inputs
- Identify bottlenecks in code
- Make informed optimization decisions

## Big O Notation

Big O notation describes the upper bound of an algorithm's growth rate as input size approaches infinity.

### Key Principles:

1. **Focus on dominant terms**: O(n² + n) → O(n²)
2. **Ignore constants**: O(3n) → O(n)
3. **Worst-case analysis**: Consider the most expensive scenario
4. **Input size matters**: n typically represents input size

### Common Notations

- **O(1)** - Constant time
- **O(log n)** - Logarithmic time
- **O(n)** - Linear time
- **O(n log n)** - Linearithmic time
- **O(n²)** - Quadratic time
- **O(2ⁿ)** - Exponential time
- **O(n!)** - Factorial time

## Time Complexity

Time complexity measures how execution time grows with input size.

### Analysis Steps

1. **Identify basic operations** (assignments, comparisons, arithmetic)
2. **Count operations** as functions of input size
3. **Consider nested structures** (loops, recursion)
4. **Apply Big O rules**

### Examples

#### Example 1: Linear Search
```typescript
function linearSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {  // n iterations
        if (arr[i] === target) {             // 1 comparison per iteration
            return i;                        // 1 operation
        }
    }
    return -1;                               // 1 operation
}
```
**Analysis:**
- Loop runs up to n times
- Each iteration: 1 comparison + potential 1 return
- **Time Complexity: O(n)**

#### Example 2: Two Sum (Brute Force)
```typescript
function twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {        // n iterations
        for (let j = i + 1; j < nums.length; j++) { // (n-1) + (n-2) + ... + 1 iterations
            if (nums[i] + nums[j] === target) {     // 1 comparison
                return [i, j];
            }
        }
    }
    return [];
}
```
**Analysis:**
- Outer loop: n iterations
- Inner loop: (n-1) + (n-2) + ... + 1 = n(n-1)/2 iterations total
- Total operations: n(n-1)/2 ≈ n²/2
- **Time Complexity: O(n²)**

#### Example 3: Binary Search
```typescript
function binarySearch(arr: number[], target: number): number {
    let left = 0, right = arr.length - 1;

    while (left <= right) {                    // log n iterations
        const mid = Math.floor((left + right) / 2);  // 1 operation
        if (arr[mid] === target) return mid;          // 1 comparison
        else if (arr[mid] < target) left = mid + 1;   // 1 comparison + 1 assignment
        else right = mid - 1;                         // 1 assignment
    }
    return -1;
}
```
**Analysis:**
- Each iteration eliminates half the search space
- Maximum iterations: log₂(n)
- Each iteration: constant operations
- **Time Complexity: O(log n)**

## Space Complexity

Space complexity measures how memory usage grows with input size.

### Types of Space:
1. **Input space**: Memory for input data (usually excluded from analysis)
2. **Auxiliary space**: Extra memory used by algorithm
3. **Total space**: Input + Auxiliary space

### Common Space Patterns:

#### Constant Space O(1)
```typescript
function findMax(arr: number[]): number {
    let max = arr[0];  // 1 variable
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];  // Reusing same variable
        }
    }
    return max;
}
```
**Space Analysis:** Only uses one extra variable regardless of input size.

#### Linear Space O(n)
```typescript
function reverseArray(arr: number[]): number[] {
    const result = new Array(arr.length);  // n space
    for (let i = 0; i < arr.length; i++) {
        result[i] = arr[arr.length - 1 - i];
    }
    return result;
}
```
**Space Analysis:** Creates array of size n.

#### Recursive Space O(depth)
```typescript
function factorial(n: number): number {
    if (n <= 1) return 1;           // Base case
    return n * factorial(n - 1);    // Recursive call
}
```
**Space Analysis:**
- Each recursive call adds frame to call stack
- Maximum depth: n
- **Space Complexity: O(n)**

## Common Complexity Classes

### O(1) - Constant Time
```typescript
// Array access, hash table operations (average)
function getFirst(arr: number[]): number {
    return arr[0];  // Always 1 operation
}
```

### O(log n) - Logarithmic Time
```typescript
// Binary search, balanced tree operations
function binarySearchRecursive(arr: number[], target: number, left: number = 0, right: number = arr.length - 1): number {
    if (left > right) return -1;

    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;

    if (arr[mid] > target) {
        return binarySearchRecursive(arr, target, left, mid - 1);
    } else {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
}
```

### O(n) - Linear Time
```typescript
// Single loop through data
function sumArray(arr: number[]): number {
    let sum = 0;
    for (const num of arr) {  // n iterations
        sum += num;           // 1 operation per iteration
    }
    return sum;
}
```

### O(n log n) - Linearithmic Time
```typescript
// Efficient sorting algorithms
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));     // T(n/2)
    const right = mergeSort(arr.slice(mid));       // T(n/2)

    return merge(left, right);                     // O(n)
}
// Recurrence: T(n) = 2T(n/2) + O(n) = O(n log n)
```

### O(n²) - Quadratic Time
```typescript
// Nested loops over input
function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    for (let i = 0; i < n; i++) {        // n iterations
        for (let j = 0; j < n - i - 1; j++) {  // n-i-1 iterations
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
```

### O(2ⁿ) - Exponential Time
```typescript
// Naive recursive algorithms
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);  // 2 recursive calls
}
// Each call spawns 2 more calls, depth n → 2^n calls
```

## Analysis Techniques

### 1. Loop Analysis
```typescript
// Single loop: O(n)
for (let i = 0; i < n; i++) { /* O(1) operations */ }

// Nested loops: O(n²)
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) { /* O(1) operations */ }
}

// Dependent loops: O(n²)
for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) { /* O(1) operations */ }
}
// Total iterations: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)
```

### 2. Recursive Analysis

#### Master Theorem
For recurrences of the form: T(n) = aT(n/b) + f(n)

**Case 1:** If f(n) = O(n^c) where c < log_b(a), then T(n) = O(n^(log_b(a)))
**Case 2:** If f(n) = O(n^c) where c = log_b(a), then T(n) = O(n^c log n)
**Case 3:** If f(n) = O(n^c) where c > log_b(a), then T(n) = O(f(n))

#### Examples:
```typescript
// Merge Sort: T(n) = 2T(n/2) + O(n)
// a=2, b=2, f(n)=n, c=1
// log_2(2) = 1, so c = log_b(a) → Case 2 → O(n log n)

// Binary Search: T(n) = T(n/2) + O(1)
// a=1, b=2, f(n)=1, c=0
// log_2(1) = 0, so c = log_b(a) → Case 2 → O(log n)
```

### 3. Amortized Analysis
```typescript
// Dynamic Array (Vector) - Append Operation
class DynamicArray {
    private arr: number[] = [];
    private capacity = 1;

    append(value: number): void {
        if (this.arr.length === this.capacity) {
            // Resize: O(n) - happens infrequently
            const newArr = new Array(this.capacity * 2);
            for (let i = 0; i < this.arr.length; i++) {
                newArr[i] = this.arr[i];
            }
            this.arr = newArr;
            this.capacity *= 2;
        }
        this.arr.push(value);  // O(1) - happens most of the time
    }
}
// Amortized analysis: O(1) per operation over sequence of operations
```

## Practical Examples

### Example 1: Two Sum Problem

#### Approach 1: Brute Force
```typescript
function twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}
```
**Time Complexity:** O(n²) - nested loops
**Space Complexity:** O(1) - only uses constant extra space

#### Approach 2: Hash Map
```typescript
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    return [];
}
```
**Time Complexity:** O(n) - single loop, O(1) hash operations
**Space Complexity:** O(n) - hash map can store up to n elements

### Example 2: Maximum Product Subarray

```typescript
function maxProduct(nums: number[]): number {
    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    let result = nums[0];

    for (let i = 1; i < nums.length; i++) {  // n-1 iterations
        const curr = nums[i];
        const tempMax = Math.max(curr, maxSoFar * curr, minSoFar * curr);  // 3 comparisons
        minSoFar = Math.min(curr, maxSoFar * curr, minSoFar * curr);       // 3 comparisons

        maxSoFar = tempMax;
        result = Math.max(result, maxSoFar);   // 1 comparison
    }

    return result;
}
```
**Time Complexity:** O(n) - single pass through array
**Space Complexity:** O(1) - constant extra variables

### Example 3: N-Queens Problem

```typescript
function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const board: number[] = new Array(n);
    const cols = new Set<number>();
    const diag1 = new Set<number>();
    const diag2 = new Set<number>();

    function backtrack(row: number): void {
        if (row === n) {
            result.push(createBoard(board, n));  // O(n²) to create board
            return;
        }

        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }

            board[row] = col;
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            backtrack(row + 1);

            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);
    return result;
}
```
**Time Complexity:** O(N!) - explores all possible queen placements (with pruning)
**Space Complexity:** O(N) - recursion depth + sets for conflict tracking

## Advanced Topics

### 1. Space-Time Tradeoffs
```typescript
// Fibonacci: Time vs Space tradeoff

// Method 1: Recursive (exponential time, linear space)
function fibRecursive(n: number): number {
    if (n <= 1) return n;
    return fibRecursive(n - 1) + fibRecursive(n - 2);
}
// Time: O(2^n), Space: O(n)

// Method 2: Memoization (linear time, linear space)
function fibMemo(n: number, memo: Map<number, number> = new Map()): number {
    if (n <= 1) return n;
    if (memo.has(n)) return memo.get(n)!;

    const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    memo.set(n, result);
    return result;
}
// Time: O(n), Space: O(n)

// Method 3: Iterative (linear time, constant space)
function fibIterative(n: number): number {
    if (n <= 1) return n;
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        [prev, curr] = [curr, prev + curr];
    }
    return curr;
}
// Time: O(n), Space: O(1)
```

### 2. Average vs Worst Case
```typescript
// Quick Sort Analysis
function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const right = arr.filter(x => x > pivot);
    const middle = arr.filter(x => x === pivot);

    return [...quickSort(left), ...middle, ...quickSort(right)];
}
```
**Best/Average Case:** O(n log n) - balanced partitions
**Worst Case:** O(n²) - already sorted array with poor pivot choice

### 3. Input-Dependent Complexity
```typescript
// Graph DFS: depends on graph structure
function dfs(graph: Map<number, number[]>, start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];

    function explore(node: number): void {
        if (visited.has(node)) return;

        visited.add(node);
        result.push(node);

        for (const neighbor of graph.get(node) || []) {
            explore(neighbor);
        }
    }

    explore(start);
    return result;
}
```
**Time Complexity:** O(V + E) where V = vertices, E = edges
**Space Complexity:** O(V) for visited set + O(V) for recursion stack = O(V)

## Best Practices

### 1. Analysis Checklist
- [ ] Identify input size variables (n, m, etc.)
- [ ] Count basic operations in loops
- [ ] Analyze recursive calls and depth
- [ ] Consider best, average, and worst cases
- [ ] Account for space used by data structures
- [ ] Include space for recursion stack

### 2. Common Mistakes
- **Ignoring hidden costs**: String operations, array copying
- **Confusing input vs auxiliary space**
- **Not considering amortized analysis**
- **Forgetting about recursion stack space**
- **Misanalyzing nested structures**

### 3. Optimization Strategies
```typescript
// Example: Optimize nested loops
// Bad: O(n³)
function badTripleSum(nums: number[]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] === 0) {
                    result.push([nums[i], nums[j], nums[k]]);
                }
            }
        }
    }
    return result;
}

// Better: O(n²)
function goodTripleSum(nums: number[]): number[][] {
    const result: number[][] = [];
    nums.sort((a, b) => a - b);  // O(n log n)

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1, right = nums.length - 1;
        while (left < right) {  // O(n) for each i
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}
```

### 4. Tools for Analysis
- **Profiling**: Measure actual runtime for different inputs
- **Visualization**: Plot runtime vs input size
- **Mathematical modeling**: Use recurrence relations
- **Asymptotic analysis**: Focus on growth rates for large inputs

## Conclusion

Complexity analysis is essential for:

- Choosing appropriate algorithms
- Predicting scalability
- Identifying optimization opportunities
- Making informed design decisions

Remember:

- **Always consider both time and space**
- **Think about real-world constraints**
- **Consider average case, not just worst case**
- **Practice with diverse problems**
- **Understand the tradeoffs between different approaches**

For more examples and practice, explore the LeetCode problems in this repository, each with detailed complexity analysis.