// LeetCode 51: N-Queens (Hard) - Advanced Solutions
// The n-queens puzzle is the problem of placing n chess queens on an n×n chessboard so that no two queens attack each other.

// Solution 1: Optimized Backtracking with Sets (Original optimized)
function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const cols = new Set<number>();
    const diag1 = new Set<number>(); // row - col
    const diag2 = new Set<number>(); // row + col
    const board: number[] = new Array(n); // Store column position for each row
    
    function backtrack(row: number) {
        if (row === n) {
            result.push(createBoard(board, n));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }
            
            // Place queen
            board[row] = col;
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            backtrack(row + 1);
            
            // Remove queen
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }
    
    backtrack(0);
    return result;
}

function createBoard(board: number[], n: number): string[] {
    const result: string[] = [];
    for (let row = 0; row < n; row++) {
        const line = '.'.repeat(board[row]) + 'Q' + '.'.repeat(n - board[row] - 1);
        result.push(line);
    }
    return result;
}

// Solution 2: Bit Manipulation Approach
function solveNQueensBitwise(n: number): string[][] {
    const result: string[][] = [];
    const solutions: number[] = [];
    
    function backtrack(row: number, cols: number, diag1: number, diag2: number) {
        if (row === n) {
            result.push(createBoardFromSolution(solutions, n));
            return;
        }
        
        // Available positions: positions not attacked by previous queens
        let availablePositions = (~(cols | diag1 | diag2)) & ((1 << n) - 1);
        
        while (availablePositions !== 0) {
            // Get the rightmost available position
            const position = availablePositions & (-availablePositions);
            const col = Math.log2(position);
            
            solutions[row] = col;
            
            backtrack(
                row + 1,
                cols | position,
                (diag1 | position) << 1,
                (diag2 | position) >> 1
            );
            
            // Remove the rightmost bit
            availablePositions &= availablePositions - 1;
        }
    }
    
    backtrack(0, 0, 0, 0);
    return result;
}

function createBoardFromSolution(solution: number[], n: number): string[] {
    const board: string[] = [];
    for (let row = 0; row < n; row++) {
        const line = '.'.repeat(solution[row]) + 'Q' + '.'.repeat(n - solution[row] - 1);
        board.push(line);
    }
    return board;
}

// Solution 3: Iterative Approach using Stack
function solveNQueensIterative(n: number): string[][] {
    const result: string[][] = [];
    const stack: Array<{row: number, cols: Set<number>, diag1: Set<number>, diag2: Set<number>, board: number[]}> = [];
    
    stack.push({
        row: 0,
        cols: new Set(),
        diag1: new Set(),
        diag2: new Set(),
        board: new Array(n)
    });
    
    while (stack.length > 0) {
        const {row, cols, diag1, diag2, board} = stack.pop()!;
        
        if (row === n) {
            result.push(createBoard([...board], n));
            continue;
        }
        
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }
            
            const newBoard = [...board];
            newBoard[row] = col;
            
            stack.push({
                row: row + 1,
                cols: new Set([...cols, col]),
                diag1: new Set([...diag1, row - col]),
                diag2: new Set([...diag2, row + col]),
                board: newBoard
            });
        }
    }
    
    return result;
}

// Solution 4: Permutation-based Approach
function solveNQueensPermutation(n: number): string[][] {
    const result: string[][] = [];
    const permutation: number[] = Array.from({length: n}, (_, i) => i);
    
    function isValidQueenPlacement(positions: number[]): boolean {
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                // Check if queens are on same diagonal
                if (Math.abs(positions[i] - positions[j]) === Math.abs(i - j)) {
                    return false;
                }
            }
        }
        return true;
    }
    
    function generatePermutations(arr: number[], start: number) {
        if (start === arr.length) {
            if (isValidQueenPlacement(arr)) {
                result.push(createBoard([...arr], n));
            }
            return;
        }
        
        for (let i = start; i < arr.length; i++) {
            [arr[start], arr[i]] = [arr[i], arr[start]];
            generatePermutations(arr, start + 1);
            [arr[start], arr[i]] = [arr[i], arr[start]]; // backtrack
        }
    }
    
    generatePermutations(permutation, 0);
    return result;
}

