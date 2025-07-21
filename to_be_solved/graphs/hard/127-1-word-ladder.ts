// LeetCode 127: Word Ladder (Hard) - Advanced Solutions
// A transformation sequence from word beginWord to word endWord using a dictionary wordList 
// is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
// - Every adjacent pair of words differs by a single letter
// - Every si (1 <= i <= k) is in wordList (beginWord may not be in wordList)

/**
 * APPROACH 1: Unidirectional BFS
 * Time Complexity: O(M² × N) where M = word length, N = wordList size
 * Space Complexity: O(M × N) for visited set and queue
 * Best for: Standard approach, easy to understand
 */
function ladderLengthBFS(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue: [string, number][] = [[beginWord, 1]];
    const visited = new Set<string>([beginWord]);
    
    while (queue.length > 0) {
        const [currentWord, steps] = queue.shift()!;
        
        if (currentWord === endWord) return steps;
        
        // Try changing each character position
        for (let i = 0; i < currentWord.length; i++) {
            // Try all 26 possible characters
            for (let charCode = 97; charCode <= 122; charCode++) { // 'a' to 'z'
                const newChar = String.fromCharCode(charCode);
                if (newChar === currentWord[i]) continue; // Skip same character
                
                const newWord = currentWord.slice(0, i) + newChar + currentWord.slice(i + 1);
                
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, steps + 1]);
                }
            }
        }
    }
    
    return 0;
}

/**
 * APPROACH 2: Bidirectional BFS
 * Time Complexity: O(M² × N) but with better practical performance
 * Space Complexity: O(M × N)
 * Best for: When path exists, significantly faster than unidirectional
 */
function ladderLengthBidirectional(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    // Two sets for bidirectional search
    let beginSet = new Set([beginWord]);
    let endSet = new Set([endWord]);
    const visited = new Set<string>();
    let steps = 1;
    
    while (beginSet.size > 0 && endSet.size > 0) {
        // Always expand the smaller set for efficiency
        if (beginSet.size > endSet.size) {
            [beginSet, endSet] = [endSet, beginSet];
        }
        
        const nextSet = new Set<string>();
        
        for (const word of beginSet) {
            for (let i = 0; i < word.length; i++) {
                for (let charCode = 97; charCode <= 122; charCode++) {
                    const newChar = String.fromCharCode(charCode);
                    if (newChar === word[i]) continue;
                    
                    const newWord = word.slice(0, i) + newChar + word.slice(i + 1);
                    
                    if (endSet.has(newWord)) {
                        return steps + 1;
                    }
                    
                    if (wordSet.has(newWord) && !visited.has(newWord)) {
                        visited.add(newWord);
                        nextSet.add(newWord);
                    }
                }
            }
        }
        
        beginSet = nextSet;
        steps++;
    }
    
    return 0;
}

/**
 * APPROACH 3: BFS with Pattern Optimization
 * Time Complexity: O(M² × N)
 * Space Complexity: O(M² × N) for pattern mapping
 * Best for: When there are many similar words, reduces redundant work
 */
function ladderLengthPatternBFS(beginWord: string, endWord: string, wordList: string[]): number {
    if (!wordList.includes(endWord)) return 0;
    
    // Build pattern to words mapping
    const patternMap = new Map<string, string[]>();
    wordList.push(beginWord); // Include begin word in pattern mapping
    
    for (const word of wordList) {
        for (let i = 0; i < word.length; i++) {
            const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
            if (!patternMap.has(pattern)) {
                patternMap.set(pattern, []);
            }
            patternMap.get(pattern)!.push(word);
        }
    }
    
    const queue: [string, number][] = [[beginWord, 1]];
    const visited = new Set<string>([beginWord]);
    
    while (queue.length > 0) {
        const [currentWord, steps] = queue.shift()!;
        
        if (currentWord === endWord) return steps;
        
        // Generate all patterns for current word
        for (let i = 0; i < currentWord.length; i++) {
            const pattern = currentWord.slice(0, i) + '*' + currentWord.slice(i + 1);
            
            if (patternMap.has(pattern)) {
                for (const neighbor of patternMap.get(pattern)!) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push([neighbor, steps + 1]);
                    }
                }
            }
        }
    }
    
    return 0;
}

/**
 * APPROACH 4: A* Search with Heuristic
 * Time Complexity: O(M² × N × log(N)) due to priority queue
 * Space Complexity: O(M × N)
 * Best for: When you want to explore promising paths first
 */
class PriorityQueue<T> {
    private items: { element: T; priority: number }[] = [];
    
    enqueue(element: T, priority: number): void {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }
    
