// LeetCode 127: Word Ladder (Hard) - Advanced Solutions

// Solution 1: BFS with Character Replacement (Original)
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue: [string, number][] = [[beginWord, 1]];
    const visited = new Set<string>([beginWord]);
    
    while (queue.length > 0) {
        const [word, steps] = queue.shift()!;
        if (word === endWord) return steps;
        
        for (let i = 0; i < word.length; i++) {
            for (let c = 0; c < 26; c++) {
                const newWord = word.slice(0, i) + String.fromCharCode(97 + c) + word.slice(i + 1);
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, steps + 1]);
                }
            }
        }
    }
    return 0;
}

// Solution 2: Bidirectional BFS
function ladderLengthBidirectional(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    let beginSet = new Set([beginWord]);
    let endSet = new Set([endWord]);
    const visited = new Set<string>();
    let steps = 1;
    
    while (beginSet.size > 0 && endSet.size > 0) {
        if (beginSet.size > endSet.size) {
            [beginSet, endSet] = [endSet, beginSet];
        }
        
        const nextSet = new Set<string>();
        
        for (const word of beginSet) {
            for (let i = 0; i < word.length; i++) {
                for (let c = 0; c < 26; c++) {
                    const newWord = word.slice(0, i) + String.fromCharCode(97 + c) + word.slice(i + 1);
                    
                    if (endSet.has(newWord)) return steps + 1;
                    
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

// Solution 3: Graph Construction + BFS
function ladderLengthGraph(beginWord: string, endWord: string, wordList: string[]): number {
    const words = [beginWord, ...wordList];
    const graph = new Map<string, string[]>();
    
    // Build adjacency list
    for (const word of words) {
        graph.set(word, []);
    }
    
    function isAdjacent(w1: string, w2: string): boolean {
        let diff = 0;
        for (let i = 0; i < w1.length; i++) {
            if (w1[i] !== w2[i]) diff++;
            if (diff > 1) return false;
        }
        return diff === 1;
    }
    
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (isAdjacent(words[i], words[j])) {
                graph.get(words[i])!.push(words[j]);
                graph.get(words[j])!.push(words[i]);
            }
        }
    }
    
    if (!graph.has(endWord)) return 0;
    
    const queue: [string, number][] = [[beginWord, 1]];
    const visited = new Set<string>([beginWord]);
    
    while (queue.length > 0) {
        const [word, steps] = queue.shift()!;
        if (word === endWord) return steps;
        
        for (const neighbor of graph.get(word) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, steps + 1]);
            }
        }
    }
    
    return 0;
}

// Test cases
const wordList = ["hot","dot","dog","lot","log","cog"];
console.log("BFS:", ladderLength("hit", "cog", wordList)); // 5
console.log("Bidirectional BFS:", ladderLengthBidirectional("hit", "cog", wordList)); // 5
console.log("Graph BFS:", ladderLengthGraph("hit", "cog", wordList)); // 5

// Time Complexity Analysis:
// Solution 1: O(M²×N) time, O(M×N) space - M=word length, N=wordList length
// Solution 2: O(M²×N) time, O(M×N) space - Bidirectional, faster in practice
// Solution 3: O(N²×M + M²×N) time, O(N²) space - Pre-build graph, good for multiple queries