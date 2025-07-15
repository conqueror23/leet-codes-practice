# Dynamic Programming Problems

## Easy Problems
1. **Climbing Stairs** (#70) - Count ways to climb n stairs (1 or 2 steps at a time)
2. **House Robber** (#198) - Maximum money robbed from houses without robbing adjacent ones
3. **Min Cost Climbing Stairs** (#746) - Minimum cost to climb stairs with varying costs
4. **Maximum Subarray** (#53) - Find contiguous subarray with maximum sum (Kadane's Algorithm)
5. **Best Time to Buy and Sell Stock** (#121) - Maximum profit from buying and selling stock once
6. **Fibonacci Number** (#509) - Calculate nth Fibonacci number
7. **N-th Tribonacci Number** (#1137) - Calculate nth Tribonacci number
8. **Pascal's Triangle** (#118) - Generate Pascal's triangle

## Medium Problems
1. **Coin Change** (#322) - Minimum coins needed to make amount
2. **Longest Common Subsequence** (#1143) - Find LCS length between two strings
3. **Longest Increasing Subsequence** (#300) - Find LIS length in array
4. **Edit Distance** (#72) - Minimum operations to convert one string to another
5. **0-1 Knapsack** - Maximum value with weight constraint
6. **Unique Paths** (#62) - Count paths from top-left to bottom-right in grid
7. **Jump Game** (#55) - Determine if can reach last index
8. **Word Break** (#139) - Check if string can be segmented using dictionary
9. **Longest Palindromic Substring** (#5) - Find longest palindromic substring
10. **Partition Equal Subset Sum** (#416) - Check if array can be partitioned into equal sum subsets

## Hard Problems
1. **Regular Expression Matching** (#10) - Pattern matching with '.' and '*'
2. **Wildcard Matching** (#44) - Pattern matching with '?' and '*'
3. **Maximum Rectangle** (#85) - Largest rectangle area in binary matrix
4. **Burst Balloons** (#312) - Maximum coins from bursting balloons
5. **Russian Doll Envelopes** (#354) - Maximum nested envelopes
6. **Stone Game** (#877) - Optimal strategy game
7. **Palindrome Partitioning II** (#132) - Minimum cuts for palindrome partitioning

## Key DP Patterns
1. **Linear DP**: 1D problems (climbing stairs, house robber)
2. **Grid DP**: 2D problems (unique paths, minimum path sum)
3. **Interval DP**: Problems on ranges (palindromes, matrix chain)
4. **Tree DP**: DP on trees (binary tree problems)
5. **State Machine DP**: Multiple states (stock problems)
6. **Digit DP**: Problems involving digits
7. **Probability DP**: Expected value problems

## Problem-Solving Approach
1. **Identify subproblems**: Break into smaller overlapping subproblems
2. **Define state**: What parameters define a subproblem
3. **Write recurrence**: Relation between subproblems
4. **Handle base cases**: Smallest subproblems
5. **Optimize**: Memoization (top-down) or tabulation (bottom-up)