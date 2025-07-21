// LeetCode 39: Combination Sum (Medium) - Advanced Solutions
// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations where the chosen numbers sum to target.

// Solution 1: Optimized Backtracking with Early Pruning
function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    candidates.sort((a, b) => a - b);
    
    function backtrack(start: number, current: number[], remaining: number) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate > remaining) break;
            
            current.push(candidate);
            backtrack(i, current, remaining - candidate);
            current.pop();
        }
    }
    
    backtrack(0, [], target);
    return result;
}

// Solution 2: Iterative Approach using Stack
function combinationSumIterative(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    const stack: Array<{index: number, path: number[], remaining: number}> = [];
    
    candidates.sort((a, b) => a - b);
    stack.push({index: 0, path: [], remaining: target});
    
    while (stack.length > 0) {
        const {index, path, remaining} = stack.pop()!;
        
        if (remaining === 0) {
            result.push([...path]);
            continue;
        }
        
        for (let i = index; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate > remaining) break;
            
            stack.push({
                index: i,
                path: [...path, candidate],
                remaining: remaining - candidate
            });
        }
    }
    
    return result;
}

// Solution 3: Dynamic Programming Approach
function combinationSumDP(candidates: number[], target: number): number[][] {
    const dp: number[][][] = new Array(target + 1).fill(null).map(() => []);
    dp[0] = [[]];
    
    for (const candidate of candidates) {
        for (let sum = candidate; sum <= target; sum++) {
            for (const combination of dp[sum - candidate]) {
                dp[sum].push([...combination, candidate]);
            }
        }
    }
    
    return dp[target];
}

// Solution 4: Memoized Backtracking
function combinationSumMemo(candidates: number[], target: number): number[][] {
    const memo = new Map<string, number[][]>();
    candidates.sort((a, b) => a - b);
    
    function backtrack(start: number, remaining: number): number[][] {
        const key = `${start}-${remaining}`;
        if (memo.has(key)) return memo.get(key)!;
        
        if (remaining === 0) return [[]];
        
        const result: number[][] = [];
        for (let i = start; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate > remaining) break;
            
            const subResults = backtrack(i, remaining - candidate);
            for (const subResult of subResults) {
                result.push([candidate, ...subResult]);
            }
        }
        
        memo.set(key, result);
        return result;
    }
    
    return backtrack(0, target);
}

// Test cases
console.log("Basic backtracking:");
console.log(combinationSum([2,3,6,7], 7)); // [[2,2,3],[7]]
console.log(combinationSum([2,3,5], 8)); // [[2,2,2,2],[2,3,3],[3,5]]

console.log("\nIterative approach:");
console.log(combinationSumIterative([2,3,6,7], 7)); // [[2,2,3],[7]]

console.log("\nDP approach:");
console.log(combinationSumDP([2,3,6,7], 7)); // [[2,2,3],[7]]

console.log("\nMemoized approach:");
console.log(combinationSumMemo([2,3,6,7], 7)); // [[2,2,3],[7]]

// Performance comparison for large inputs
const largeCandidates = [2, 3, 5, 7, 11, 13];
const largeTarget = 30;

console.log("\nPerformance test (target=30):");
console.time("Backtracking");
const result1 = combinationSum(largeCandidates, largeTarget);
console.timeEnd("Backtracking");
console.log(`Found ${result1.length} combinations`);

console.time("Memoized");
const result2 = combinationSumMemo(largeCandidates, largeTarget);
console.timeEnd("Memoized");
console.log(`Found ${result2.length} combinations`);