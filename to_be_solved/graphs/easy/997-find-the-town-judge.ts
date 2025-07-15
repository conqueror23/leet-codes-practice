// LeetCode 997: Find the Town Judge (Easy)
// In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.

function findJudge(n: number, trust: number[][]): number {
    const trustCounts = new Array(n + 1).fill(0);
    
    for (const [a, b] of trust) {
        trustCounts[a]--; // a trusts someone
        trustCounts[b]++; // b is trusted by someone
    }
    
    for (let i = 1; i <= n; i++) {
        if (trustCounts[i] === n - 1) {
            return i;
        }
    }
    
    return -1;
}

// Test cases
console.log(findJudge(2, [[1,2]])); // 2
console.log(findJudge(3, [[1,3],[2,3]])); // 3
console.log(findJudge(3, [[1,3],[2,3],[3,1]])); // -1