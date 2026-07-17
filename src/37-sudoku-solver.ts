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


const getBlockIndex = (x: number, y: number) => {
  const reminder = Math.floor((x / 3))
  const dividend = Math.floor((y / 3))

  const blockIndex = dividend + 3 * reminder
  return blockIndex
}


const getLatestRef = (board: string[][]) => {
  const rowsRef: string[] = Array.from({ length: 9 }, () => "")
  const columnsRef: string[] = Array.from({ length: 9 }, () => "")
  const blocksRef: string[] = Array.from({ length: 9 }, () => "")

  // console.log(`rows : ${rows}`)
  // console.log(`columns : ${columns}`)
  // console.log(`blocks : ${blocks}`)

  board.forEach((row, rowIndex) => {
    rowsRef[rowIndex] = row.filter(item => item != '.').join("")
    // console.log("rows", rows)

    row.forEach((column, columnIndex) => {
      if (column !== '.') {
        if (columnsRef[columnIndex].includes(column)) return
        columnsRef[columnIndex] += column

        const blockIndex = getBlockIndex(rowIndex, columnIndex)
        if (blocksRef.includes(column)) return
        blocksRef[blockIndex] += column
      }
    })
  })

  return { rowsRef, columnsRef, blocksRef }
}

const getAvailableNumbers = (
  rowRef: string,
  columnsRef: string,
  blockRef: string
): string[] => {
  const numBase = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const potentialNumbers = numBase
    .filter((num) => !rowRef.includes(num))
    .filter((num) => !columnsRef.includes(num))
    .filter((num) => !blockRef.includes(num))

  if (potentialNumbers.length == 0) {
    console.log("debugging")
    console.log(`rowRef ${rowRef}`)
    console.log(`columnRef ${columnsRef}`)
    console.log(`blockRef ${blockRef}`)
    console.log(`potentialNumbers ${potentialNumbers}`)
  }
  return potentialNumbers
}

// WIP attempt, kept for reference — see solveSudoku below for the working solver
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function solveSudoku1(board: string[][]): string[][] {
  // const recordsSet = new Map<number, Set<number | null>>()
  const { rowsRef, columnsRef, blocksRef } = getLatestRef(board)
  // console.log("rowsRef", rowsRef)
  // console.log("columnsRef", columnsRef)
  // console.log("blocksRef", blocksRef)

  //this not going to works,
  //it needs some test and returns
  const potentialBoard = [[]]

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === '.') {
        const potentialNumbers = getAvailableNumbers(
          rowsRef[i],
          columnsRef[j],
          blocksRef[getBlockIndex(i, j)]
        )
        for (let k = 0; k < potentialNumbers.length; k++) {
          const cadidateNumber = potentialNumbers.pop()
          for (let pos = j; pos < 9; pos++) {
            board[i][pos] = String(cadidateNumber)

            const nextCandidate = getAvailableNumbers(
              rowsRef[i],
              columnsRef[pos],
              blocksRef[getBlockIndex(i, pos)]
            )

            if (!nextCandidate) {
              break
            }
          }
        }
      }
    }
  }


  return potentialBoard
}

// working backtracking solver (solveSudoku1 above is a WIP attempt)
function solveSudoku(board: string[][]): string[][] {
  const isValidPlacement = (r: number, c: number, ch: string): boolean => {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === ch) return false
      if (board[i][c] === ch) return false
      const br = 3 * Math.floor(r / 3) + Math.floor(i / 3)
      const bc = 3 * Math.floor(c / 3) + (i % 3)
      if (board[br][bc] === ch) return false
    }
    return true
  }

  const solve = (): boolean => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== '.') continue

        for (let digit = 1; digit <= 9; digit++) {
          const ch = String(digit)
          if (isValidPlacement(r, c, ch)) {
            board[r][c] = ch
            if (solve()) return true
            board[r][c] = '.'
          }
        }
        return false
      }
    }
    return true
  }

  solve()
  return board
}

//Testings
const isEqualArray = (
  arr1: (number | string)[][], arr2: (number | string)[][]) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}


function printBoard(board: string[][]): void {
  console.log("----------------------");
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

// ---- tests ----
{
  const check = (name: string, pass: boolean, detail = ""): void => {
    console.log(pass ? `PASS ${name}` : `FAIL ${name}${detail ? `: ${detail}` : ""}`)
  }

  const deepCopy = (board: string[][]): string[][] => board.map(row => [...row])

  const expectedSolution1 = [
    ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
    ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
    ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
    ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
    ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
    ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
    ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
    ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
    ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
  ]

  // case1: classic LeetCode board matches the known solution
  const solved1 = solveSudoku(deepCopy(board1))
  check("case1 classic board solved", isEqualArray(solved1, expectedSolution1),
    "solution does not match expected")
  printBoard(solved1)

  // case2: an almost-complete board (solution with some cells blanked) is restored
  const board2 = deepCopy(expectedSolution1)
  board2[0][0] = "."
  board2[4][4] = "."
  board2[8][8] = "."
  board2[2][5] = "."
  check("case2 blanked cells restored", isEqualArray(solveSudoku(board2), expectedSolution1),
    "solution does not match expected")

  // case3: solver fills every cell with a valid digit
  const solved3 = solveSudoku(deepCopy(board1))
  const allFilled = solved3.every(row => row.every(cell => "123456789".includes(cell)))
  check("case3 every cell filled 1-9", allFilled)
}

// make this file a module so its declarations stay file-scoped
export {}
