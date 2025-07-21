// LeetCode 17: Letter Combinations of a Phone Number (Easy) - Advanced Solutions
// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.

// Solution 1: Recursive Backtracking (Original optimized)
function letterCombinations(digits: string): string[] {
    if (digits.length === 0) return [];
    
    const mapping: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const result: string[] = [];
    
    function backtrack(index: number, current: string) {
        if (index === digits.length) {
            result.push(current);
            return;
        }
        
        const letters = mapping[digits[index]];
        if (!letters) return; // Skip invalid digits
        
        for (const letter of letters) {
            backtrack(index + 1, current + letter);
        }
    }
    
    backtrack(0, '');
    return result;
}

// Solution 2: Iterative BFS Approach
function letterCombinationsIterative(digits: string): string[] {
    if (digits.length === 0) return [];
    
    const mapping: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    let result = [''];
    
    for (const digit of digits) {
        const letters = mapping[digit];
        if (!letters) continue;
        
        const newResult: string[] = [];
        for (const combination of result) {
            for (const letter of letters) {
                newResult.push(combination + letter);
            }
        }
        result = newResult;
    }
    
    return result;
}

// Solution 3: Queue-based BFS
function letterCombinationsQueue(digits: string): string[] {
    if (digits.length === 0) return [];
    
    const mapping: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const queue = [''];
    
    for (const digit of digits) {
        const letters = mapping[digit];
        if (!letters) continue;
        
        const currentLevelSize = queue.length;
        
        for (let i = 0; i < currentLevelSize; i++) {
            const current = queue.shift()!;
            
            for (const letter of letters) {
                queue.push(current + letter);
            }
        }
    }
    
    return queue;
}

// Solution 4: Functional Reduce Approach
function letterCombinationsFunctional(digits: string): string[] {
    if (digits.length === 0) return [];
    
    const mapping: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    return digits.split('').reduce<string[]>((combinations, digit) => {
        const letters = mapping[digit];
        if (!letters) return combinations;
        
        return combinations.flatMap(combo => 
            letters.split('').map(letter => combo + letter)
        );
    }, ['']);
}

// Solution 5: Dynamic Programming
function letterCombinationsDP(digits: string): string[] {
    if (digits.length === 0) return [];
    
    const mapping: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const dp: string[][] = new Array(digits.length + 1);
    dp[0] = [''];
    
    for (let i = 1; i <= digits.length; i++) {
        dp[i] = [];
        const letters = mapping[digits[i - 1]];
        
        if (!letters) {
            dp[i] = dp[i - 1];
            continue;
        }
        
        for (const prev of dp[i - 1]) {
            for (const letter of letters) {
                dp[i].push(prev + letter);
            }
        }
    }
    
    return dp[digits.length];
}

// Solution 6: Cartesian Product Approach
function letterCombinationsCartesian(digits: string): string[] {
    if (digits.length === 0) return [];
    
    const mapping: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const letterArrays = digits.split('').map(digit => 
        mapping[digit] ? mapping[digit].split('') : []
    ).filter(arr => arr.length > 0);
    
    if (letterArrays.length === 0) return [];
    
    function cartesianProduct(arrays: string[][]): string[] {
        if (arrays.length === 0) return [''];
        if (arrays.length === 1) return arrays[0];
        
        const [first, ...rest] = arrays;
        const restProduct = cartesianProduct(rest);
        
        const result: string[] = [];
        for (const letter of first) {
            for (const combo of restProduct) {
                result.push(letter + combo);
            }
        }
        
        return result;
    }
    
    return cartesianProduct(letterArrays);
}

// Solution 7: Generator-based Approach
function* letterCombinationsGenerator(digits: string): Generator<string> {
    if (digits.length === 0) return;
    
    const mapping: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    function* generate(index: number, current: string): Generator<string> {
        if (index === digits.length) {
            yield current;
            return;
        }
        
        const letters = mapping[digits[index]];
        if (!letters) return;
        
        for (const letter of letters) {
            yield* generate(index + 1, current + letter);
        }
    }
    
    yield* generate(0, '');
}

function letterCombinationsFromGenerator(digits: string): string[] {
    return [...letterCombinationsGenerator(digits)];
}

// Solution 8: Memoized Recursive Approach
function letterCombinationsMemo(digits: string): string[] {
    if (digits.length === 0) return [];
    
    const mapping: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const memo = new Map<string, string[]>();
    
    function solve(remainingDigits: string): string[] {
        if (remainingDigits.length === 0) return [''];
        if (memo.has(remainingDigits)) return memo.get(remainingDigits)!;
        
        const currentDigit = remainingDigits[0];
        const letters = mapping[currentDigit];
        const restCombinations = solve(remainingDigits.slice(1));
        
        const result: string[] = [];
        
        if (!letters) {
            result.push(...restCombinations);
        } else {
            for (const letter of letters) {
                for (const combination of restCombinations) {
                    result.push(letter + combination);
                }
            }
        }
        
        memo.set(remainingDigits, result);
        return result;
    }
    
    return solve(digits);
}

// Test cases
console.log("Solution 1 - Recursive Backtracking:");
console.log(letterCombinations("23")); // ["ad","ae","af","bd","be","bf","cd","ce","cf"]

console.log("\nSolution 2 - Iterative BFS:");
console.log(letterCombinationsIterative("23"));

console.log("\nSolution 3 - Queue-based BFS:");
console.log(letterCombinationsQueue("23"));

console.log("\nSolution 4 - Functional Reduce:");
console.log(letterCombinationsFunctional("23"));

console.log("\nSolution 5 - Dynamic Programming:");
console.log(letterCombinationsDP("23"));

console.log("\nSolution 6 - Cartesian Product:");
console.log(letterCombinationsCartesian("23"));

console.log("\nSolution 7 - Generator:");
console.log(letterCombinationsFromGenerator("23"));

console.log("\nSolution 8 - Memoized:");
console.log(letterCombinationsMemo("23"));

// Edge cases
console.log("\nEdge Cases:");
console.log("Empty string:", letterCombinations(""));
console.log("Single digit:", letterCombinations("2"));
console.log("Longer sequence:", letterCombinations("2345"));

// Performance comparison
console.log("\nPerformance comparison on '23456789':");
const testDigits = "23456789";

console.time("Recursive");
letterCombinations(testDigits);
console.timeEnd("Recursive");

console.time("Iterative");
letterCombinationsIterative(testDigits);
console.timeEnd("Iterative");

console.time("Functional");
letterCombinationsFunctional(testDigits);
console.timeEnd("Functional");

console.time("Memoized");
letterCombinationsMemo(testDigits);
console.timeEnd("Memoized");

// Time Complexity Analysis:
// Solution 1: O(3^n * 4^m) time, O(3^n * 4^m) space - where n is digits with 3 letters, m with 4 letters
// Solution 2: O(3^n * 4^m) time, O(3^n * 4^m) space - Iterative approach, same complexity
// Solution 3: O(3^n * 4^m) time, O(3^n * 4^m) space - Queue-based BFS
// Solution 4: O(3^n * 4^m) time, O(3^n * 4^m) space - Functional approach with better readability
// Solution 5: O(3^n * 4^m) time, O(3^n * 4^m) space - DP approach, clearer state transitions
// Solution 6: O(3^n * 4^m) time, O(3^n * 4^m) space - Cartesian product approach
// Solution 7: O(3^n * 4^m) time, O(n) space - Generator approach, memory efficient for large results
// Solution 8: O(3^n * 4^m) time, O(3^n * 4^m) space - Memoized approach, faster for repeated subproblems