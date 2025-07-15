// LeetCode 7: Reverse Integer
// Given a signed 32-bit integer x, return x with its digits reversed.

function reverse(x: number): number {
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;
    
    let result = 0;
    let num = Math.abs(x);
    
    while (num > 0) {
        result = result * 10 + num % 10;
        num = Math.floor(num / 10);
    }
    
    result = x < 0 ? -result : result;
    
    if (result > INT_MAX || result < INT_MIN) {
        return 0;
    }
    
    return result;
}

// Test cases
console.log(reverse(123)); // 321
console.log(reverse(-123)); // -321
console.log(reverse(120)); // 21