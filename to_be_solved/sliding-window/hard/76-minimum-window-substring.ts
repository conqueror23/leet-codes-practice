/**
 * 76. Minimum Window Substring - Hard
 * 
 * Given two strings s and t of lengths m and n respectively, return the minimum window 
 * substring of s such that every character in t (including duplicates) is included in the window. 
 * If there is no such window in s that covers all characters in t, return the empty string "".
 * 
 * Note that If there is such a window, it is guaranteed that there will always be only one unique minimum window in s.
 */

function minWindow(s: string, t: string): string {
    // Advanced: Sliding window with frequency maps
    // Time: O(|s| + |t|), Space: O(|s| + |t|)
    
    if (s.length < t.length) return "";
    
    // Build frequency map for target string
    const targetFreq = new Map<string, number>();
    for (const char of t) {
        targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
    }
    
    const windowFreq = new Map<string, number>();
    let left = 0;
    let minLength = Infinity;
    let minStart = 0;
    let formed = 0; // Number of unique chars in window with desired frequency
    const required = targetFreq.size;
    
    for (let right = 0; right < s.length; right++) {
        // Expand window
        const rightChar = s[right];
        windowFreq.set(rightChar, (windowFreq.get(rightChar) || 0) + 1);
        
        // Check if frequency of current character matches desired count
        if (targetFreq.has(rightChar) && 
            windowFreq.get(rightChar) === targetFreq.get(rightChar)) {
            formed++;
        }
        
        // Contract window
        while (left <= right && formed === required) {
            // Update minimum window if current is smaller
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minStart = left;
            }
            
            const leftChar = s[left];
            windowFreq.set(leftChar, windowFreq.get(leftChar)! - 1);
            
            if (targetFreq.has(leftChar) && 
                windowFreq.get(leftChar)! < targetFreq.get(leftChar)!) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLength === Infinity ? "" : s.slice(minStart, minStart + minLength);
}

// Optimized: Array-based frequency counting for ASCII
function minWindowArray(s: string, t: string): string {
    if (s.length < t.length) return "";
    
    // ASCII frequency arrays
    const targetFreq = new Array(128).fill(0);
    const windowFreq = new Array(128).fill(0);
    let uniqueChars = 0;
    
    // Build target frequency
    for (const char of t) {
        const code = char.charCodeAt(0);
        if (targetFreq[code] === 0) uniqueChars++;
        targetFreq[code]++;
    }
    
    let left = 0;
    let minLength = Infinity;
    let minStart = 0;
    let formed = 0;
    
    for (let right = 0; right < s.length; right++) {
        const rightCode = s.charCodeAt(right);
        windowFreq[rightCode]++;
        
        if (targetFreq[rightCode] > 0 && 
            windowFreq[rightCode] === targetFreq[rightCode]) {
            formed++;
        }
        
        while (formed === uniqueChars) {
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minStart = left;
            }
            
            const leftCode = s.charCodeAt(left);
            windowFreq[leftCode]--;
            
            if (targetFreq[leftCode] > 0 && 
                windowFreq[leftCode] < targetFreq[leftCode]) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLength === Infinity ? "" : s.slice(minStart, minStart + minLength);
}

// Advanced: Template-based solution (more general)
function minWindowTemplate(s: string, t: string): string {
    const targetMap = new Map<string, number>();
    for (const char of t) {
        targetMap.set(char, (targetMap.get(char) || 0) + 1);
    }
    
    let left = 0;
    let minLength = Infinity;
    let minStart = 0;
    let counter = targetMap.size; // Number of unique characters to match
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        
        if (targetMap.has(rightChar)) {
            targetMap.set(rightChar, targetMap.get(rightChar)! - 1);
            if (targetMap.get(rightChar) === 0) counter--;
        }
        
        while (counter === 0) {
            // Update result
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minStart = left;
            }
            
            const leftChar = s[left];
            if (targetMap.has(leftChar)) {
                targetMap.set(leftChar, targetMap.get(leftChar)! + 1);
                if (targetMap.get(leftChar)! > 0) counter++;
            }
            left++;
        }
    }
    
    return minLength === Infinity ? "" : s.slice(minStart, minStart + minLength);
}

