// LeetCode 322: Coin Change (Medium) - Advanced Solutions

// Solution 1: Bottom-Up DP (Original)
function coinChange(coins: number[], amount: number): number {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}

// Solution 2: BFS Approach
function coinChangeBFS(coins: number[], amount: number): number {
    if (amount === 0) return 0;
    
    const queue: number[] = [0];
    const visited = new Set<number>([0]);
    let level = 0;
    
    while (queue.length > 0) {
        const size = queue.length;
        level++;
        
        for (let i = 0; i < size; i++) {
            const curr = queue.shift()!;
            
            for (const coin of coins) {
                const next = curr + coin;
                if (next === amount) return level;
                if (next < amount && !visited.has(next)) {
                    visited.add(next);
                    queue.push(next);
                }
            }
        }
    }
    
    return -1;
}

// Solution 3: DFS with Memoization
function coinChangeDFS(coins: number[], amount: number): number {
    const memo = new Map<number, number>();
    coins.sort((a, b) => b - a); // Sort descending for optimization
    
    function dfs(remaining: number): number {
        if (remaining === 0) return 0;
        if (remaining < 0) return -1;
        if (memo.has(remaining)) return memo.get(remaining)!;
        
        let minCoins = Infinity;
        for (const coin of coins) {
            if (coin > remaining) continue;
            const result = dfs(remaining - coin);
            if (result !== -1) {
                minCoins = Math.min(minCoins, result + 1);
            }
        }
        
        const finalResult = minCoins === Infinity ? -1 : minCoins;
        memo.set(remaining, finalResult);
        return finalResult;
    }
    
    return dfs(amount);
}

// Solution 4: Optimized DP with Coin Loop Outside
function coinChangeOptimized(coins: number[], amount: number): number {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            if (dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Solution 5: Greedy + Backtracking (Advanced)
function coinChangeGreedy(coins: number[], amount: number): number {
    coins.sort((a, b) => b - a);
    let minCoins = Infinity;
    
    function backtrack(index: number, remaining: number, coinCount: number) {
        if (remaining === 0) {
            minCoins = Math.min(minCoins, coinCount);
            return;
        }
        
        if (index >= coins.length || coinCount >= minCoins) return;
        
        const coin = coins[index];
        const maxUse = Math.floor(remaining / coin);
        
        // Try using 0 to maxUse coins of current denomination
        for (let use = maxUse; use >= 0; use--) {
            backtrack(index + 1, remaining - use * coin, coinCount + use);
        }
    }
    
    backtrack(0, amount, 0);
    return minCoins === Infinity ? -1 : minCoins;
}

// Test cases
console.log("Bottom-Up DP:", coinChange([1, 3, 4], 6)); // 2
console.log("BFS:", coinChangeBFS([1, 3, 4], 6)); // 2
console.log("DFS Memo:", coinChangeDFS([1, 3, 4], 6)); // 2
console.log("Optimized DP:", coinChangeOptimized([2], 3)); // -1
console.log("Greedy:", coinChangeGreedy([1, 3, 4], 6)); // 2

// Time Complexity Analysis:
// Solution 1: O(amount * coins) time, O(amount) space - Standard approach
// Solution 2: O(amount * coins) time, O(amount) space - BFS, good for min operations
// Solution 3: O(amount * coins) time, O(amount) space - Top-down with memoization
// Solution 4: O(amount * coins) time, O(amount) space - Optimized iteration order
// Solution 5: O(2^coins) time, O(coins) space - Exponential but optimal for small inputs