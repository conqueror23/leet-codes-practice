// LeetCode 200: Number of Islands (Medium) - Advanced Solutions
// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), 
// return the number of islands. An island is surrounded by water and is formed by connecting 
// adjacent lands horizontally or vertically.

/**
 * APPROACH 1: DFS with Grid Modification
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) worst case for call stack
 * Best for: Simple implementation, modifies input (not always desirable)
 */
function numIslandsDFS(grid: string[][]): number {
    if (!grid || grid.length === 0 || grid[0].length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    
    function dfs(row: number, col: number): void {
        // Boundary check and water check
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] !== '1') {
            return;
        }
        
        // Mark as visited by changing to water
        grid[row][col] = '0';
        
        // Explore all 4 directions
        dfs(row + 1, col); // down
        dfs(row - 1, col); // up
        dfs(row, col + 1); // right
        dfs(row, col - 1); // left
    }
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                islands++;
                dfs(row, col);
            }
        }
    }
    
    return islands;
}

/**
 * APPROACH 2: DFS with Visited Array (Non-destructive)
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) for visited array + call stack
 * Best for: When you need to preserve original grid
 */
function numIslandsDFSNonDestructive(grid: string[][]): number {
    if (!grid || grid.length === 0 || grid[0].length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
    let islands = 0;
    
    function dfs(row: number, col: number): void {
        if (row < 0 || row >= rows || col < 0 || col >= cols || 
            visited[row][col] || grid[row][col] !== '1') {
            return;
        }
        
        visited[row][col] = true;
        
        // Explore all 4 directions
        dfs(row + 1, col);
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row, col - 1);
    }
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1' && !visited[row][col]) {
                islands++;
                dfs(row, col);
            }
        }
    }
    
    return islands;
}

/**
 * APPROACH 3: BFS (Level-order exploration)
 * Time Complexity: O(m * n)
 * Space Complexity: O(min(m, n)) for queue in best case, O(m * n) worst case
 * Best for: Iterative approach, better for very deep grids (avoids stack overflow)
 */
function numIslandsBFS(grid: string[][]): number {
    if (!grid || grid.length === 0 || grid[0].length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                islands++;
                
                // BFS to mark all connected land
                const queue: [number, number][] = [[row, col]];
                grid[row][col] = '0'; // Mark as visited
                
                while (queue.length > 0) {
                    const [currentRow, currentCol] = queue.shift()!;
                    
                    for (const [dr, dc] of directions) {
                        const newRow = currentRow + dr;
                        const newCol = currentCol + dc;
                        
                        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && 
                            grid[newRow][newCol] === '1') {
                            grid[newRow][newCol] = '0'; // Mark as visited
                            queue.push([newRow, newCol]);
                        }
                    }
                }
            }
        }
    }
    
    return islands;
}

/**
 * APPROACH 4: Union-Find (Disjoint Set Union)
 * Time Complexity: O(m * n * α(m * n)) where α is inverse Ackermann function
 * Space Complexity: O(m * n)
 * Best for: When you need to track connected components dynamically
 */
class UnionFind {
    private parent: number[];
    private rank: number[];
    private count: number;
    
    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.count = 0;
    }
    
    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            // Union by rank
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            this.count--;
        }
    }
    
    setCount(count: number): void {
        this.count = count;
    }
    
    getCount(): number {
        return this.count;
    }
}

function numIslandsUnionFind(grid: string[][]): number {
    if (!grid || grid.length === 0 || grid[0].length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    const uf = new UnionFind(rows * cols);
    
    let landCount = 0;
    
    // Count total land cells and perform union operations
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                landCount++;
                
                // Check adjacent cells (right and down only to avoid duplicates)
                const currentIndex = row * cols + col;
                
                // Check right
                if (col + 1 < cols && grid[row][col + 1] === '1') {
                    uf.union(currentIndex, currentIndex + 1);
                }
                
                // Check down
                if (row + 1 < rows && grid[row + 1][col] === '1') {
                    uf.union(currentIndex, currentIndex + cols);
                }
            }
        }
    }
    
    uf.setCount(landCount);
    return uf.getCount();
}

/**
 * APPROACH 5: Iterative DFS with Stack
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) for stack in worst case
 * Best for: Avoiding recursion stack overflow, explicit control of traversal
 */
function numIslandsIterativeDFS(grid: string[][]): number {
    if (!grid || grid.length === 0 || grid[0].length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                islands++;
                
                // Iterative DFS using stack
                const stack: [number, number][] = [[row, col]];
                grid[row][col] = '0'; // Mark as visited
                
                while (stack.length > 0) {
                    const [currentRow, currentCol] = stack.pop()!;
                    
                    for (const [dr, dc] of directions) {
                        const newRow = currentRow + dr;
                        const newCol = currentCol + dc;
                        
                        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && 
                            grid[newRow][newCol] === '1') {
                            grid[newRow][newCol] = '0'; // Mark as visited
                            stack.push([newRow, newCol]);
                        }
                    }
                }
            }
        }
    }
    
    return islands;
}

/**
 * Utility function to create test grids
 */
function createGrid(gridStr: string[][]): string[][] {
    return gridStr.map(row => [...row]); // Deep copy
}

/**
 * Performance Comparison Function
 */
