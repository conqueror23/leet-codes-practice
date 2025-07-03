/**
Write a program to solve a Sudoku puzzle by filling the empty cells.
A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells.

[
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
  ]

[
  ["5", "3", "(0-9)", "(0-9)", "7", "(0-9)", "(0-9)", "(0-9)", "(0-9)"],
  ["6", "(0-9)", "(0-9)", "1", "9", "5", "(0-9)", "(0-9)", "(0-9)"],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
  ]



**/


const board1 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]

// const export1 = [["5", "3", "4", "6", "7", "8", "9", "1", "2"], ["6", "7", "2", "1", "9", "5", "3", "4", "8"], ["1", "9", "8", "3", "4", "2", "5", "6", "7"], ["8", "5", "9", "7", "6", "1", "4", "2", "3"], ["4", "2", "6", "8", "5", "3", "7", "9", "1"], ["7", "1", "3", "9", "2", "4", "8", "5", "6"], ["9", "6", "1", "5", "3", "7", "2", "8", "4"], ["2", "8", "7", "4", "1", "9", "6", "3", "5"], ["3", "4", "5", "2", "8", "6", "1", "7", "9"]]

// console.log("export1", export1)
function solveSudoku1(board: string[][]): string[][] {

  const recordsSet = new Map<number, Set<number | null>>()
  const base = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])

  return board.map(
    (row, rowIndex) => {

      recordsSet.set(rowIndex, new Set())
      return row.map(
        (cell, cellIndex) => {

          const existingSet = recordsSet.get(rowIndex)
          if (existingSet && existingSet.size > 0) {
            if (existingSet.has(Number(cell)) {
              //save delta of 
              //

            }

          }

          return cell
        }

      )
    
  )
};


const input = board1
console.log("solveSudoku1", solveSudoku1(input))

//Testings 
const isEqualArray = (
  arr1: (number | string)[][], arr2: (number | string)[][]) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}

// console.log('eq1', isEqualArray([[1, 2, 3], [3, 2, 2]], [[1, 2, 3], [3, 2, 2]]))
// console.log('eq2', isEqualArray([[1, 2, 5], [3, 2, 2]], [[1, 2, 3], [3, 2, 2]]))
