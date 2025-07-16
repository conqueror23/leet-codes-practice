// LeetCode 127: Word Ladder (Hard)
// A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by a single letter.

function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue: [string, number][] = [[beginWord, 1]];
    const visited = new Set<string>();
    visited.add(beginWord);
    
    while (queue.length > 0) {
        const [word, steps] = queue.shift()!;
        
        if (word === endWord) return steps;
        
        for (let i = 0; i < word.length; i++) {
            for (let c = 0; c < 26; c++) {
                const newChar = String.fromCharCode(97 + c);
                const newWord = word.slice(0, i) + newChar + word.slice(i + 1);
                
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, steps + 1]);
                }
            }
        }
    }
    
    return 0;
}

// Test cases
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"])); // 5