/**
 * 84. Largest Rectangle in Histogram
 * Difficulty: Hard
 * 
 * Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, 
 * return the area of the largest rectangle in the histogram.
 * 
 * Example 1:
 * Input: heights = [2,1,5,6,2,3]
 * Output: 10
 * Explanation: The above is a histogram where width of each bar is 1.
 * The largest rectangle is shown in the red area, which has an area = 10 units.
 * 
 * Example 2:
 * Input: heights = [2,4]
 * Output: 4
 */

function largestRectangleArea(heights: number[]): number {
    const stack: number[] = [];
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const currentHeight = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()!];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
console.log(largestRectangleArea([2, 4]));
console.log(largestRectangleArea([1, 1]));
console.log(largestRectangleArea([2, 1, 2]));