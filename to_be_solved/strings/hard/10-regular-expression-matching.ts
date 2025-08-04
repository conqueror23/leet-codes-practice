/**
 * 10. Regular Expression Matching
 * Difficulty: Hard
 * 
 * Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:
 * - '.' Matches any single character.
 * - '*' Matches zero or more of the preceding element.
 * 
 * The matching should cover the entire input string (not partial).
 * 
 * Example 1:
 * Input: s = "aa", p = "a"
 * Output: false
 * Explanation: "a" does not match the entire string "aa".
 * 
 * Example 2:
 * Input: s = "aa", p = "a*"
 * Output: true
 * Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
 * 
 * Example 3:
 * Input: s = "ab", p = ".*"
 * Output: true
 * Explanation: ".*" means "zero or more (*) of any character (.)".
 */

function isMatch(s: string, p: string): boolean {
    const dp: boolean[][] = Array(s.length + 1).fill(null).map(() => Array(p.length + 1).fill(false));
    
    dp[0][0] = true;
    
    for (let j = 1; j <= p.length; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= p.length; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2];
                if (matches(s, p, i, j - 1)) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else {
                if (matches(s, p, i, j)) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
    }
    
    return dp[s.length][p.length];
}

function matches(s: string, p: string, i: number, j: number): boolean {
    return p[j - 1] === '.' || s[i - 1] === p[j - 1];
}

console.log(isMatch("aa", "a"));
console.log(isMatch("aa", "a*"));
console.log(isMatch("ab", ".*"));
console.log(isMatch("aab", "c*a*b"));