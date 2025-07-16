// LeetCode 49: Group Anagrams (Medium)
// Given an array of strings strs, group the anagrams together.

function groupAnagrams(strs: string[]): string[][] {
    const anagramMap = new Map<string, string[]>();
    
    for (const str of strs) {
        const sortedStr = str.split('').sort().join('');
        
        if (!anagramMap.has(sortedStr)) {
            anagramMap.set(sortedStr, []);
        }
        
        anagramMap.get(sortedStr)!.push(str);
    }
    
    return Array.from(anagramMap.values());
}

// Test cases
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"])); 
// [["bat"],["nat","tan"],["ate","eat","tea"]]