function performanceComparison(originalGrid: string[][]): void {
    console.log(`\n=== Number of Islands Performance Comparison ===`);
    console.log(`Grid size: ${originalGrid.length} x ${originalGrid[0]?.length || 0}`);
    
    const methods = [
        { name: 'DFS Destructive', func: numIslandsDFS, complexity: 'O(mn) time, O(mn) space' },
        { name: 'DFS Non-Destructive', func: numIslandsDFSNonDestructive, complexity: 'O(mn) time, O(mn) space' },
        { name: 'BFS', func: numIslandsBFS, complexity: 'O(mn) time, O(min(m,n)) space' },
        { name: 'Union-Find', func: numIslandsUnionFind, complexity: 'O(mn⋅α(mn)) time, O(mn) space' },
        { name: 'Iterative DFS', func: numIslandsIterativeDFS, complexity: 'O(mn) time, O(mn) space' }
    ];
    
    methods.forEach(method => {
        const testGrid = createGrid(originalGrid);
        const start = performance.now();
        const result = method.func(testGrid);
        const end = performance.now();
        
        console.log(`${method.name.padEnd(18)}: ${result.toString().padEnd(6)} | ${(end - start).toFixed(4)}ms | ${method.complexity}`);
    });
}

/**
 * Advanced Test Cases
 */
function runAdvancedTests(): void {
    console.log('=== Number of Islands Advanced Test Cases ===');
    
    const testCases = [
        {
            grid: [
                ["1","1","1","1","0"],
                ["1","1","0","1","0"],
                ["1","1","0","0","0"],
                ["0","0","0","0","0"]
            ],
            expected: 1,
            description: 'Single large island with holes'
        },
        {
            grid: [
                ["1","1","0","0","0"],
                ["1","1","0","0","0"],
                ["0","0","1","0","0"],
                ["0","0","0","1","1"]
            ],
            expected: 3,
            description: 'Multiple separate islands'
        },
        {
            grid: [["0"]],
            expected: 0,
            description: 'Single cell with water'
        },
        {
            grid: [["1"]],
            expected: 1,
            description: 'Single cell with land'
        },
        {
            grid: [
                ["1","0","1"],
                ["0","1","0"],
                ["1","0","1"]
            ],
            expected: 5,
            description: 'Checkerboard pattern'
        },
        {
            grid: [
                ["1","1","1"],
                ["1","0","1"],
                ["1","1","1"]
            ],
            expected: 1,
            description: 'Island with hole in middle'
        },
        {
            grid: [
                ["0","0","0"],
                ["0","0","0"],
                ["0","0","0"]
            ],
            expected: 0,
            description: 'All water'
        },
        {
            grid: [
                ["1","1","1"],
                ["1","1","1"],
                ["1","1","1"]
            ],
            expected: 1,
            description: 'All land'
        }
    ];
    
    const methods = [
        { name: 'DFS-D', func: numIslandsDFS },
        { name: 'DFS-ND', func: numIslandsDFSNonDestructive },
        { name: 'BFS', func: numIslandsBFS },
        { name: 'UnionFind', func: numIslandsUnionFind },
        { name: 'Iter-DFS', func: numIslandsIterativeDFS }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Grid: ${testCase.grid.length}x${testCase.grid[0]?.length || 0}, Expected: ${testCase.expected}`);
        
        methods.forEach(method => {
            const testGrid = createGrid(testCase.grid);
            const result = method.func(testGrid);
            const passed = result === testCase.expected;
            console.log(`  ${method.name.padEnd(10)}: ${result} ${passed ? '✓' : '✗'}`);
        });
    });
}

/**
 * Algorithm Analysis
 */
function algorithmAnalysis(): void {
    console.log('\n=== Algorithm Analysis ===');
    console.log('PROBLEM PATTERN: Connected Components in 2D Grid');
    console.log('');
    console.log('APPROACH COMPARISON:');
    console.log('1. DFS (Destructive): Fastest, simplest, but modifies input');
    console.log('2. DFS (Non-Destructive): Preserves input, extra space for visited array');
    console.log('3. BFS: Better for wide grids, avoids deep recursion, queue-based');
    console.log('4. Union-Find: Overkill for this problem, but useful for dynamic connectivity');
    console.log('5. Iterative DFS: Avoids recursion stack, explicit control');
    console.log('');
    console.log('KEY INSIGHTS:');
    console.log('- All approaches have O(mn) time complexity (each cell visited once)');
    console.log('- Space complexity varies: BFS can be O(min(m,n)) in best case');
    console.log('- DFS might cause stack overflow on very deep grids');
    console.log('- Union-Find provides additional query capabilities');
    console.log('');
    console.log('RECOMMENDED: BFS for general use, DFS for simplicity if input modification is OK');
}

/**
 * Extensions and Variations
 */
function extensionsAndVariations(): void {
    console.log('\n=== Extensions and Variations ===');
    console.log('1. Count island sizes: Modify to return array of island sizes');
    console.log('2. Largest island: Find the area of the largest island');
    console.log('3. Perimeter calculation: Calculate total perimeter of all islands');
    console.log('4. 8-directional connectivity: Include diagonal connections');
    console.log('5. Dynamic updates: Add/remove land and maintain island count');
    console.log('6. Multi-level terrain: Handle different elevation levels');
    console.log('7. Weighted islands: Islands with different values/types');
    console.log('8. Minimum bridge length: Find shortest bridge between islands');
}

// Run all tests and analysis
runAdvancedTests();
performanceComparison([
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
]);
algorithmAnalysis();
extensionsAndVariations();

export { 
    numIslandsDFS, 
    numIslandsDFSNonDestructive, 
    numIslandsBFS, 
    numIslandsUnionFind, 
    numIslandsIterativeDFS 
};