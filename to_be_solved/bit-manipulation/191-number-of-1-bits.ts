// LeetCode 191: Number of 1 Bits
// Write a function that takes an unsigned integer and returns the number of '1' bits it has.

function hammingWeight(n: number): number {
    let count = 0;
    while (n !== 0) {
        count++;
        n &= n - 1;
    }
    return count;
}

// Test cases
console.log(hammingWeight(0b00000000000000000000000000001011)); // 3
console.log(hammingWeight(0b00000000000000000000000010000000)); // 1
console.log(hammingWeight(0b11111111111111111111111111111101)); // 31