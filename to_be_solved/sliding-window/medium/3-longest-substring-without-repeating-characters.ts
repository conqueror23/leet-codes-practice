/**
 * 3. Longest Substring Without Repeating Characters - Medium
 * 
 * Given a string s, find the length of the longest substring without repeating characters.
 */

function lengthOfLongestSubstring(s: string): number {
    // Advanced: Sliding window with hash map optimization
    // Time: O(n), Space: O(min(m,n)) where m is charset size
    
    if (s.length <= 1) return s.length;
    
    const charIndexMap = new Map<string, number>();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // If character is seen and within current window
        if (charIndexMap.has(char) && charIndexMap.get(char)! >= left) {
            left = charIndexMap.get(char)! + 1;
        }
        
        charIndexMap.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Alternative: Set-based sliding window
function lengthOfLongestSubstringSet(s: string): number {
    const charSet = new Set<string>();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Shrink window until no duplicates
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Optimized: ASCII array instead of hash map
function lengthOfLongestSubstringArray(s: string): number {
    // Assumes ASCII characters (0-127)
    const charIndex = new Array(128).fill(-1);
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const charCode = s.charCodeAt(right);
        
        if (charIndex[charCode] >= left) {
            left = charIndex[charCode] + 1;
        }
        
        charIndex[charCode] = right;
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Advanced: Unicode support with optimized memory
function lengthOfLongestSubstringUnicode(s: string): number {
    if (s.length <= 1) return s.length;
    
    const charLastIndex = new Map<string, number>();
    let maxLength = 0;
    let windowStart = 0;
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        // If char exists and is within current window
        if (charLastIndex.has(char)) {
            const lastIndex = charLastIndex.get(char)!;
            if (lastIndex >= windowStart) {
                windowStart = lastIndex + 1;
            }
        }
        
        charLastIndex.set(char, i);
        maxLength = Math.max(maxLength, i - windowStart + 1);
    }
    
    return maxLength;
}

// Brute force with memoization for comparison
function lengthOfLongestSubstringBrute(s: string): number {
    const memo = new Map<string, number>();
    
    function hasUniqueChars(str: string): boolean {
        const key = str;
        if (memo.has(key)) return memo.get(key)! > 0;
        
        const seen = new Set<string>();
        for (const char of str) {
            if (seen.has(char)) {
                memo.set(key, 0);
                return false;
            }
            seen.add(char);
        }
        memo.set(key, str.length);
        return true;
    }
    
    let maxLength = 0;
    
    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            const substring = s.slice(i, j);
            if (hasUniqueChars(substring)) {
                maxLength = Math.max(maxLength, substring.length);
            }
        }
    }
    
    return maxLength;
}

// Dynamic programming approach
function lengthOfLongestSubstringDP(s: string): number {
    if (s.length <= 1) return s.length;
    
    const n = s.length;
    const dp = new Array(n).fill(1); // dp[i] = length of longest substring ending at i
    const lastSeen = new Map<string, number>();
    
    let maxLength = 1;
    lastSeen.set(s[0], 0);
    
    for (let i = 1; i < n; i++) {
        const char = s[i];
        
        if (lastSeen.has(char)) {
            const lastIndex = lastSeen.get(char)!;
            dp[i] = Math.min(dp[i - 1] + 1, i - lastIndex);
        } else {
            dp[i] = dp[i - 1] + 1;
        }
        
        lastSeen.set(char, i);
        maxLength = Math.max(maxLength, dp[i]);
    }
    
    return maxLength;
}

// Sliding window with character frequency
function lengthOfLongestSubstringFreq(s: string): number {
    const freq = new Map<string, number>();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        freq.set(rightChar, (freq.get(rightChar) || 0) + 1);
        
        // Shrink window while we have duplicates
        while (freq.get(rightChar)! > 1) {
            const leftChar = s[left];
            freq.set(leftChar, freq.get(leftChar)! - 1);
            if (freq.get(leftChar) === 0) {
                freq.delete(leftChar);
            }
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Test cases
console.log("=== 3. Longest Substring Without Repeating Characters Tests ===");
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));    // Expected: 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew"));   // Expected: 3 ("wke")
console.log(lengthOfLongestSubstring(""));         // Expected: 0
console.log(lengthOfLongestSubstring("au"));       // Expected: 2

// Complex test cases
console.log(lengthOfLongestSubstring("dvdf"));     // Expected: 3 ("vdf")
console.log(lengthOfLongestSubstring("anviaj"));   // Expected: 5 ("nviaj")
console.log(lengthOfLongestSubstring("abba"));     // Expected: 2 ("ab" or "ba")

// Unicode test
console.log(lengthOfLongestSubstring("你好世界你好")); // Expected: 4

// Performance comparison
console.log("\n=== Performance Comparison ===");
const testStrings = [
    "abcabcbb",
    "pwwkew", 
    "abcdefghijklmnopqrstuvwxyz",
    "aaaaaaaaa",
    "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
];

console.log("Hash map approach:");
testStrings.forEach(s => console.log(`  "${s.slice(0,20)}...": ${lengthOfLongestSubstring(s)}`));

console.log("Set approach:");
testStrings.forEach(s => console.log(`  "${s.slice(0,20)}...": ${lengthOfLongestSubstringSet(s)}`));

console.log("Array approach:");
testStrings.forEach(s => console.log(`  "${s.slice(0,20)}...": ${lengthOfLongestSubstringArray(s)}`));