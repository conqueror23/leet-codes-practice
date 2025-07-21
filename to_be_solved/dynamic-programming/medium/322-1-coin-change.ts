// LeetCode 322: Coin Change (Medium) - Advanced Solutions
// You are given an integer array coins representing coins of different denominations 
// and an integer amount representing a total amount of money.
// Return the fewest number of coins that you need to make up that amount.

/**
 * APPROACH 1: Bottom-up Dynamic Programming (Tabulation)
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 * Best for: Most intuitive DP approach, good for understanding the problem
 */
function coinChangeDP(coins: number[], amount: number): number {
    if (amount === 0) return 0;
    if (amount < 0) return -1;
    
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * APPROACH 2: Top-down with Memoization
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount) for memoization + O(amount) for call stack
 * Best for: Recursive thinking, natural problem decomposition
 */
function coinChangeMemo(coins: number[], amount: number): number {
    const memo = new Map<number, number>();
    
    function helper(remaining: number): number {
        if (remaining === 0) return 0;
        if (remaining < 0) return -1;
        if (memo.has(remaining)) return memo.get(remaining)!;
        
        let minCoins = Infinity;
        for (const coin of coins) {
            const subResult = helper(remaining - coin);
            if (subResult !== -1) {
                minCoins = Math.min(minCoins, subResult + 1);
            }
        }
        
        const result = minCoins === Infinity ? -1 : minCoins;
        memo.set(remaining, result);
        return result;
    }
    
    return helper(amount);
}

/**
 * APPROACH 3: BFS (Level-order traversal)
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 * Best for: Finding minimum steps naturally, intuitive for shortest path problems
 */
function coinChangeBFS(coins: number[], amount: number): number {
    if (amount === 0) return 0;
    
    const visited = new Set<number>();
    const queue: [number, number][] = [[0, 0]]; // [current_amount, num_coins]
    visited.add(0);
    
    while (queue.length > 0) {
        const [currentAmount, numCoins] = queue.shift()!;
        
        for (const coin of coins) {
            const newAmount = currentAmount + coin;
            
            if (newAmount === amount) {
                return numCoins + 1;
            }
            
            if (newAmount < amount && !visited.has(newAmount)) {
                visited.add(newAmount);
                queue.push([newAmount, numCoins + 1]);
            }
        }
    }
    
    return -1;
}

/**
 * APPROACH 4: Greedy with Backtracking (DFS)
 * Time Complexity: O(amount^coins.length) worst case, but often much better with pruning
 * Space Complexity: O(coins.length) for call stack
 * Best for: When coins have special properties, good with pruning optimizations
 */
function coinChangeGreedy(coins: number[], amount: number): number {
    if (amount === 0) return 0;
    
    // Sort coins in descending order for greedy approach
    const sortedCoins = [...coins].sort((a, b) => b - a);
    let minCoins = Infinity;
    
    function backtrack(index: number, remaining: number, count: number): void {
        if (remaining === 0) {
            minCoins = Math.min(minCoins, count);
            return;
        }
        
        if (index >= sortedCoins.length || count >= minCoins) {
            return; // Pruning
        }
        
        const coin = sortedCoins[index];
        const maxUse = Math.floor(remaining / coin);
        
        // Try using coin from maxUse down to 0
        for (let use = maxUse; use >= 0; use--) {
            if (count + use >= minCoins) break; // Pruning
            backtrack(index + 1, remaining - coin * use, count + use);
        }
    }
    
    backtrack(0, amount, 0);
    return minCoins === Infinity ? -1 : minCoins;
}

/**
 * APPROACH 5: Space-Optimized DP with Early Termination
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 * Best for: Memory-conscious applications, with optimization techniques
 */
