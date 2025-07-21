// LeetCode 72: Edit Distance (Hard) - Advanced Solutions

// Solution 1: 2D DP (Original)
function minDistance(word1: string, word2: string): number {
    const m = word1.length, n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
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

// Solution 2: Space-Optimized DP (O(min(m,n)) space)
function minDistanceSpaceOptimized(word1: string, word2: string): number {
    let [m, n] = [word1.length, word2.length];
    
    // Ensure word1 is shorter to optimize space
    if (m > n) {
        [word1, word2] = [word2, word1];
        [m, n] = [n, m];
    }
    
    let prev = Array.from({ length: m + 1 }, (_, i) => i);
    
    for (let i = 1; i <= n; i++) {
        const curr = new Array(m + 1);
        curr[0] = i;
        
        for (let j = 1; j <= m; j++) {
            if (word2[i - 1] === word1[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = Math.min(
                    prev[j] + 1,     // delete
                    curr[j - 1] + 1, // insert
                    prev[j - 1] + 1  // replace
                );
            }
        }
        
        prev = curr;
    }
    
    return prev[m];
}

// Solution 3: Memoized Recursion
function minDistanceMemo(word1: string, word2: string): number {
    const memo = new Map<string, number>();
    
    function dp(i: number, j: number): number {
        if (i === 0) return j;
        if (j === 0) return i;
        
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key)!;
        
        let result: number;
        if (word1[i - 1] === word2[j - 1]) {
            result = dp(i - 1, j - 1);
        } else {
            result = Math.min(
                dp(i - 1, j) + 1,     // delete
                dp(i, j - 1) + 1,     // insert
                dp(i - 1, j - 1) + 1  // replace
            );
        }
        
        memo.set(key, result);
        return result;
    }
    
    return dp(word1.length, word2.length);
}

// Solution 4: Myers' Algorithm (Advanced - O(ND) complexity)
function minDistanceMyers(word1: string, word2: string): number {
    const m = word1.length, n = word2.length;
    const maxD = m + n;
    
    // v[k] = x such that we can reach (x, x-k) in D steps
    const v = new Array(2 * maxD + 1);
    v[maxD + 1] = 0;
    
    for (let d = 0; d <= maxD; d++) {
        for (let k = -d; k <= d; k += 2) {
            let x: number;
            
            if (k === -d || (k !== d && v[maxD + k - 1] < v[maxD + k + 1])) {
                x = v[maxD + k + 1];
            } else {
                x = v[maxD + k - 1] + 1;
            }
            
            let y = x - k;
            
            // Extend diagonal as far as possible
            while (x < m && y < n && word1[x] === word2[y]) {
                x++;
                y++;
            }
            
            v[maxD + k] = x;
            
            if (x >= m && y >= n) {
                return d;
            }
        }
    }
    
    return maxD;
}

// Solution 5: Wagner-Fischer with Path Reconstruction
function minDistanceWithPath(word1: string, word2: string): {distance: number, operations: string[]} {
    const m = word1.length, n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    // Initialize
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + 1
                );
            }
        }
    }
    
    // Reconstruct path
    const operations: string[] = [];
    let i = m, j = n;
    
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && word1[i - 1] === word2[j - 1]) {
            i--; j--;
        } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
            operations.push(`Replace '${word1[i - 1]}' with '${word2[j - 1]}'`);
            i--; j--;
        } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            operations.push(`Delete '${word1[i - 1]}'`);
            i--;
        } else {
            operations.push(`Insert '${word2[j - 1]}'`);
            j--;
        }
    }
    
    return { distance: dp[m][n], operations: operations.reverse() };
}

// Test cases
console.log("2D DP:", minDistance("horse", "ros")); // 3
console.log("Space Optimized:", minDistanceSpaceOptimized("intention", "execution")); // 5
console.log("Memoized:", minDistanceMemo("horse", "ros")); // 3
console.log("Myers:", minDistanceMyers("horse", "ros")); // 3

const pathResult = minDistanceWithPath("horse", "ros");
console.log("With Path:", pathResult.distance, pathResult.operations);

// Time Complexity Analysis:
// Solution 1: O(mn) time, O(mn) space - Standard 2D DP
// Solution 2: O(mn) time, O(min(m,n)) space - Space optimized
// Solution 3: O(mn) time, O(mn) space - Top-down with memoization
// Solution 4: O(ND) time, O(D) space - Myers' algorithm, where D is edit distance
// Solution 5: O(mn) time, O(mn) space - With operation reconstruction