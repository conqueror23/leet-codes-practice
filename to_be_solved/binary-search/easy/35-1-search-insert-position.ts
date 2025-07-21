// LeetCode 35: Search Insert Position (Easy) - Advanced Solutions
// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

// Solution 1: Standard Binary Search (Original optimized)
function searchInsert(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left;
}

// Solution 2: Lower Bound Binary Search
function searchInsertLowerBound(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Solution 3: Recursive Binary Search
function searchInsertRecursive(nums: number[], target: number): number {
    function binarySearch(left: number, right: number): number {
        if (left > right) {
            return left;
        }
        
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            return binarySearch(mid + 1, right);
        } else {
            return binarySearch(left, mid - 1);
        }
    }
    
    return binarySearch(0, nums.length - 1);
}

// Solution 4: Linear Search (O(n) approach for comparison)
function searchInsertLinear(nums: number[], target: number): number {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= target) {
            return i;
        }
    }
    return nums.length;
}

// Solution 5: Built-in Binary Search with Custom Comparator
function searchInsertBuiltIn(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length;
    
    // Using binary search to find the leftmost position where target can be inserted
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Solution 6: Exponential Search + Binary Search (for very large arrays)
function searchInsertExponential(nums: number[], target: number): number {
    const n = nums.length;
    
    // Handle edge cases
    if (n === 0 || target <= nums[0]) return 0;
    if (target > nums[n - 1]) return n;
    
    // Find range for binary search using exponential search
    let i = 1;
    while (i < n && nums[i] < target) {
        i *= 2;
    }
    
    // Binary search in the found range
    let left = Math.floor(i / 2);
    let right = Math.min(i, n - 1);
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left;
}

// Solution 7: Jump Search + Binary Search
function searchInsertJump(nums: number[], target: number): number {
    const n = nums.length;
    if (n === 0) return 0;
    
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    // Find the block where target should be
    while (prev < n && nums[Math.min(step, n) - 1] < target) {
        prev = step;
        if (prev >= n) return n;
    }
    
    // Binary search in the identified block
    let left = Math.max(0, prev - step);
    let right = Math.min(prev, n - 1);
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left;
}

// Solution 8: Interpolation Search (for uniformly distributed data)
function searchInsertInterpolation(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right && target >= nums[left] && target <= nums[right]) {
        if (left === right) {
            if (nums[left] === target) return left;
            return nums[left] < target ? left + 1 : left;
        }
        
        // Interpolation formula
        const pos = left + Math.floor(
            ((target - nums[left]) * (right - left)) / 
            (nums[right] - nums[left])
        );
        
        if (nums[pos] === target) {
            return pos;
        } else if (nums[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    // Fallback to binary search if interpolation doesn't work
    return searchInsert(nums, target);
}

// Solution 9: Ternary Search (divide into 3 parts)
function searchInsertTernary(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);
        
        if (nums[mid1] === target) return mid1;
        if (nums[mid2] === target) return mid2;
        
        if (target < nums[mid1]) {
            right = mid1 - 1;
        } else if (target > nums[mid2]) {
            left = mid2 + 1;
        } else {
            left = mid1 + 1;
            right = mid2 - 1;
        }
    }
    
    return left;
}

// Test cases
console.log("Solution 1 - Standard Binary Search:");
console.log(searchInsert([1,3,5,6], 5)); // 2
console.log(searchInsert([1,3,5,6], 2)); // 1
console.log(searchInsert([1,3,5,6], 7)); // 4

console.log("\nSolution 2 - Lower Bound:");
console.log(searchInsertLowerBound([1,3,5,6], 5)); // 2
console.log(searchInsertLowerBound([1,3,5,6], 2)); // 1

console.log("\nSolution 3 - Recursive:");
console.log(searchInsertRecursive([1,3,5,6], 5)); // 2
console.log(searchInsertRecursive([1,3,5,6], 2)); // 1

console.log("\nSolution 4 - Linear Search:");
console.log(searchInsertLinear([1,3,5,6], 5)); // 2
console.log(searchInsertLinear([1,3,5,6], 7)); // 4

console.log("\nSolution 6 - Exponential Search:");
console.log(searchInsertExponential([1,3,5,6], 5)); // 2
console.log(searchInsertExponential([1,3,5,6], 2)); // 1

// Edge cases
console.log("\nEdge Cases:");
console.log("Empty array:", searchInsert([], 1)); // 0
console.log("Insert at beginning:", searchInsert([2,3,4], 1)); // 0
console.log("Insert at end:", searchInsert([1,2,3], 4)); // 3
console.log("Single element - found:", searchInsert([1], 1)); // 0
console.log("Single element - not found:", searchInsert([1], 2)); // 1

// Performance comparison
const largeArray = Array.from({length: 100000}, (_, i) => i * 2);
const target = 50000;

console.log("\nPerformance comparison on large array (100k elements):");
console.time("Standard Binary Search");
for (let i = 0; i < 1000; i++) {
    searchInsert(largeArray, target);
}
console.timeEnd("Standard Binary Search");

console.time("Lower Bound Search");
for (let i = 0; i < 1000; i++) {
    searchInsertLowerBound(largeArray, target);
}
console.timeEnd("Lower Bound Search");

console.time("Exponential Search");
for (let i = 0; i < 1000; i++) {
    searchInsertExponential(largeArray, target);
}
console.timeEnd("Exponential Search");

console.time("Linear Search");
for (let i = 0; i < 100; i++) { // Fewer iterations due to O(n) complexity
    searchInsertLinear(largeArray.slice(0, 1000), target); // Smaller array
}
console.timeEnd("Linear Search");

// Time Complexity Analysis:
// Solution 1: O(log n) time, O(1) space - Standard binary search, most common
// Solution 2: O(log n) time, O(1) space - Lower bound approach, cleaner implementation
// Solution 3: O(log n) time, O(log n) space - Recursive approach with call stack
// Solution 4: O(n) time, O(1) space - Linear search, simple but inefficient for large arrays
// Solution 5: O(log n) time, O(1) space - Alternative binary search implementation
// Solution 6: O(log n) time, O(1) space - Exponential search, good for unbounded/very large arrays
// Solution 7: O(√n + log √n) time, O(1) space - Jump search hybrid
// Solution 8: O(log log n) time, O(1) space - Interpolation search (best case for uniform data)
// Solution 9: O(log₃ n) time, O(1) space - Ternary search, slightly more comparisons per iteration

// Best Practices:
// - Use Solution 1 or 2 for most cases (clean, efficient, well-understood)
// - Use Solution 6 for very large arrays where you don't know the size beforehand
// - Use Solution 8 for uniformly distributed data
// - Avoid Solution 4 for large datasets due to O(n) complexity