// LeetCode 200: Number of Islands (Medium)
// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

function numIslands(grid: string[][]): number {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    
    function dfs(row: number, col: number): void {
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] !== '1') {
            return;
        }
        
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

// Test cases
console.log(numIslands([
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
])); // 1