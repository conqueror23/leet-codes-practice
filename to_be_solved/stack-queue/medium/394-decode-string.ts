/**
 * 394. Decode String
 * Difficulty: Medium
 * 
 * Given an encoded string, return its decoded string.
 * 
 * The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.
 * Note that k is guaranteed to be a positive integer.
 * 
 * You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc.
 * Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k.
 * 
 * Example 1:
 * Input: s = "3[a]2[bc]"
 * Output: "aaabcbc"
 * 
 * Example 2:
 * Input: s = "3[a2[c]]"
 * Output: "accaccacc"
 * 
 * Example 3:
 * Input: s = "2[abc]3[cd]ef"
 * Output: "abcabccdcdcdef"
 */

function decodeString(s: string): string {
    const stack: string[] = [];
    let currentString = '';
    let currentNum = 0;
    
    for (const char of s) {
        if (char >= '0' && char <= '9') {
            currentNum = currentNum * 10 + parseInt(char);
        } else if (char === '[') {
            stack.push(currentString);
            stack.push(currentNum.toString());
            currentString = '';
            currentNum = 0;
        } else if (char === ']') {
            const num = parseInt(stack.pop()!);
            const prevString = stack.pop()!;
            currentString = prevString + currentString.repeat(num);
        } else {
            currentString += char;
        }
    }
    
    return currentString;
}

console.log(decodeString("3[a]2[bc]"));
console.log(decodeString("3[a2[c]]"));
console.log(decodeString("2[abc]3[cd]ef"));
console.log(decodeString("abc3[cd]xyz"));