// LeetCode 1: Two Sum (Easy) - Advanced Solutions

// Solution 1: Hash Map One Pass (Most Optimal)
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}

// Solution 2: Two Pointers (Requires Sorted Array)
function twoSumTwoPointers(nums: number[], target: number): number[] {
    const indexed = nums.map((num, i) => [num, i]).sort((a, b) => a[0] - b[0]);
    let left = 0, right = indexed.length - 1;
    
    while (left < right) {
        const sum = indexed[left][0] + indexed[right][0];
        if (sum === target) {
            return [indexed[left][1], indexed[right][1]].sort((a, b) => a - b);
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];
}

// Solution 3: Brute Force (O(n²))
function twoSumBruteForce(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

// Test cases
console.log("HashMap:", twoSum([2,7,11,15], 9)); // [0,1]
console.log("Two Pointers:", twoSumTwoPointers([2,7,11,15], 9)); // [0,1]
console.log("Brute Force:", twoSumBruteForce([3,2,4], 6)); // [1,2]

// Time Complexity:
// Solution 1: O(n) time, O(n) space - Most optimal
// Solution 2: O(n log n) time, O(n) space - Due to sorting
// Solution 3: O(n²) time, O(1) space - Least efficient