    dequeue(): T | undefined {
        return this.items.shift()?.element;
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

function hammingDistance(word1: string, word2: string): number {
    let distance = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) distance++;
    }
    return distance;
}

function ladderLengthAStar(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const pq = new PriorityQueue<[string, number]>();
    pq.enqueue([beginWord, 1], hammingDistance(beginWord, endWord));
    
    const visited = new Set<string>([beginWord]);
    
    while (!pq.isEmpty()) {
        const [currentWord, steps] = pq.dequeue()!;
        
        if (currentWord === endWord) return steps;
        
        for (let i = 0; i < currentWord.length; i++) {
            for (let charCode = 97; charCode <= 122; charCode++) {
                const newChar = String.fromCharCode(charCode);
                if (newChar === currentWord[i]) continue;
                
                const newWord = currentWord.slice(0, i) + newChar + currentWord.slice(i + 1);
                
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    const heuristic = hammingDistance(newWord, endWord);
                    pq.enqueue([newWord, steps + 1], steps + 1 + heuristic);
                }
            }
        }
    }
    
    return 0;
}

/**
 * APPROACH 5: DFS with Memoization (Less efficient but educational)
 * Time Complexity: O(M² × N × 2^N) worst case
 * Space Complexity: O(M × N) for memoization
 * Best for: Understanding recursive structure (not recommended for this problem)
 */
function ladderLengthDFS(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const memo = new Map<string, number>();
    
    function isOneEditAway(word1: string, word2: string): boolean {
        let differences = 0;
        for (let i = 0; i < word1.length; i++) {
            if (word1[i] !== word2[i]) {
                differences++;
                if (differences > 1) return false;
            }
        }
        return differences === 1;
    }
    
    function dfs(currentWord: string, visited: Set<string>): number {
        if (currentWord === endWord) return 1;
        
        const key = currentWord + Array.from(visited).sort().join(',');
        if (memo.has(key)) return memo.get(key)!;
        
        let minSteps = Infinity;
        
        for (const word of wordSet) {
            if (!visited.has(word) && isOneEditAway(currentWord, word)) {
                visited.add(word);
                const steps = dfs(word, visited);
                if (steps !== Infinity) {
                    minSteps = Math.min(minSteps, steps + 1);
                }
                visited.delete(word);
            }
        }
        
        const result = minSteps === Infinity ? Infinity : minSteps;
        memo.set(key, result);
        return result;
    }
    
    const result = dfs(beginWord, new Set([beginWord]));
    return result === Infinity ? 0 : result;
}

/**
 * Performance Comparison Function
 */
function performanceComparison(beginWord: string, endWord: string, wordList: string[]): void {
    console.log(`\n=== Word Ladder Performance Comparison ===`);
    console.log(`Begin: "${beginWord}", End: "${endWord}", Dictionary size: ${wordList.length}`);
    
    const methods = [
        { name: 'Unidirectional BFS', func: ladderLengthBFS, complexity: 'O(M²N) time, O(MN) space' },
        { name: 'Bidirectional BFS', func: ladderLengthBidirectional, complexity: 'O(M²N) time, O(MN) space' },
        { name: 'Pattern BFS', func: ladderLengthPatternBFS, complexity: 'O(M²N) time, O(M²N) space' },
        { name: 'A* Search', func: ladderLengthAStar, complexity: 'O(M²N⋅log(N)) time, O(MN) space' }
        // Note: DFS approach excluded from performance test due to exponential complexity
    ];
    
    methods.forEach(method => {
        const start = performance.now();
        const result = method.func(beginWord, endWord, [...wordList]);
        const end = performance.now();
        
        console.log(`${method.name.padEnd(20)}: ${result.toString().padEnd(6)} | ${(end - start).toFixed(4)}ms | ${method.complexity}`);
    });
}

/**
 * Advanced Test Cases
 */
