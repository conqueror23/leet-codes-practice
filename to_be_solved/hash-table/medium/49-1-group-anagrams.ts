// LeetCode 49: Group Anagrams (Medium) - Advanced Solutions
// Given an array of strings strs, group the anagrams together. 
// You can return the answer in any order.

/**
 * APPROACH 1: Sort-based grouping (Classic)
 * Time Complexity: O(n * k * log k) where n = strs.length, k = max string length
 * Space Complexity: O(n * k)
 * Best for: Most intuitive approach, works well for general case
 */
function groupAnagramsSort(strs: string[]): string[][] {
    const anagramMap = new Map<string, string[]>();
    
    for (const str of strs) {
        // Sort characters to create canonical key
        const sortedStr = str.split('').sort().join('');
        
        if (!anagramMap.has(sortedStr)) {
            anagramMap.set(sortedStr, []);
        }
        anagramMap.get(sortedStr)!.push(str);
    }
    
    return Array.from(anagramMap.values());
}

/**
 * APPROACH 2: Character frequency counting
 * Time Complexity: O(n * k) where n = strs.length, k = max string length
 * Space Complexity: O(n * k)
 * Best for: Better time complexity, especially for longer strings
 */
function groupAnagramsCount(strs: string[]): string[][] {
    const anagramMap = new Map<string, string[]>();
    
    for (const str of strs) {
        // Count frequency of each character
        const charCount = new Array(26).fill(0);
        
        for (const char of str) {
            charCount[char.charCodeAt(0) - 97]++; // 'a' = 97
        }
        
        // Create key from frequency array
        const key = charCount.join(',');
        
        if (!anagramMap.has(key)) {
            anagramMap.set(key, []);
        }
        anagramMap.get(key)!.push(str);
    }
    
    return Array.from(anagramMap.values());
}

/**
 * APPROACH 3: Prime number hashing
 * Time Complexity: O(n * k)
 * Space Complexity: O(n * k)
 * Best for: Unique mathematical approach, good for educational purposes
 * Note: Risk of integer overflow for very long strings
 */
function groupAnagramsPrime(strs: string[]): string[][] {
    // Prime numbers for each letter a-z
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
    
    const anagramMap = new Map<number, string[]>();
    
    for (const str of strs) {
        let hash = 1;
        
        for (const char of str) {
            hash *= primes[char.charCodeAt(0) - 97];
            // Handle potential overflow for very long strings
            if (hash > Number.MAX_SAFE_INTEGER / 101) {
                // Fallback to string-based approach for this string
                return groupAnagramsSort(strs);
            }
        }
        
        if (!anagramMap.has(hash)) {
            anagramMap.set(hash, []);
        }
        anagramMap.get(hash)!.push(str);
    }
    
    return Array.from(anagramMap.values());
}

/**
 * APPROACH 4: Bucket sort with character frequency
 * Time Complexity: O(n * k)
 * Space Complexity: O(n * k)
 * Best for: When you want to avoid string operations for key creation
 */
function groupAnagramsBucket(strs: string[]): string[][] {
    const anagramMap = new Map<string, string[]>();
    
    for (const str of strs) {
        // Use array to track character frequencies
        const charFreq = new Array(26).fill(0);
        
        for (let i = 0; i < str.length; i++) {
            charFreq[str.charCodeAt(i) - 97]++;
        }
        
        // Create key by concatenating frequency with character
        let key = '';
        for (let i = 0; i < 26; i++) {
            if (charFreq[i] > 0) {
                key += String.fromCharCode(i + 97) + charFreq[i];
            }
        }
        
        if (!anagramMap.has(key)) {
            anagramMap.set(key, []);
        }
        anagramMap.get(key)!.push(str);
    }
    
    return Array.from(anagramMap.values());
}

/**
 * APPROACH 5: Unicode-aware grouping
 * Time Complexity: O(n * k * log k)
 * Space Complexity: O(n * k)
 * Best for: Handling strings with special characters or Unicode
 */
function groupAnagramsUnicode(strs: string[]): string[][] {
    const anagramMap = new Map<string, string[]>();
    
    for (const str of strs) {
        // Use Unicode code points for accurate character handling
        const chars = Array.from(str);
        const sortedStr = chars.sort((a, b) => a.localeCompare(b)).join('');
        
        if (!anagramMap.has(sortedStr)) {
            anagramMap.set(sortedStr, []);
        }
        anagramMap.get(sortedStr)!.push(str);
    }
    
    return Array.from(anagramMap.values());
}

