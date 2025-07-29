/**
 * 5. Longest Palindromic Substring - Medium
 * 
 * Given a string s, return the longest palindromic substring in s.
 */

function longestPalindrome(s: string): string {
    // Advanced: Expand around centers approach
    // Time: O(n^2), Space: O(1)
    
    if (s.length <= 1) return s;
    
    let start = 0;
    let maxLen = 1;
    
    for (let i = 0; i < s.length; i++) {
        // Check for odd-length palindromes (center at i)
        const len1 = expandAroundCenter(s, i, i);
        
        // Check for even-length palindromes (center between i and i+1)
        const len2 = expandAroundCenter(s, i, i + 1);
        
        const currentMaxLen = Math.max(len1, len2);
        
        if (currentMaxLen > maxLen) {
            maxLen = currentMaxLen;
            start = i - Math.floor((currentMaxLen - 1) / 2);
        }
    }
    
    return s.substring(start, start + maxLen);
}

function expandAroundCenter(s: string, left: number, right: number): number {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

// Advanced: Manacher's Algorithm (Linear time)
function longestPalindromeManacher(s: string): string {
    // Time: O(n), Space: O(n)
    
    if (s.length <= 1) return s;
    
    // Preprocess string: "abc" -> "^#a#b#c#$"
    const processed = '^#' + s.split('').join('#') + '#$';
    const n = processed.length;
    const P = new Array(n).fill(0); // Array to store palindrome lengths
    
    let center = 0; // Center of the rightmost palindrome
    let right = 0;  // Right boundary of the rightmost palindrome
    let maxLen = 0;
    let centerIndex = 0;
    
    for (let i = 1; i < n - 1; i++) {
        const mirror = 2 * center - i; // Mirror of i with respect to center
        
        // If i is within the right boundary, use previously computed values
        if (i < right) {
            P[i] = Math.min(right - i, P[mirror]);
        }
        
        // Try to expand palindrome centered at i
        while (processed[i + P[i] + 1] === processed[i - P[i] - 1]) {
            P[i]++;
        }
        
        // If palindrome centered at i extends past right, adjust center and right
        if (i + P[i] > right) {
            center = i;
            right = i + P[i];
        }
        
        // Update maximum length palindrome
        if (P[i] > maxLen) {
            maxLen = P[i];
            centerIndex = i;
        }
    }
    
    // Extract the longest palindrome from original string
    const start = Math.floor((centerIndex - maxLen) / 2);
    return s.substring(start, start + maxLen);
}

// Dynamic Programming approach
function longestPalindromeDP(s: string): string {
    // Time: O(n^2), Space: O(n^2)
    
    const n = s.length;
    if (n <= 1) return s;
    
    // dp[i][j] = true if substring from i to j is palindrome
    const dp: boolean[][] = Array(n).fill(null).map(() => Array(n).fill(false));
    
    let start = 0;
    let maxLen = 1;
    
    // Every single character is a palindrome
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    
    // Check for palindromes of length 2
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLen = 2;
        }
    }
    
    // Check for palindromes of length 3 and more
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            
            // Check if substring from i to j is palindrome
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                start = i;
                maxLen = len;
            }
        }
    }
    
    return s.substring(start, start + maxLen);
}

// Optimized DP with space optimization
function longestPalindromeDPOptimized(s: string): string {
    // Time: O(n^2), Space: O(n)
    
    const n = s.length;
    if (n <= 1) return s;
    
    let start = 0;
    let maxLen = 1;
    
    // Use two arrays instead of 2D array
    let prev = new Array(n).fill(false);
    let curr = new Array(n).fill(false);
    
    // Length 1 palindromes
    for (let i = 0; i < n; i++) {
        prev[i] = true;
    }
    
    // Length 2 palindromes
    curr.fill(false);
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            curr[i] = true;
            start = i;
            maxLen = 2;
        }
    }
    
    // Length 3+ palindromes
    for (let len = 3; len <= n; len++) {
        [prev, curr] = [curr, prev];
        curr.fill(false);
        
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            
            if (s[i] === s[j] && prev[i + 1]) {
                curr[i] = true;
                start = i;
                maxLen = len;
            }
        }
    }
    
    return s.substring(start, start + maxLen);
}

