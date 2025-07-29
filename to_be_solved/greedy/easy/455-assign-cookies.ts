/**
 * 455. Assign Cookies - Easy
 * 
 * Assume you are an awesome parent and want to give your children some cookies. 
 * But, you should give each child at most one cookie.
 * 
 * Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; 
 * and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, 
 * and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.
 */

function findContentChildren(g: number[], s: number[]): number {
    // Advanced solution: Greedy approach with sorting
    // Time: O(n log n + m log m), Space: O(1)
    g.sort((a, b) => a - b); // Sort greed factors ascending
    s.sort((a, b) => a - b); // Sort cookie sizes ascending
    
    let childIndex = 0;
    let cookieIndex = 0;
    let contentChildren = 0;
    
    // Two-pointer greedy assignment
    while (childIndex < g.length && cookieIndex < s.length) {
        if (s[cookieIndex] >= g[childIndex]) {
            // Cookie satisfies child's greed
            contentChildren++;
            childIndex++;
        }
        cookieIndex++; // Move to next cookie regardless
    }
    
    return contentChildren;
}

// Alternative: Counting approach for small value ranges
function findContentChildrenCounting(g: number[], s: number[]): number {
    // For when cookie sizes are in small range [1, 100000]
    const maxSize = Math.max(...s, ...g);
    const cookieCount = new Array(maxSize + 1).fill(0);
    
    // Count available cookies of each size
    for (const size of s) {
        cookieCount[size]++;
    }
    
    // Cumulative sum for prefix counting
    for (let i = 1; i <= maxSize; i++) {
        cookieCount[i] += cookieCount[i - 1];
    }
    
    g.sort((a, b) => a - b);
    let content = 0;
    
    for (const greed of g) {
        if (cookieCount[maxSize] - cookieCount[greed - 1] > 0) {
            content++;
            // Remove one cookie of size >= greed
            for (let i = greed; i <= maxSize; i++) {
                if (cookieCount[i] > cookieCount[i - 1]) {
                    cookieCount[i]--;
                    break;
                }
            }
        }
    }
    
    return content;
}

// Test cases
console.log("=== 455. Assign Cookies Tests ===");
console.log(findContentChildren([1,2,3], [1,1])); // Expected: 1
console.log(findContentChildren([1,2], [1,2,3])); // Expected: 2
console.log(findContentChildren([1,2,7,8,9], [1,3,5,9,10])); // Expected: 4
console.log(findContentChildren([10,9,8,7], [5,6,7,8])); // Expected: 2

// Edge cases
console.log(findContentChildren([], [1,2,3])); // Expected: 0
console.log(findContentChildren([1,2,3], [])); // Expected: 0
console.log(findContentChildren([5], [1,2,3])); // Expected: 0
console.log(findContentChildren([1], [5])); // Expected: 1