/**
 * BONUS: Advanced anagram detection with custom alphabet
 */
function groupAnagramsCustomAlphabet(strs: string[], alphabet: string): string[][] {
    const charToIndex = new Map<string, number>();
    for (let i = 0; i < alphabet.length; i++) {
        charToIndex.set(alphabet[i], i);
    }
    
    const anagramMap = new Map<string, string[]>();
    
    for (const str of strs) {
        const charCount = new Array(alphabet.length).fill(0);
        let validString = true;
        
        for (const char of str) {
            if (charToIndex.has(char)) {
                charCount[charToIndex.get(char)!]++;
            } else {
                validString = false;
                break;
            }
        }
        
        if (validString) {
            const key = charCount.join(',');
            
            if (!anagramMap.has(key)) {
                anagramMap.set(key, []);
            }
            anagramMap.get(key)!.push(str);
        }
    }
    
    return Array.from(anagramMap.values());
}

/**
 * Performance Comparison Function
 */
function performanceComparison(strs: string[]): void {
    console.log(`\n=== Group Anagrams Performance Comparison ===`);
    console.log(`Array size: ${strs.length}, Average string length: ${strs.reduce((sum, s) => sum + s.length, 0) / strs.length}`);
    
    const methods = [
        { name: 'Sort-based', func: groupAnagramsSort, complexity: 'O(n⋅k⋅log k) time, O(nk) space' },
        { name: 'Count-based', func: groupAnagramsCount, complexity: 'O(nk) time, O(nk) space' },
        { name: 'Prime Hash', func: groupAnagramsPrime, complexity: 'O(nk) time, O(nk) space' },
        { name: 'Bucket Sort', func: groupAnagramsBucket, complexity: 'O(nk) time, O(nk) space' },
        { name: 'Unicode', func: groupAnagramsUnicode, complexity: 'O(n⋅k⋅log k) time, O(nk) space' }
    ];
    
    methods.forEach(method => {
        const start = performance.now();
        const result = method.func([...strs]); // Clone to avoid mutation
        const end = performance.now();
        
        console.log(`${method.name.padEnd(12)}: ${result.length} groups | ${(end - start).toFixed(4)}ms | ${method.complexity}`);
    });
}

/**
 * Utility function to verify anagram groups are correct
 */
