/**
 * 20. Valid Parentheses - Easy
 * 
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
 * determine if the input string is valid.
 * 
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 */

function isValid(s: string): boolean {
    // Advanced: Stack with hash map for O(1) lookup
    // Time: O(n), Space: O(n)
    
    if (s.length % 2 !== 0) return false;
    
    const stack: string[] = [];
    const matchingBrackets: { [key: string]: string } = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            // Opening bracket - push to stack
            stack.push(char);
        } else {
            // Closing bracket - check if it matches top of stack
            if (stack.length === 0 || stack.pop() !== matchingBrackets[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

// Alternative: Character code optimization
function isValidOptimized(s: string): boolean {
    if (s.length % 2 !== 0) return false;
    
    const stack: number[] = []; // Store character codes instead of strings
    
    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);
        
        if (charCode === 40 || charCode === 91 || charCode === 123) { // '(', '[', '{'
            stack.push(charCode);
        } else {
            if (stack.length === 0) return false;
            
            const top = stack.pop()!;
            
            // Check matching pairs using character codes
            if ((charCode === 41 && top !== 40) ||  // ')' and '('
                (charCode === 93 && top !== 91) ||  // ']' and '['
                (charCode === 125 && top !== 123)) { // '}' and '{'
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

// Mathematical approach: Counter-based
function isValidCounter(s: string): boolean {
    if (s.length % 2 !== 0) return false;
    
    let roundCount = 0;
    let squareCount = 0;
    let curlyCount = 0;
    const stack: string[] = [];
    
    for (const char of s) {
        if (char === '(') {
            roundCount++;
            stack.push(char);
        } else if (char === '[') {
            squareCount++;
            stack.push(char);
        } else if (char === '{') {
            curlyCount++;
            stack.push(char);
        } else if (char === ')') {
            if (roundCount === 0 || stack.length === 0 || stack[stack.length - 1] !== '(') {
                return false;
            }
            roundCount--;
            stack.pop();
        } else if (char === ']') {
            if (squareCount === 0 || stack.length === 0 || stack[stack.length - 1] !== '[') {
                return false;
            }
            squareCount--;
            stack.pop();
        } else if (char === '}') {
            if (curlyCount === 0 || stack.length === 0 || stack[stack.length - 1] !== '{') {
                return false;
            }
            curlyCount--;
            stack.pop();
        }
    }
    
    return stack.length === 0;
}

// Early termination approach
function isValidEarlyExit(s: string): boolean {
    if (s.length % 2 !== 0) return false;
    
    const stack: string[] = [];
    const maxDepth = s.length / 2; // Maximum possible valid depth
    
    for (const char of s) {
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
            
            // Early exit if depth exceeds possible valid depth
            if (stack.length > maxDepth) return false;
        } else {
            if (stack.length === 0) return false;
            
            const top = stack.pop()!;
            const isMatch = (char === ')' && top === '(') ||
                          (char === ']' && top === '[') ||
                          (char === '}' && top === '{');
            
            if (!isMatch) return false;
        }
    }
    
    return stack.length === 0;
}

// Recursive approach
function isValidRecursive(s: string): boolean {
    function helper(str: string, index: number, stack: string[]): boolean {
        if (index === str.length) {
            return stack.length === 0;
        }
        
        const char = str[index];
        
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
            return helper(str, index + 1, stack);
        } else {
            if (stack.length === 0) return false;
            
            const top = stack.pop()!;
            const isMatch = (char === ')' && top === '(') ||
                          (char === ']' && top === '[') ||
                          (char === '}' && top === '{');
            
            if (!isMatch) {
                stack.push(top); // Restore stack for backtracking
                return false;
            }
            
            return helper(str, index + 1, stack);
        }
    }
    
    if (s.length % 2 !== 0) return false;
    return helper(s, 0, []);
}

// Array-based stack implementation
function isValidArray(s: string): boolean {
    if (s.length % 2 !== 0) return false;
    
    const stack = new Array(s.length);
    let top = -1;
    
    for (const char of s) {
        if (char === '(' || char === '[' || char === '{') {
            stack[++top] = char;
        } else {
            if (top === -1) return false;
            
            const opening = stack[top--];
            if ((char === ')' && opening !== '(') ||
                (char === ']' && opening !== '[') ||
                (char === '}' && opening !== '{')) {
                return false;
            }
        }
    }
    
    return top === -1;
}

// Bit manipulation approach (for educational purposes)
function isValidBits(s: string): boolean {
    if (s.length % 2 !== 0) return false;
    
    // Use bit positions to represent different bracket types
    let stackMask = 0; // Each 2 bits represent a stack level
    let depth = 0;
    
    for (const char of s) {
        if (char === '(' || char === '[' || char === '{') {
            if (depth >= 16) return false; // Max 16 levels (32 bits / 2)
            
            let bracketType = 0;
            if (char === '[') bracketType = 1;
            else if (char === '{') bracketType = 2;
            
            stackMask |= (bracketType << (depth * 2));
            depth++;
        } else {
            if (depth === 0) return false;
            
            depth--;
            const expectedType = (stackMask >> (depth * 2)) & 3;
            stackMask &= ~(3 << (depth * 2)); // Clear the bits
            
            let actualType = 0;
            if (char === ']') actualType = 1;
            else if (char === '}') actualType = 2;
            
            if (expectedType !== actualType) return false;
        }
    }
    
    return depth === 0;
}

// Test cases
console.log("=== 20. Valid Parentheses Tests ===");
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false
console.log(isValid("([)]")); // Expected: false
console.log(isValid("{[]}")); // Expected: true

// Edge cases
console.log(isValid("")); // Expected: true
console.log(isValid("(")); // Expected: false
console.log(isValid(")")); // Expected: false
console.log(isValid("((((()))))")); // Expected: true
console.log(isValid("((((())))")); // Expected: false

// Complex cases
console.log(isValid("((()))")); // Expected: true
console.log(isValid("(){}[]")); // Expected: true
console.log(isValid("([{}])")); // Expected: true
console.log(isValid("([{]})")); // Expected: false
console.log(isValid("(((")); // Expected: false
console.log(isValid(")))")); // Expected: false

// Performance comparison
console.log("\n=== Performance Comparison ===");
const testCases = [
    "()",
    "()[]{}", 
    "(]",
    "([)]",
    "{[]}",
    "((()))",
    "(){}[]",
    "([{}])"
];

console.log("Standard approach:");
testCases.forEach(test => console.log(`  "${test}": ${isValid(test)}`));

console.log("Optimized approach:");
testCases.forEach(test => console.log(`  "${test}": ${isValidOptimized(test)}`));

console.log("Array-based approach:");
testCases.forEach(test => console.log(`  "${test}": ${isValidArray(test)}`));

// Large test case
const largeTest = "(".repeat(1000) + ")".repeat(1000);
console.log(`\nLarge test (2000 chars): ${isValid(largeTest)}`); // Expected: true

const invalidLargeTest = "(".repeat(1000) + ")".repeat(999);
console.log(`Large invalid test (1999 chars): ${isValid(invalidLargeTest)}`); // Expected: false