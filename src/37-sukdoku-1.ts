/**
 * LeetCode 37 - Sudoku Solver
 * Solves a Sudoku puzzle by filling the empty cells.
 */

function solveSudoku(board: string[][]): void {
  solve(board);
}

function solve(board: string[][]): boolean {
  // Find next empty cell
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === '.') {
        // Try digits 1-9
        for (let digit = 1; digit <= 9; digit++) {
          const char = digit.toString();

          if (isValid(board, i, j, char)) {
            board[i][j] = char;

            // Recursively solve the rest
            if (solve(board)) {
              return true;
            }

            // Backtrack
            board[i][j] = '.';
          }
        }

        // If no digit works, return false
        return false;
      }
    }
  }

  // All cells filled successfully
  return true;
}

function isValid(board: string[][], row: number, col: number, digit: string): boolean {
  // Check row
  for (let j = 0; j < 9; j++) {
    if (board[row][j] === digit) {
      return false;
    }
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === digit) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === digit) {
        return false;
      }
    }
  }

  return true;
}

// Example usage and test
function testSudokuSolver(): void {
  const board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
  ];

  console.log("Original board:");
  printBoard(board);

  solveSudoku(board);

  console.log("\nSolved board:");
  printBoard(board);
}

function printBoard(board: string[][]): void {
  for (let i = 0; i < 9; i++) {
    let row = "";
    for (let j = 0; j < 9; j++) {
      row += board[i][j] + " ";
      if (j === 2 || j === 5) row += "| ";
    }
    console.log(row);
    if (i === 2 || i === 5) {
      console.log("------+-------+------");
    }
  }
}

// Run the test
testSudokuSolver();

export { solveSudoku };
