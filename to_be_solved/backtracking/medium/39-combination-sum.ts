// LeetCode 39: Combination Sum (Medium)
// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations where the chosen numbers sum to target.

function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    
    function backtrack(start: number, current: number[], sum: number) {
        if (sum === target) {
            result.push([...current]);
            return;
        }
        
        if (sum > target) return;
        
        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(i, current, sum + candidates[i]);
            current.pop();
        }
    }
    
    backtrack(0, [], 0);
    return result;
}

// Test cases
console.log(combinationSum([2,3,6,7], 7)); // [[2,2,3],[7]]
console.log(combinationSum([2,3,5], 8)); // [[2,2,2,2],[2,3,3],[3,5]]
console.log(combinationSum([2], 1)); // []