/**
 * 102. Binary Tree Level Order Traversal - Medium
 * 
 * Given the root of a binary tree, return the level order traversal of its nodes' values. 
 * (i.e., from left to right, level by level).
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function levelOrder(root: TreeNode | null): number[][] {
    // Advanced: BFS with queue and level tracking
    // Time: O(n), Space: O(w) where w is maximum width
    
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];
        
        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);
            
            // Add children for next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}

// Recursive approach with level tracking
function levelOrderRecursive(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    
    function dfs(node: TreeNode | null, level: number): void {
        if (!node) return;
        
        // Initialize level array if needed
        if (result.length === level) {
            result.push([]);
        }
        
        // Add current node to its level
        result[level].push(node.val);
        
        // Recursively process children
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }
    
    dfs(root, 0);
    return result;
}

// Two-queue approach (alternative BFS)
function levelOrderTwoQueues(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    let currentLevel: TreeNode[] = [root];
    
    while (currentLevel.length > 0) {
        const nextLevel: TreeNode[] = [];
        const levelValues: number[] = [];
        
        // Process current level
        for (const node of currentLevel) {
            levelValues.push(node.val);
            
            if (node.left) nextLevel.push(node.left);
            if (node.right) nextLevel.push(node.right);
        }
        
        result.push(levelValues);
        currentLevel = nextLevel;
    }
    
    return result;
}

// Using Map for level tracking
function levelOrderMap(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const levelMap = new Map<number, number[]>();
    const queue: Array<[TreeNode, number]> = [[root, 0]];
    
    while (queue.length > 0) {
        const [node, level] = queue.shift()!;
        
        // Initialize level array if needed
        if (!levelMap.has(level)) {
            levelMap.set(level, []);
        }
        
        levelMap.get(level)!.push(node.val);
        
        // Add children with incremented level
        if (node.left) queue.push([node.left, level + 1]);
        if (node.right) queue.push([node.right, level + 1]);
    }
    
    // Convert map to array
    const result: number[][] = [];
    for (let i = 0; i < levelMap.size; i++) {
        result.push(levelMap.get(i)!);
    }
    
    return result;
}

// Memory-optimized approach using generators
function* levelOrderGenerator(root: TreeNode | null): Generator<number[], void, unknown> {
    if (!root) return;
    
    let currentLevel: TreeNode[] = [root];
    
    while (currentLevel.length > 0) {
        const nextLevel: TreeNode[] = [];
        const levelValues: number[] = [];
        
        for (const node of currentLevel) {
            levelValues.push(node.val);
            
            if (node.left) nextLevel.push(node.left);
            if (node.right) nextLevel.push(node.right);
        }
        
        yield levelValues;
        currentLevel = nextLevel;
    }
}

function levelOrderFromGenerator(root: TreeNode | null): number[][] {
    return Array.from(levelOrderGenerator(root));
}

// Morris traversal inspired approach (space optimized)
function levelOrderMorris(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const nodes: Array<{node: TreeNode, level: number}> = [];
    
    // Collect all nodes with their levels using DFS
    function collectNodes(node: TreeNode | null, level: number): void {
        if (!node) return;
        
        nodes.push({node, level});
        collectNodes(node.left, level + 1);
        collectNodes(node.right, level + 1);
    }
    
    collectNodes(root, 0);
    
    // Group by levels
    let currentLevel = 0;
    let levelNodes: number[] = [];
    
    for (const {node, level} of nodes) {
        if (level !== currentLevel) {
            if (levelNodes.length > 0) {
                result.push(levelNodes);
            }
            levelNodes = [];
            currentLevel = level;
        }
        levelNodes.push(node.val);
    }
    
    if (levelNodes.length > 0) {
        result.push(levelNodes);
    }
    
    return result;
}

// Right-to-left traversal
function levelOrderRightToLeft(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);
            
            // Add right child first, then left (reverse of normal)
            if (node.right) queue.push(node.right);
            if (node.left) queue.push(node.left);
        }
        
        // Reverse the level to get left-to-right order
        result.push(currentLevel.reverse());
    }
    
    return result;
}

// Helper function to create binary tree from array
function createBinaryTree(arr: (number | null)[]): TreeNode | null {
    if (arr.length === 0 || arr[0] === null) return null;
    
    const root = new TreeNode(arr[0]!);
    const queue: TreeNode[] = [root];
    let i = 1;
    
    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift()!;
        
        // Left child
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]!);
            queue.push(node.left);
        }
        i++;
        
        // Right child
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]!);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

// Test cases
console.log("=== 102. Binary Tree Level Order Traversal Tests ===");

function testLevelOrder() {
    // Test case 1: [3,9,20,null,null,15,7]
    const root1 = createBinaryTree([3, 9, 20, null, null, 15, 7]);
    console.log("Test 1:", JSON.stringify(levelOrder(root1))); 
    // Expected: [[3],[9,20],[15,7]]
    
    // Test case 2: [1]
    const root2 = createBinaryTree([1]);
    console.log("Test 2:", JSON.stringify(levelOrder(root2))); 
    // Expected: [[1]]
    
    // Test case 3: []
    const root3 = createBinaryTree([]);
    console.log("Test 3:", JSON.stringify(levelOrder(root3))); 
    // Expected: []
    
    // Test case 4: Complete binary tree
    const root4 = createBinaryTree([1, 2, 3, 4, 5, 6, 7]);
    console.log("Test 4:", JSON.stringify(levelOrder(root4))); 
    // Expected: [[1],[2,3],[4,5,6,7]]
    
    // Test case 5: Left-skewed tree
    const root5 = createBinaryTree([1, 2, null, 3, null, null, null]);
    console.log("Test 5:", JSON.stringify(levelOrder(root5))); 
    // Expected: [[1],[2],[3]]
    
    // Test case 6: Right-skewed tree
    const root6 = createBinaryTree([1, null, 2, null, null, null, 3]);
    console.log("Test 6:", JSON.stringify(levelOrder(root6))); 
    // Expected: [[1],[2],[3]]
    
    // Test case 7: Large tree
    const root7 = createBinaryTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    console.log("Test 7:", JSON.stringify(levelOrder(root7))); 
    // Expected: [[1],[2,3],[4,5,6,7],[8,9,10,11,12,13,14,15]]
}

testLevelOrder();

// Performance comparison
console.log("\n=== Performance Comparison ===");

function performanceTest() {
    const testTrees = [
        createBinaryTree([3, 9, 20, null, null, 15, 7]),
        createBinaryTree([1, 2, 3, 4, 5, 6, 7]),
        createBinaryTree([1, 2, null, 3, null, null, null]),
        createBinaryTree([1, null, 2, null, null, null, 3])
    ];
    
    testTrees.forEach((root, i) => {
        console.log(`\nTest tree ${i + 1}:`);
        
        console.log(`BFS Queue: ${JSON.stringify(levelOrder(root))}`);
        console.log(`Recursive: ${JSON.stringify(levelOrderRecursive(root))}`);
        console.log(`Two Queues: ${JSON.stringify(levelOrderTwoQueues(root))}`);
        console.log(`Generator: ${JSON.stringify(levelOrderFromGenerator(root))}`);
    });
}

performanceTest();

// Memory usage analysis
console.log("\n=== Memory Usage Analysis ===");

function memoryTest() {
    // Create a large balanced tree
    const largeTreeArray = [];
    for (let i = 1; i <= 1023; i++) { // 10 levels, 2^10 - 1 = 1023 nodes
        largeTreeArray.push(i);
    }
    
    const largeTree = createBinaryTree(largeTreeArray);
    
    console.log("Large tree test (1023 nodes):");
    const result = levelOrder(largeTree);
    console.log(`Number of levels: ${result.length}`);
    console.log(`Last level size: ${result[result.length - 1].length}`);
    console.log(`Total nodes processed: ${result.flat().length}`);
}

memoryTest();