// LeetCode 33: Search in Rotated Sorted Array (Medium) - Advanced Solutions

// Solution 1: Standard One-Pass Binary Search (Original optimized)
function search(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        
        if (nums[left] <= nums[mid]) { // Left half sorted
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else { // Right half sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

// Solution 2: Find Pivot + Binary Search
function searchWithPivot(nums: number[], target: number): number {
    const findPivot = (arr: number[]): number => {
        let left = 0, right = arr.length - 1;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] > arr[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    };
    
    const binarySearch = (arr: number[], target: number, start: number, end: number): number => {
        while (start <= end) {
            const mid = Math.floor((start + end) / 2);
            if (arr[mid] === target) return mid;
            if (arr[mid] < target) start = mid + 1;
            else end = mid - 1;
        }
        return -1;
    };
    
    const pivot = findPivot(nums);
    const result1 = binarySearch(nums, target, 0, pivot - 1);
    return result1 !== -1 ? result1 : binarySearch(nums, target, pivot, nums.length - 1);
}

// Solution 3: Recursive Approach
function searchRecursive(nums: number[], target: number): number {
    function searchHelper(left: number, right: number): number {
        if (left > right) return -1;
        
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                return searchHelper(left, mid - 1);
            } else {
                return searchHelper(mid + 1, right);
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                return searchHelper(mid + 1, right);
            } else {
                return searchHelper(left, mid - 1);
            }
        }
    }
    
    return searchHelper(0, nums.length - 1);
}

// Test cases
console.log("Solution 1:", search([4,5,6,7,0,1,2], 0)); // 4
console.log("Solution 2:", searchWithPivot([4,5,6,7,0,1,2], 3)); // -1
console.log("Solution 3:", searchRecursive([1], 1)); // 0