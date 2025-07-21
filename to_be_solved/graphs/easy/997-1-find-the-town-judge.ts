// LeetCode 997: Find the Town Judge (Easy) - Advanced Solutions

// Solution 1: In-degree and Out-degree (Original)
function findJudge(n: number, trust: number[][]): number {
    const trustCounts = new Array(n + 1).fill(0);
    
    for (const [a, b] of trust) {
        trustCounts[a]--; // a trusts someone (out-degree)
        trustCounts[b]++; // b is trusted by someone (in-degree)
    }
    
    for (let i = 1; i <= n; i++) {
        if (trustCounts[i] === n - 1) return i;
    }
    
    return -1;
}

// Solution 2: Two Arrays Approach
function findJudgeTwo(n: number, trust: number[][]): number {
    const inDegree = new Array(n + 1).fill(0);
    const outDegree = new Array(n + 1).fill(0);
    
    for (const [a, b] of trust) {
        outDegree[a]++;
        inDegree[b]++;
    }
    
    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === n - 1 && outDegree[i] === 0) {
            return i;
        }
    }
    
    return -1;
}

// Solution 3: Set-based Approach
function findJudgeSet(n: number, trust: number[][]): number {
    const trustees = new Set<number>(); // People who trust others
    const trustCounts = new Map<number, number>(); // Count of people who trust each person
    
    for (const [a, b] of trust) {
        trustees.add(a);
        trustCounts.set(b, (trustCounts.get(b) || 0) + 1);
    }
    
    for (let i = 1; i <= n; i++) {
        if (!trustees.has(i) && (trustCounts.get(i) || 0) === n - 1) {
            return i;
        }
    }
    
    return -1;
}

// Test cases
console.log("Original:", findJudge(2, [[1,2]])); // 2
console.log("Two Arrays:", findJudgeTwo(3, [[1,3],[2,3]])); // 3
console.log("Set-based:", findJudgeSet(3, [[1,3],[2,3],[3,1]])); // -1

// Time Complexity: O(E) where E is number of trust relationships
// Space Complexity: O(n) for all solutions