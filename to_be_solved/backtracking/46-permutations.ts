// LeetCode 46: Permutations
// Given an array nums of distinct integers, return all the possible permutations.

function permute(nums: number[]): number[][] {
    const result: number[][] = [];
    
    function backtrack(current: number[]) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (current.includes(nums[i])) continue;
            
            current.push(nums[i]);
            backtrack(current);
            current.pop();
        }
    }
    
    backtrack([]);
    return result;
}

// Test cases
console.log(permute([1, 2, 3])); // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log(permute([0, 1])); // [[0,1],[1,0]]
console.log(permute([1])); // [[1]]