// Solution 5: Dynamic Programming with Memoization
function solveNQueensMemo(n: number): string[][] {
    const result: string[][] = [];
    const memo = new Map<string, boolean>();
    
    function canPlace(board: number[], row: number, col: number): boolean {
        const key = `${board.slice(0, row).join(',')}-${row}-${col}`;
        if (memo.has(key)) return memo.get(key)!;
        
        for (let i = 0; i < row; i++) {
            if (board[i] === col || 
                Math.abs(board[i] - col) === Math.abs(i - row)) {
                memo.set(key, false);
                return false;
            }
        }
        
        memo.set(key, true);
        return true;
    }
    
    function solve(board: number[], row: number) {
        if (row === n) {
            result.push(createBoard([...board], n));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (canPlace(board, row, col)) {
                board[row] = col;
                solve(board, row + 1);
            }
        }
    }
    
    solve(new Array(n), 0);
    return result;
}

// Solution 6: Constraint Satisfaction with Forward Checking
function solveNQueensCSP(n: number): string[][] {
    const result: string[][] = [];
    
    function getDomain(board: number[], row: number): number[] {
        const domain: number[] = [];
        for (let col = 0; col < n; col++) {
            let valid = true;
            for (let i = 0; i < row; i++) {
                if (board[i] === col || 
                    Math.abs(board[i] - col) === Math.abs(i - row)) {
                    valid = false;
                    break;
                }
            }
            if (valid) domain.push(col);
        }
        return domain;
    }
    
    function solve(board: number[], row: number) {
        if (row === n) {
            result.push(createBoard([...board], n));
            return;
        }
        
        const domain = getDomain(board, row);
        if (domain.length === 0) return; // No valid moves
        
        for (const col of domain) {
            board[row] = col;
            solve(board, row + 1);
        }
    }
    
    solve(new Array(n), 0);
    return result;
}

// Solution 7: Optimized with Early Pruning
function solveNQueensOptimized(n: number): string[][] {
    const result: string[][] = [];
    const board: number[] = new Array(n);
    const colUsed = new Array(n).fill(false);
    const diag1Used = new Array(2 * n - 1).fill(false);
    const diag2Used = new Array(2 * n - 1).fill(false);
    
    function solve(row: number) {
        if (row === n) {
            result.push(createBoard([...board], n));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            const d1 = row - col + n - 1;
            const d2 = row + col;
            
            if (colUsed[col] || diag1Used[d1] || diag2Used[d2]) {
                continue;
            }
            
            // Place queen
            board[row] = col;
            colUsed[col] = true;
            diag1Used[d1] = true;
            diag2Used[d2] = true;
            
            solve(row + 1);
            
            // Remove queen
            colUsed[col] = false;
            diag1Used[d1] = false;
            diag2Used[d2] = false;
        }
    }
    
    solve(0);
    return result;
}

// Test cases
console.log("Solution 1 - Optimized Backtracking:");
console.log(solveNQueens(4));

console.log("\nSolution 2 - Bitwise Approach:");
console.log(solveNQueensBitwise(4));

console.log("\nSolution 3 - Iterative Stack:");
console.log(solveNQueensIterative(4));

// Solution count for different N values
console.log("\nSolution counts for different N:");
for (let n = 1; n <= 8; n++) {
    const solutions = solveNQueens(n);
    console.log(`N=${n}: ${solutions.length} solutions`);
}

// Performance comparison
console.log("\nPerformance comparison for N=8:");
console.time("Optimized Backtracking");
solveNQueens(8);
console.timeEnd("Optimized Backtracking");

console.time("Bitwise Approach");
solveNQueensBitwise(8);
console.timeEnd("Bitwise Approach");

console.time("Iterative Stack");
solveNQueensIterative(8);
console.timeEnd("Iterative Stack");

console.time("Optimized Arrays");
solveNQueensOptimized(8);
console.timeEnd("Optimized Arrays");

// Edge cases
console.log("\nEdge Cases:");
console.log("N=1:", solveNQueens(1));
console.log("N=2:", solveNQueens(2)); // No solution
console.log("N=3:", solveNQueens(3)); // No solution

// Time Complexity Analysis:
// Solution 1: O(N!) time, O(N) space - Optimized backtracking with sets
// Solution 2: O(N!) time, O(N) space - Bitwise operations, fastest for large N
// Solution 3: O(N!) time, O(N * N!) space - Iterative approach with explicit stack
// Solution 4: O(N! * N²) time, O(N) space - Permutation-based, less efficient
// Solution 5: O(N!) time, O(N²) space - Memoized approach with overhead
// Solution 6: O(N!) time, O(N) space - CSP with forward checking
// Solution 7: O(N!) time, O(N) space - Optimized with boolean arrays, very fast

// Note: N! is the theoretical upper bound, but actual complexity is much better due to pruning
// The bitwise solution is typically the fastest for practical implementations