// Space-optimized with single pass preprocessing
function minWindowOptimized(s: string, t: string): string {
    if (s.length < t.length) return "";
    
    // Preprocess: find all relevant positions
    const relevantChars = new Set(t);
    const filteredS: Array<[string, number]> = [];
    
    for (let i = 0; i < s.length; i++) {
        if (relevantChars.has(s[i])) {
            filteredS.push([s[i], i]);
        }
    }
    
    if (filteredS.length < t.length) return "";
    
    const targetFreq = new Map<string, number>();
    for (const char of t) {
        targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
    }
    
    const windowFreq = new Map<string, number>();
    let left = 0;
    let minLength = Infinity;
    let minStart = 0;
    let formed = 0;
    const required = targetFreq.size;
    
    for (let right = 0; right < filteredS.length; right++) {
        const [rightChar, rightIndex] = filteredS[right];
        windowFreq.set(rightChar, (windowFreq.get(rightChar) || 0) + 1);
        
        if (windowFreq.get(rightChar) === targetFreq.get(rightChar)) {
            formed++;
        }
        
        while (formed === required && left <= right) {
            const leftIndex = filteredS[left][1];
            const windowSize = rightIndex - leftIndex + 1;
            
            if (windowSize < minLength) {
                minLength = windowSize;
                minStart = leftIndex;
            }
            
            const [leftChar] = filteredS[left];
            windowFreq.set(leftChar, windowFreq.get(leftChar)! - 1);
            
            if (windowFreq.get(leftChar)! < targetFreq.get(leftChar)!) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLength === Infinity ? "" : s.slice(minStart, minStart + minLength);
}

// Alternative: Two-pointer with early termination
function minWindowTwoPointer(s: string, t: string): string {
    if (t.length === 0) return "";
    
    const need = new Map<string, number>();
    const have = new Map<string, number>();
    
    for (const char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0;
    let haveCount = 0;
    const needCount = need.size;
    let result = "";
    let resultLength = Infinity;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        have.set(char, (have.get(char) || 0) + 1);
        
        if (need.has(char) && have.get(char) === need.get(char)) {
            haveCount++;
        }
        
        while (haveCount === needCount) {
            const currentLength = right - left + 1;
            if (currentLength < resultLength) {
                result = s.slice(left, right + 1);
                resultLength = currentLength;
            }
            
            const leftChar = s[left];
            have.set(leftChar, have.get(leftChar)! - 1);
            
            if (need.has(leftChar) && have.get(leftChar)! < need.get(leftChar)!) {
                haveCount--;
            }
            
            left++;
        }
    }
    
    return result;
}

// Test cases
console.log("=== 76. Minimum Window Substring Tests ===");
console.log(`minWindow("ADOBECODEBANC", "ABC"): "${minWindow("ADOBECODEBANC", "ABC")}"`); // Expected: "BANC"
console.log(`minWindow("a", "a"): "${minWindow("a", "a")}"`); // Expected: "a"
console.log(`minWindow("a", "aa"): "${minWindow("a", "aa")}"`); // Expected: ""
console.log(`minWindow("ab", "b"): "${minWindow("ab", "b")}"`); // Expected: "b"

// Complex test cases
console.log(`minWindow("ADOBECODEBANC", "AABC"): "${minWindow("ADOBECODEBANC", "AABC")}"`); // Expected: "ADOBEC"
console.log(`minWindow("aa", "aa"): "${minWindow("aa", "aa")}"`); // Expected: "aa"
console.log(`minWindow("bba", "ab"): "${minWindow("bba", "ab")}"`); // Expected: "ba"

// Edge cases
console.log(`minWindow("", "a"): "${minWindow("", "a")}"`); // Expected: ""
console.log(`minWindow("a", ""): "${minWindow("a", "")}"`); // Expected: ""

// Performance test with large strings
const largeS = "A".repeat(1000) + "B".repeat(1000) + "C".repeat(1000) + "ABC";
const largeT = "ABC";
console.log(`Large string test: ${minWindow(largeS, largeT).length} chars`); // Expected: 3

// Performance comparison
console.log("\n=== Performance Comparison ===");
const testCases = [
    ["ADOBECODEBANC", "ABC"],
    ["a", "a"],
    ["ab", "b"],
    ["bba", "ab"],
    ["ADOBECODEBANC", "AABC"]
];

console.log("Map-based approach:");
testCases.forEach(([s, t]) => console.log(`  "${s}", "${t}": "${minWindow(s, t)}"`));

console.log("Optimized approach:");
testCases.forEach(([s, t]) => console.log(`  "${s}", "${t}": "${minWindowOptimized(s, t)}"`));

console.log("Two-pointer approach:");
testCases.forEach(([s, t]) => console.log(`  "${s}", "${t}": "${minWindowTwoPointer(s, t)}"`));