// LeetCode 152: Maximum Product Subarray (Medium) - Advanced Solutions
// Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

// Solution 1: Two Variables Approach (Original optimized)
function maxProduct(nums: number[]): number {
    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const curr = nums[i];
        
        if (curr < 0) {
            [maxSoFar, minSoFar] = [minSoFar, maxSoFar];
        }
        
        maxSoFar = Math.max(curr, maxSoFar * curr);
        minSoFar = Math.min(curr, minSoFar * curr);
        
        result = Math.max(result, maxSoFar);
    }
    
    return result;
}

// Solution 2: Left-Right Pass Approach
function maxProductLeftRight(nums: number[]): number {
    let leftProduct = 1;
    let rightProduct = 1;
    let maxProduct = nums[0];
    const n = nums.length;
    
    for (let i = 0; i < n; i++) {
        // Left to right pass
        leftProduct = leftProduct === 0 ? nums[i] : leftProduct * nums[i];
        
        // Right to left pass
        rightProduct = rightProduct === 0 ? nums[n - 1 - i] : rightProduct * nums[n - 1 - i];
        
        // Update maximum
        maxProduct = Math.max(maxProduct, Math.max(leftProduct, rightProduct));
    }
    
    return maxProduct;
}

// Solution 3: Dynamic Programming with State Tracking
function maxProductDP(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    const dp: Array<{max: number, min: number}> = new Array(nums.length);
    dp[0] = { max: nums[0], min: nums[0] };
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const curr = nums[i];
        const prevMax = dp[i - 1].max;
        const prevMin = dp[i - 1].min;
        
        dp[i] = {
            max: Math.max(curr, Math.max(curr * prevMax, curr * prevMin)),
            min: Math.min(curr, Math.min(curr * prevMax, curr * prevMin))
        };
        
        result = Math.max(result, dp[i].max);
    }
    
    return result;
}

// Solution 4: Divide and Conquer
function maxProductDivideConquer(nums: number[]): number {
    return maxProductHelper(nums, 0, nums.length - 1);
}

function maxProductHelper(nums: number[], left: number, right: number): number {
    if (left === right) return nums[left];
    if (left > right) return -Infinity;
    
    // Check if there are zeros and handle them
    for (let i = left; i <= right; i++) {
        if (nums[i] === 0) {
            const leftMax = i > left ? maxProductHelper(nums, left, i - 1) : -Infinity;
            const rightMax = i < right ? maxProductHelper(nums, i + 1, right) : -Infinity;
            return Math.max(0, Math.max(leftMax, rightMax));
        }
    }
    
    // No zeros, calculate prefix and suffix products
    let prefixProduct = 1;
    let suffixProduct = 1;
    let maxProduct = nums[left];
    
    for (let i = left; i <= right; i++) {
        prefixProduct *= nums[i];
        suffixProduct *= nums[right - (i - left)];
        maxProduct = Math.max(maxProduct, Math.max(prefixProduct, suffixProduct));
    }
    
    return maxProduct;
}

// Solution 5: Brute Force with Optimizations
function maxProductBruteForce(nums: number[]): number {
    let maxProduct = nums[0];
    
    for (let i = 0; i < nums.length; i++) {
        let product = 1;
        
        for (let j = i; j < nums.length; j++) {
            product *= nums[j];
            maxProduct = Math.max(maxProduct, product);
            
            // Early termination if product becomes 0
            if (product === 0) break;
        }
    }
    
    return maxProduct;
}

// Solution 6: Segment-based Approach (Handle zeros explicitly)
function maxProductSegments(nums: number[]): number {
    const segments: number[][] = [];
    let currentSegment: number[] = [];
    
    // Split array by zeros
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            if (currentSegment.length > 0) {
                segments.push([...currentSegment]);
                currentSegment = [];
            }
        } else {
            currentSegment.push(nums[i]);
        }
    }
    
    if (currentSegment.length > 0) {
        segments.push(currentSegment);
    }
    
    let maxProduct = nums.includes(0) ? 0 : -Infinity;
    
    // Process each segment
    for (const segment of segments) {
        if (segment.length === 0) continue;
        
        const segmentMax = maxProductLeftRight(segment);
        maxProduct = Math.max(maxProduct, segmentMax);
    }
    
    return maxProduct;
}

// Solution 7: Mathematical Approach (Count negatives)
function maxProductMath(nums: number[]): number {
    let maxProduct = nums[0];
    let positiveProduct = 1;
    let negativeProduct = 1;
    let hasPositive = false;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            positiveProduct *= nums[i];
            negativeProduct *= nums[i];
            hasPositive = true;
        } else if (nums[i] < 0) {
            const temp = positiveProduct;
            positiveProduct = Math.max(nums[i], negativeProduct * nums[i]);
            negativeProduct = Math.min(nums[i], temp * nums[i]);
        } else { // nums[i] === 0
            positiveProduct = 1;
            negativeProduct = 1;
            maxProduct = Math.max(maxProduct, 0);
            continue;
        }
        
        maxProduct = Math.max(maxProduct, positiveProduct);
    }
    
    return maxProduct;
}

// Test cases
console.log("Solution 1 - Two Variables:");
console.log(maxProduct([2,3,-2,4])); // 6

console.log("\nSolution 2 - Left-Right Pass:");
console.log(maxProductLeftRight([2,3,-2,4])); // 6

console.log("\nSolution 3 - Dynamic Programming:");
console.log(maxProductDP([-2,0,-1])); // 0

console.log("\nSolution 4 - Divide and Conquer:");
console.log(maxProductDivideConquer([-2,3,-4])); // 24

console.log("\nSolution 6 - Segments:");
console.log(maxProductSegments([2,3,0,-2,-4])); // 8

// Edge cases
console.log("\nEdge Cases:");
console.log("Single negative:", maxProduct([-1])); // -1
console.log("All negatives:", maxProduct([-2,-3,-4])); // 12
console.log("With zeros:", maxProduct([0,2])); // 2
console.log("Mixed:", maxProduct([-1,-2,-9,-6])); // 108

// Performance comparison
const largeArray = Array.from({length: 10000}, () => Math.floor(Math.random() * 10) - 5);

console.log("\nPerformance comparison on large array (10000 elements):");
console.time("Two Variables");
maxProduct([...largeArray]);
console.timeEnd("Two Variables");

console.time("Left-Right Pass");
maxProductLeftRight([...largeArray]);
console.timeEnd("Left-Right Pass");

console.time("DP Approach");
maxProductDP([...largeArray]);
console.timeEnd("DP Approach");

// Time Complexity Analysis:
// Solution 1: O(n) time, O(1) space - Most optimal
// Solution 2: O(n) time, O(1) space - Alternative single pass
// Solution 3: O(n) time, O(n) space - DP with extra space
// Solution 4: O(n) time, O(log n) space - Divide and conquer
// Solution 5: O(n²) time, O(1) space - Brute force
// Solution 6: O(n) time, O(n) space - Segment processing
// Solution 7: O(n) time, O(1) space - Mathematical approach