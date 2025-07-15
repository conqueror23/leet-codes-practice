// LeetCode 242: Valid Anagram (Easy)
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    
    const charCount = new Map<string, number>();
    
    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    for (const char of t) {
        if (!charCount.has(char)) return false;
        charCount.set(char, charCount.get(char)! - 1);
        if (charCount.get(char) === 0) {
            charCount.delete(char);
        }
    }
    
    return charCount.size === 0;
}

// Alternative solution using sorting
function isAnagramSort(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    return s.split('').sort().join('') === t.split('').sort().join('');
}

// Test cases
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false