// LeetCode 72: Edit Distance (Hard)
// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;
    
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,      // delete
                    dp[i][j - 1] + 1,      // insert
                    dp[i - 1][j - 1] + 1   // replace
                );
            }
        }
    }
    
    return dp[m][n];
}

// Test cases
console.log(minDistance("horse", "ros")); // 3
console.log(minDistance("intention", "execution")); // 5