function runAdvancedTests(): void {
    console.log('=== Word Ladder Advanced Test Cases ===');
    
    const testCases = [
        {
            beginWord: 'hit', endWord: 'cog', 
            wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'], 
            expected: 5,
            description: 'Classic example: hit → hot → dot → dog → cog'
        },
        {
            beginWord: 'hit', endWord: 'cog',
            wordList: ['hot', 'dot', 'dog', 'lot', 'log'],
            expected: 0,
            description: 'No path: endWord not in dictionary'
        },
        {
            beginWord: 'a', endWord: 'c',
            wordList: ['a', 'b', 'c'],
            expected: 2,
            description: 'Simple case: a → c'
        },
        {
            beginWord: 'start', endWord: 'final',
            wordList: ['start', 'final'],
            expected: 0,
            description: 'No connection: words differ by more than one character'
        },
        {
            beginWord: 'same', endWord: 'same',
            wordList: ['same'],
            expected: 1,
            description: 'Same word: should return 1'
        },
        {
            beginWord: 'cat', endWord: 'dog',
            wordList: ['bat', 'bag', 'dag', 'dog'],
            expected: 0,
            description: 'No valid transformation path'
        },
        {
            beginWord: 'red', endWord: 'tax',
            wordList: ['ted', 'tex', 'red', 'tax', 'tad', 'den', 'rex', 'pee'],
            expected: 4,
            description: 'Complex path: red → ted → tex → tax'
        },
        {
            beginWord: 'hot', endWord: 'dog',
            wordList: ['hot', 'dog', 'dot'],
            expected: 3,
            description: 'Multiple possible paths'
        }
    ];
    
    const methods = [
        { name: 'Uni-BFS', func: ladderLengthBFS },
        { name: 'Bi-BFS', func: ladderLengthBidirectional },
        { name: 'Pattern', func: ladderLengthPatternBFS },
        { name: 'A*', func: ladderLengthAStar }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`"${testCase.beginWord}" → "${testCase.endWord}", Expected: ${testCase.expected}`);
        
        methods.forEach(method => {
            const result = method.func(testCase.beginWord, testCase.endWord, [...testCase.wordList]);
            const passed = result === testCase.expected;
            console.log(`  ${method.name.padEnd(10)}: ${result} ${passed ? '✓' : '✗'}`);
        });
    });
}

/**
 * Algorithm Analysis
 */
function algorithmAnalysis(): void {
    console.log('\n=== Algorithm Analysis ===');
    console.log('PROBLEM PATTERN: Shortest Path in Unweighted Graph');
    console.log('');
    console.log('APPROACH COMPARISON:');
    console.log('1. Unidirectional BFS: Standard BFS, explores one direction');
    console.log('2. Bidirectional BFS: Explores from both ends, often 2x faster');
    console.log('3. Pattern BFS: Pre-computes patterns, good for dense word lists');
    console.log('4. A* Search: Uses heuristic, good when heuristic is accurate');
    console.log('5. DFS: Exponential complexity, not recommended for this problem');
    console.log('');
    console.log('KEY INSIGHTS:');
    console.log('- BFS guarantees shortest path in unweighted graphs');
    console.log('- Bidirectional search can reduce search space significantly');
    console.log('- String transformations create implicit graph structure');
    console.log('- Hamming distance serves as admissible heuristic for A*');
    console.log('');
    console.log('RECOMMENDED: Bidirectional BFS for best practical performance');
}

/**
 * Graph Theory Context
 */
function graphTheoryContext(): void {
    console.log('\n=== Graph Theory Context ===');
    console.log('Word Ladder as a Graph Problem:');
    console.log('- Vertices: Words in the dictionary');
    console.log('- Edges: Words that differ by exactly one character');
    console.log('- Problem: Find shortest path from beginWord to endWord');
    console.log('');
    console.log('Graph Properties:');
    console.log('- Unweighted: All transformations have equal cost');
    console.log('- Undirected: If A transforms to B, then B transforms to A');
    console.log('- Sparse: Most words are not connected directly');
    console.log('');
    console.log('Applications:');
    console.log('- Word games and puzzles');
    console.log('- DNA sequence analysis (nucleotide substitutions)');
    console.log('- Spell checking with edit distance');
    console.log('- Network routing with hop count');
}

/**
 * Extensions and Optimizations
 */
function extensionsAndOptimizations(): void {
    console.log('\n=== Extensions and Optimizations ===');
    console.log('1. All shortest paths: Find all transformation sequences of minimum length');
    console.log('2. Weighted transformations: Different costs for different character changes');
    console.log('3. Multiple edit operations: Allow insertions and deletions, not just substitutions');
    console.log('4. Dictionary preprocessing: Build adjacency list for faster neighbor lookup');
    console.log('5. Parallel BFS: Use multiple threads for exploring different branches');
    console.log('6. Memory optimization: Use iterative deepening for space-constrained environments');
    console.log('7. Dynamic dictionary: Handle dictionary updates during search');
    console.log('8. Alphabet optimization: Use smaller character sets when possible');
}

// Run all tests and analysis
runAdvancedTests();
performanceComparison('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']);
algorithmAnalysis();
graphTheoryContext();
extensionsAndOptimizations();

export { 
    ladderLengthBFS, 
    ladderLengthBidirectional, 
    ladderLengthPatternBFS, 
    ladderLengthAStar,
    ladderLengthDFS 
};