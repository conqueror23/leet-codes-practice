// LeetCode 15: 3Sum (Medium) - Advanced Solutions
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Solution 1: Optimized Two Pointers (Original but cleaner)
function threeSum(nums: number[]): number[][] {
    if (nums.length < 3) return [];
    
    const result: number[][] = [];
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        if (nums[i] > 0) break; // Early termination
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

// Solution 2: HashMap Approach
function threeSumHashMap(nums: number[]): number[][] {
    const result: number[][] = [];
    const seen = new Set<string>();
    
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        const targetSum = -nums[i];
        const map = new Map<number, number>();
        
        for (let j = i + 1; j < nums.length; j++) {
            const complement = targetSum - nums[j];
            
            if (map.has(complement)) {
                const triplet = [nums[i], complement, nums[j]].sort((a, b) => a - b);
                const tripletKey = triplet.join(',');
                
                if (!seen.has(tripletKey)) {
                    seen.add(tripletKey);
                    result.push(triplet);
                }
            }
            map.set(nums[j], j);
        }
    }
    
    return result;
}

// Solution 3: No Sort Approach (Using Set)
function threeSumNoSort(nums: number[]): number[][] {
    const result: number[][] = [];
    const seen = new Set<string>();
    const duplicates = new Set<number>();
    
    for (let i = 0; i < nums.length; i++) {
        if (duplicates.has(nums[i])) continue;
        duplicates.add(nums[i]);
        
        const complement = new Set<number>();
        
        for (let j = i + 1; j < nums.length; j++) {
            const target = 0 - nums[i] - nums[j];
            
            if (complement.has(target)) {
                const triplet = [nums[i], nums[j], target].sort((a, b) => a - b);
                const tripletKey = triplet.join(',');
                
                if (!seen.has(tripletKey)) {
                    seen.add(tripletKey);
                    result.push(triplet);
                }
            }
            complement.add(nums[j]);
        }
    }
    
    return result;
}

// Solution 4: Divide and Conquer
function threeSumDivideConquer(nums: number[]): number[][] {
    if (nums.length < 3) return [];
    
    nums.sort((a, b) => a - b);
    return threeSumHelper(nums, 0, nums.length - 1);
}

function threeSumHelper(nums: number[], start: number, end: number): number[][] {
    const result: number[][] = [];
    const length = end - start + 1;
    
    if (length < 3) return result;
    
    if (length <= 100) { // Base case: use two pointers
        for (let i = start; i <= end - 2; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;
            
            let left = i + 1;
            let right = end;
            
            while (left < right) {
                const sum = nums[i] + nums[left] + nums[right];
                
                if (sum === 0) {
                    result.push([nums[i], nums[left], nums[right]]);
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
    
    // Divide
    const mid = Math.floor((start + end) / 2);
    const leftResult = threeSumHelper(nums, start, mid);
    const rightResult = threeSumHelper(nums, mid + 1, end);
    
    // Merge results
    result.push(...leftResult, ...rightResult);
    
    // Find triplets that span both halves
    for (let i = start; i <= mid; i++) {
        if (i > start && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = end;
        
        while (left <= mid && right > mid) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left <= mid && nums[left] === nums[left + 1]) left++;
                while (right > mid && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

// Solution 5: Iterative Deepening
function threeSumIterativeDeepening(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];
    const seen = new Set<string>();
    
    // Try different ranges to find solutions
    for (let maxDepth = 1; maxDepth <= nums.length; maxDepth++) {
        for (let i = 0; i < Math.min(maxDepth, nums.length - 2); i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;
            
            let left = i + 1;
            let right = Math.min(maxDepth - 1, nums.length - 1);
            
            while (left < right) {
                const sum = nums[i] + nums[left] + nums[right];
                
                if (sum === 0) {
                    const tripletKey = [nums[i], nums[left], nums[right]].join(',');
                    if (!seen.has(tripletKey)) {
                        seen.add(tripletKey);
                        result.push([nums[i], nums[left], nums[right]]);
                    }
                }
                
                if (sum <= 0) left++;
                else right--;
            }
        }
    }
    
    return result;
}

// Test cases
console.log("Solution 1 - Optimized Two Pointers:");
console.log(threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]

console.log("\nSolution 2 - HashMap Approach:");
console.log(threeSumHashMap([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]

console.log("\nSolution 3 - No Sort Approach:");
console.log(threeSumNoSort([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]

console.log("\nSolution 4 - Divide and Conquer:");
console.log(threeSumDivideConquer([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]

// Performance test
const largeArray = Array.from({length: 1000}, () => Math.floor(Math.random() * 200) - 100);

console.log("\nPerformance comparison on large array (1000 elements):");
console.time("Two Pointers");
threeSum([...largeArray]);
console.timeEnd("Two Pointers");

console.time("HashMap");
threeSumHashMap([...largeArray]);
console.timeEnd("HashMap");

// Time Complexity Analysis:
// Solution 1: O(n²) time, O(1) space - Most optimal
// Solution 2: O(n²) time, O(n) space - HashMap approach
// Solution 3: O(n²) time, O(n) space - No sorting but uses sets
// Solution 4: O(n²log n) time, O(log n) space - Divide and conquer with overhead
// Solution 5: O(n³) time, O(n) space - Iterative deepening (less optimal)