function verifyAnagramGroups(groups: string[][]): boolean {
    for (const group of groups) {
        if (group.length < 2) continue; // Single strings are trivially anagrams of themselves
        
        const reference = group[0].split('').sort().join('');
        for (let i = 1; i < group.length; i++) {
            const current = group[i].split('').sort().join('');
            if (current !== reference) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Advanced Test Cases
 */
function runAdvancedTests(): void {
    console.log('=== Group Anagrams Advanced Test Cases ===');
    
    const testCases = [
        {
            strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'],
            description: 'Standard case: multiple anagram groups'
        },
        {
            strs: [''],
            description: 'Empty string'
        },
        {
            strs: ['a'],
            description: 'Single character'
        },
        {
            strs: ['abc', 'bca', 'cab', 'xyz', 'zyx', 'yxz'],
            description: 'Two groups of three anagrams each'
        },
        {
            strs: ['hello', 'world', 'olleh', 'dlrow'],
            description: 'Different length anagrams'
        },
        {
            strs: ['aab', 'aba', 'baa', 'aaa'],
            description: 'Repeated characters'
        },
        {
            strs: ['ab', 'ba', 'abc', 'bca', 'cab'],
            description: 'Mixed lengths'
        },
        {
            strs: ['listen', 'silent', 'enlist'],
            description: 'Longer anagrams'
        }
    ];
    
    const methods = [
        { name: 'Sort', func: groupAnagramsSort },
        { name: 'Count', func: groupAnagramsCount },
        { name: 'Prime', func: groupAnagramsPrime },
        { name: 'Bucket', func: groupAnagramsBucket },
        { name: 'Unicode', func: groupAnagramsUnicode }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Input: [${testCase.strs.map(s => `"${s}"`).join(', ')}]`);
        
        methods.forEach(method => {
            const result = method.func([...testCase.strs]);
            const isValid = verifyAnagramGroups(result);
            const groupSizes = result.map(group => group.length).sort((a, b) => b - a);
            
            console.log(`  ${method.name.padEnd(8)}: ${result.length} groups [${groupSizes.join(', ')}] ${isValid ? '✓' : '✗'}`);
        });
    });
}

/**
 * Algorithm Analysis
 */
function algorithmAnalysis(): void {
    console.log('\n=== Algorithm Analysis ===');
    console.log('PROBLEM PATTERN: Grouping by Canonical Representation');
    console.log('');
    console.log('APPROACH COMPARISON:');
    console.log('1. Sort-based: Most intuitive, standard approach in interviews');
    console.log('2. Count-based: Better time complexity, optimal for longer strings');
    console.log('3. Prime Hash: Creative mathematical approach, risk of overflow');
    console.log('4. Bucket Sort: Alternative counting method, avoids string joins');
    console.log('5. Unicode: Handles international characters correctly');
    console.log('');
    console.log('KEY INSIGHTS:');
    console.log('- Anagrams have same character frequencies');
    console.log('- Need canonical form as hash key (sorted string or frequency)');
    console.log('- Hash table groups strings by canonical form');
    console.log('- Choice of canonical form affects performance');
    console.log('');
    console.log('RECOMMENDED: Count-based for performance, Sort-based for simplicity');
}

/**
 * Mathematical Properties of Anagrams
 */
function mathematicalProperties(): void {
    console.log('\n=== Mathematical Properties ===');
    console.log('ANAGRAM CHARACTERISTICS:');
    console.log('- Permutations of same multiset of characters');
    console.log('- Same length (necessary condition)');
    console.log('- Same character frequencies (sufficient condition)');
    console.log('');
    console.log('CANONICAL FORMS:');
    console.log('1. Lexicographically sorted: "abc" for {a,b,c}');
    console.log('2. Frequency vector: [1,1,1,0,0...] for {a,b,c}');
    console.log('3. Prime factorization: 2×3×5 for {a,b,c}');
    console.log('');
    console.log('HASH COLLISION ANALYSIS:');
    console.log('- Sort-based: No collisions (deterministic)');
    console.log('- Frequency-based: No collisions (unique representation)');
    console.log('- Prime-based: Possible overflow, but mathematically sound');
}

/**
 * Extensions and Applications
 */
function extensionsAndApplications(): void {
    console.log('\n=== Extensions and Applications ===');
    console.log('PROBLEM EXTENSIONS:');
    console.log('1. Count anagram pairs instead of grouping');
    console.log('2. Find largest anagram group');
    console.log('3. Check if two strings are anagrams (boolean)');
    console.log('4. Group anagrams with custom character sets');
    console.log('5. Case-insensitive anagram grouping');
    console.log('6. Anagram grouping with wildcards');
    console.log('');
    console.log('REAL-WORLD APPLICATIONS:');
    console.log('- Spell checkers: suggest anagrams of misspelled words');
    console.log('- Word games: Scrabble, anagram puzzles');
    console.log('- Data deduplication: group similar data entries');
    console.log('- Code analysis: detect variable name patterns');
    console.log('- Linguistic analysis: study word relationships');
}

/**
 * Custom Alphabet Demo
 */
function customAlphabetDemo(): void {
    console.log('\n=== Custom Alphabet Demo ===');
    
    const dnaStrings = ['atcg', 'cgta', 'tacg', 'gatc'];
    const dnaAlphabet = 'atcg';
    
    console.log('DNA sequence anagrams:');
    console.log(`Input: [${dnaStrings.map(s => `"${s}"`).join(', ')}]`);
    console.log(`Alphabet: "${dnaAlphabet}"`);
    
    const dnaGroups = groupAnagramsCustomAlphabet(dnaStrings, dnaAlphabet);
    console.log('Result:', dnaGroups);
}

// Run all tests and analysis
runAdvancedTests();
performanceComparison(['eat', 'tea', 'tan', 'ate', 'nat', 'bat', 'tab', 'ant']);
algorithmAnalysis();
mathematicalProperties();
extensionsAndApplications();
customAlphabetDemo();

export { 
    groupAnagramsSort, 
    groupAnagramsCount, 
    groupAnagramsPrime, 
    groupAnagramsBucket, 
    groupAnagramsUnicode,
    groupAnagramsCustomAlphabet 
};