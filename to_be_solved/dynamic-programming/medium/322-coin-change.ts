// LeetCode 322: Coin Change (Medium)
// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

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

// Test cases
console.log(coinChange([1, 3, 4], 6)); // 2
console.log(coinChange([2], 3)); // -1
console.log(coinChange([1], 0)); // 0