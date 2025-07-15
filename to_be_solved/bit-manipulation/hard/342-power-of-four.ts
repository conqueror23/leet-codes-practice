// LeetCode 342: Power of Four (Hard)
// Given an integer n, return true if it is a power of four. Otherwise, return false.

function isPowerOfFour(n: number): boolean {
    if (n <= 0) return false;
    
    // Check if n is a power of 2 and has only one bit set at an odd position
    // Powers of 4: 1 (0x1), 4 (0x4), 16 (0x10), 64 (0x40), 256 (0x100)...
    // They have bits set only at positions 0, 2, 4, 6, 8... (even positions from right, 0-indexed)
    
    // First check if it's a power of 2
    if ((n & (n - 1)) !== 0) return false;
    
    // Check if the bit is at an even position (0, 2, 4, 6...)
    // 0x55555555 = 01010101010101010101010101010101 in binary
    // This masks bits at even positions
    return (n & 0x55555555) !== 0;
}

// Alternative solution
function isPowerOfFourMath(n: number): boolean {
    if (n <= 0) return false;
    
    const logResult = Math.log(n) / Math.log(4);
    return Math.abs(logResult - Math.round(logResult)) < 1e-10;
}

// Test cases
console.log(isPowerOfFour(16)); // true
console.log(isPowerOfFour(5)); // false
console.log(isPowerOfFour(1)); // true
console.log(isPowerOfFour(8)); // false