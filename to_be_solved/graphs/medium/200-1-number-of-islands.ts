// LeetCode 200: Number of Islands (Medium) - Advanced Solutions

// Solution 1: DFS with Grid Modification (Original)
function numIslands(grid: string[][]): number {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length, cols = grid[0].length;
    let islands = 0;
    
    function dfs(row: number, col: number): void {
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] !== '1') return;
        
        grid[row][col] = '0';
        dfs(row + 1, col);
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row, col - 1);
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

// Solution 2: BFS Approach
function numIslandsBFS(grid: string[][]): number {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length, cols = grid[0].length;
    let islands = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                islands++;
                
                const queue: [number, number][] = [[row, col]];
                grid[row][col] = '0';
                
                while (queue.length > 0) {
                    const [r, c] = queue.shift()!;
                    
                    for (const [dr, dc] of directions) {
                        const nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
                            grid[nr][nc] = '0';
                            queue.push([nr, nc]);
                        }
                    }
                }
            }
        }
    }
    
    return islands;
}

// Solution 3: Union-Find
function numIslandsUnionFind(grid: string[][]): number {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length, cols = grid[0].length;
    
    class UnionFind {
        parent: number[];
        rank: number[];
        count: number;
        
        constructor(n: number) {
            this.parent = Array.from({length: n}, (_, i) => i);
            this.rank = new Array(n).fill(0);
            this.count = 0;
        }
        
        find(x: number): number {
            if (this.parent[x] !== x) {
                this.parent[x] = this.find(this.parent[x]);
            }
            return this.parent[x];
        }
        
        union(x: number, y: number): void {
            const rootX = this.find(x);
            const rootY = this.find(y);
            
            if (rootX !== rootY) {
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
    }
    
    const uf = new UnionFind(rows * cols);
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                uf.count++;
                
                for (const [dr, dc] of directions) {
                    const nr = row + dr, nc = col + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
                        uf.union(row * cols + col, nr * cols + nc);
                    }
                }
            }
        }
    }
    
    return uf.count;
}

// Solution 4: DFS without Grid Modification
function numIslandsPreserveGrid(grid: string[][]): number {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length, cols = grid[0].length;
    const visited = Array.from({length: rows}, () => new Array(cols).fill(false));
    let islands = 0;
    
    function dfs(row: number, col: number): void {
        if (row < 0 || row >= rows || col < 0 || col >= cols || 
            visited[row][col] || grid[row][col] !== '1') return;
        
        visited[row][col] = true;
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

// Test cases
const testGrid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
];

console.log("DFS (Original):", numIslands([...testGrid.map(row => [...row])])); // 1
console.log("BFS:", numIslandsBFS([...testGrid.map(row => [...row])])); // 1
console.log("Union-Find:", numIslandsUnionFind([...testGrid.map(row => [...row])])); // 1

// Time Complexity Analysis:
// Solution 1: O(m*n) time, O(m*n) space (recursion stack) - Modifies grid
// Solution 2: O(m*n) time, O(min(m,n)) space - BFS with queue
// Solution 3: O(m*n*α(m*n)) time, O(m*n) space - Union-Find with path compression
// Solution 4: O(m*n) time, O(m*n) space - DFS with separate visited array