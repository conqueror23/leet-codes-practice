// LeetCode 30: Substring with Concatenation of All Words (Hard)
// You are given a string s and an array of strings words of the same length. Return all starting indices of substring(s) in s that is a concatenation of each word in words exactly once.

function findSubstring(s: string, words: string[]): number[] {
    if (!s || !words || words.length === 0) return [];
    
    const wordLen = words[0].length;
    const totalLen = wordLen * words.length;
    const result: number[] = [];
    
    const wordCount = new Map<string, number>();
    for (const word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
    
    for (let i = 0; i <= s.length - totalLen; i++) {
        const seen = new Map<string, number>();
        let j = 0;
        
        while (j < words.length) {
            const word = s.substring(i + j * wordLen, i + (j + 1) * wordLen);
            
            if (!wordCount.has(word)) break;
            
            seen.set(word, (seen.get(word) || 0) + 1);
            
            if (seen.get(word)! > wordCount.get(word)!) break;
            
            j++;
        }
        
        if (j === words.length) {
            result.push(i);
        }
    }
    
    return result;
}

// Test cases
console.log(findSubstring("barfoothefoobarman", ["foo","bar"])); // [0,9]