// Brute force approach (for comparison)
function longestPalindromeBrute(s: string): string {
    // Time: O(n^3), Space: O(1)
    
    if (s.length <= 1) return s;
    
    let longest = "";
    
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const substring = s.substring(i, j + 1);
            if (isPalindrome(substring) && substring.length > longest.length) {
                longest = substring;
            }
        }
    }
    
    return longest;
}

function isPalindrome(str: string): boolean {
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// Suffix array approach (advanced)
function longestPalindromeSuffix(s: string): string {
    // Time: O(n log n), Space: O(n)
    
    if (s.length <= 1) return s;
    
    // Create string with separator: s + "#" + reverse(s)
    const reversed = s.split('').reverse().join('');
    const combined = s + '#' + reversed;
    
    // Find longest common prefix using suffix array concept
    const suffixes: Array<{suffix: string, index: number}> = [];
    
    for (let i = 0; i < combined.length; i++) {
        suffixes.push({
            suffix: combined.substring(i),
            index: i
        });
    }
    
    // Sort suffixes lexicographically
    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
    
    let maxLen = 1;
    let result = s[0];
    
    // Check adjacent suffixes for common prefixes
    for (let i = 0; i < suffixes.length - 1; i++) {
        const suffix1 = suffixes[i];
        const suffix2 = suffixes[i + 1];
        
        // Only consider if one is from original and one from reversed
        const isFromDifferentParts = (suffix1.index < s.length) !== (suffix2.index < s.length);
        
        if (isFromDifferentParts) {
            const commonLen = getCommonPrefixLength(suffix1.suffix, suffix2.suffix);
            
            if (commonLen > maxLen) {
                const start = Math.min(suffix1.index, suffix2.index);
                if (start < s.length) {
                    const candidate = s.substring(start, start + commonLen);
                    if (isPalindrome(candidate)) {
                        maxLen = commonLen;
                        result = candidate;
                    }
                }
            }
        }
    }
    
    return result;
}

function getCommonPrefixLength(str1: string, str2: string): number {
    let len = 0;
    const minLen = Math.min(str1.length, str2.length);
    
    while (len < minLen && str1[len] === str2[len]) {
        len++;
    }
    
    return len;
}

// Test cases
console.log("=== 5. Longest Palindromic Substring Tests ===");
console.log(longestPalindrome("babad")); // Expected: "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // Expected: "bb"
console.log(longestPalindrome("a"));     // Expected: "a"
console.log(longestPalindrome("ac"));    // Expected: "a" or "c"
console.log(longestPalindrome("racecar")); // Expected: "racecar"

// Complex test cases
console.log(longestPalindrome("abcdcba")); // Expected: "abcdcba"
console.log(longestPalindrome("abacabad")); // Expected: "abacaba"
console.log(longestPalindrome("forgeeksskeegfor")); // Expected: "geeksskeeg"
console.log(longestPalindrome("abacabadabacaba")); // Expected: "abacabadabacaba"

// Edge cases
console.log(longestPalindrome(""));      // Expected: ""
console.log(longestPalindrome("aaaa"));  // Expected: "aaaa"
console.log(longestPalindrome("abcdef")); // Expected: "a"

// Performance comparison
console.log("\n=== Performance Comparison ===");
const testCases = [
    "babad",
    "cbbd", 
    "racecar",
    "abcdcba",
    "forgeeksskeegfor"
];

console.log("Expand around centers:");
testCases.forEach(test => console.log(`  "${test}": "${longestPalindrome(test)}"`));

console.log("Manacher's algorithm:");
testCases.forEach(test => console.log(`  "${test}": "${longestPalindromeManacher(test)}"`));

console.log("Dynamic programming:");
testCases.forEach(test => console.log(`  "${test}": "${longestPalindromeDP(test)}"`));

// Large test case
const largeTest = "a".repeat(500) + "b" + "a".repeat(500);
console.log(`\nLarge test result length: ${longestPalindrome(largeTest).length}`);