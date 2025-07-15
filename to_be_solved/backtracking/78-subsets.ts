// LeetCode 78: Subsets
// Given an integer array nums of unique elements, return all possible subsets (the power set).

function subsets(nums: number[]): number[][] {
    const result: number[][] = [];
    
    function backtrack(start: number, current: number[]) {
        result.push([...current]);
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}

// Test cases
console.log(subsets([1, 2, 3])); // [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
console.log(subsets([0])); // [[],[0]]
console.log(subsets([1, 2])); // [[],[1],[2],[1,2]]