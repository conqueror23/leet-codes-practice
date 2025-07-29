/**
 * 202. Happy Number - Easy
 * 
 * Write an algorithm to determine if a number n is happy.
 * 
 * A happy number is a number defined by the following process:
 * - Starting with any positive integer, replace the number by the sum of the squares of its digits.
 * - Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
 * - Those numbers for which this process ends in 1 are happy.
 * 
 * Return true if n is a happy number, and false if not.
 */

function isHappy(n: number): boolean {
    // Advanced: Floyd's Cycle Detection (Tortoise and Hare)
    // Time: O(log n), Space: O(1)
    
    function getNext(num: number): number {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    
    let slow = n;
    let fast = getNext(n);
    
    // Floyd's cycle detection
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);           // Move one step
        fast = getNext(getNext(fast));  // Move two steps
    }
    
    return fast === 1;
}

// Alternative: Set-based cycle detection
function isHappySet(n: number): boolean {
    const seen = new Set<number>();
    
    function getNext(num: number): number {
        return num.toString()
            .split('')
            .reduce((sum, digit) => sum + parseInt(digit) ** 2, 0);
    }
    
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = getNext(n);
    }
    
    return n === 1;
}

// Mathematical approach: Known cycle patterns
function isHappyMath(n: number): boolean {
    // All unhappy numbers eventually reach cycle: 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4
    const unhappyCycle = new Set([4, 16, 37, 58, 89, 145, 42, 20]);
    
    function getNext(num: number): number {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    
    while (n !== 1) {
        if (unhappyCycle.has(n)) return false;
        n = getNext(n);
    }
    
    return true;
}

// Optimized: Bit manipulation for digit extraction
function isHappyBitwise(n: number): boolean {
    function getNext(num: number): number {
        let sum = 0;
        while (num > 0) {
            const digit = num - (Math.floor(num / 10) * 10); // Avoid modulo
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    
    let slow = n;
    let fast = getNext(n);
    
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    
    return fast === 1;
}

// Test cases
console.log("=== 202. Happy Number Tests ===");
console.log(isHappy(19)); // Expected: true (19 → 82 → 68 → 100 → 1)
console.log(isHappy(2));  // Expected: false
console.log(isHappy(7));  // Expected: true
console.log(isHappy(1));  // Expected: true
console.log(isHappy(23)); // Expected: true

// Test large numbers
console.log(isHappy(999999999)); // Expected: false
console.log(isHappy(100000000)); // Expected: true (10^8 → 1)

// Compare implementations
console.log("\n=== Performance Comparison ===");
const testNumbers = [19, 2, 7, 23, 4, 44, 68, 82, 86, 91, 94, 97];
console.log("Floyd's:", testNumbers.map(n => isHappy(n)));
console.log("Set-based:", testNumbers.map(n => isHappySet(n)));
console.log("Math cycle:", testNumbers.map(n => isHappyMath(n)));