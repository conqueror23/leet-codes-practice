// LeetCode 201: Bitwise AND of Numbers Range (Medium)
// Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.

function rangeBitwiseAnd(left: number, right: number): number {
    let shift = 0;
    
    while (left !== right) {
        left >>= 1;
        right >>= 1;
        shift++;
    }
    
    return left << shift;
}

// Test cases
console.log(rangeBitwiseAnd(5, 7)); // 4
console.log(rangeBitwiseAnd(0, 0)); // 0
console.log(rangeBitwiseAnd(1, 2147483647)); // 0