function coinChangeOptimized(coins: number[], amount: number): number {
    if (amount === 0) return 0;
    
    // Sort coins to optimize
    const sortedCoins = [...coins].sort((a, b) => a - b);
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of sortedCoins) {
            if (coin > i) break; // Early termination since coins are sorted
            if (dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                if (dp[i] === 1) break; // Can't do better than 1 coin
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Performance Comparison Function
 */
function performanceComparison(coins: number[], amount: number): void {
    console.log(`\n=== Coin Change Performance Comparison ===`);
    console.log(`Coins: [${coins.join(', ')}], Amount: ${amount}`);
    
    const methods = [
        { name: 'DP Tabulation', func: coinChangeDP, complexity: 'O(amount × coins) time, O(amount) space' },
        { name: 'Memoization', func: coinChangeMemo, complexity: 'O(amount × coins) time, O(amount) space' },
        { name: 'BFS', func: coinChangeBFS, complexity: 'O(amount × coins) time, O(amount) space' },
        { name: 'Greedy+Backtrack', func: coinChangeGreedy, complexity: 'Variable time, O(coins) space' },
        { name: 'Optimized DP', func: coinChangeOptimized, complexity: 'O(amount × coins) time, O(amount) space' }
    ];
    
    methods.forEach(method => {
        const start = performance.now();
        const result = method.func(coins, amount);
        const end = performance.now();
        
        console.log(`${method.name.padEnd(16)}: ${result.toString().padEnd(6)} | ${(end - start).toFixed(4)}ms | ${method.complexity}`);
    });
}

/**
 * Advanced Test Cases
 */
function runAdvancedTests(): void {
    console.log('=== Coin Change Advanced Test Cases ===');
    
    const testCases = [
        {
            coins: [1, 3, 4], amount: 6, expected: 2,
            description: 'Standard case: optimal substructure'
        },
        {
            coins: [2], amount: 3, expected: -1,
            description: 'Impossible case: odd amount with even coin'
        },
        {
            coins: [1], amount: 0, expected: 0,
            description: 'Edge case: zero amount'
        },
        {
            coins: [1, 5, 10, 25], amount: 67, expected: 6,
            description: 'Classic change making: US coins'
        },
        {
            coins: [1, 4, 5], amount: 8, expected: 2,
            description: 'Greedy fails but DP works: 4+4 vs 5+1+1+1'
        },
        {
            coins: [1, 3, 4], amount: 12, expected: 3,
            description: 'Medium complexity case'
        },
        {
            coins: [2, 5, 10, 1], amount: 27, expected: 4,
            description: 'Unsorted coins test'
        },
        {
            coins: [1, 2147483647], amount: 2, expected: 2,
            description: 'Large coin denomination'
        }
    ];
    
    const methods = [
        { name: 'DP', func: coinChangeDP },
        { name: 'Memo', func: coinChangeMemo },
        { name: 'BFS', func: coinChangeBFS },
        { name: 'Greedy', func: coinChangeGreedy },
        { name: 'Optimized', func: coinChangeOptimized }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Coins: [${testCase.coins.join(', ')}], Amount: ${testCase.amount}, Expected: ${testCase.expected}`);
        
        methods.forEach(method => {
            try {
                const result = method.func(testCase.coins, testCase.amount);
                const passed = result === testCase.expected;
                console.log(`  ${method.name.padEnd(10)}: ${result.toString().padEnd(6)} ${passed ? '✓' : '✗'}`);
            } catch (error) {
                console.log(`  ${method.name.padEnd(10)}: ERROR`);
            }
        });
    });
}

/**
 * Algorithm Analysis and Recommendations
 */
function algorithmAnalysis(): void {
    console.log('\n=== Algorithm Analysis ===');
    console.log('1. DP Tabulation: Most reliable, straightforward to implement and understand');
    console.log('2. Memoization: Good for recursive thinking, same complexity as DP');
    console.log('3. BFS: Natural for "minimum steps" problems, easy to understand');
    console.log('4. Greedy+Backtrack: Can be faster with good pruning, complex to implement');
    console.log('5. Optimized DP: Best practical performance with small optimizations');
    console.log('\nRecommended: DP Tabulation for interviews, BFS for intuitive understanding');
    console.log('Key insight: Greedy doesn\'t work for general coin change (counterexample: [1,4,5] amount 8)');
}

// Run all tests and analysis
runAdvancedTests();
performanceComparison([1, 3, 4], 12);
performanceComparison([1, 5, 10, 25], 67);
algorithmAnalysis();

export { coinChangeDP, coinChangeMemo, coinChangeBFS, coinChangeGreedy, coinChangeOptimized };