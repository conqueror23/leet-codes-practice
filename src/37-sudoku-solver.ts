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
  rowRef: string, columnsRef: string, blockRef: string
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
    console.log(`block ${blockRef}`)
  }
  return potentialNumbers
}

function solveSudoku1(board: string[][]): string[][] {
  // const recordsSet = new Map<number, Set<number | null>>()

  const { rowsRef, columnsRef, blocksRef } = getLatestRef(board)

  // console.log("rowsRef", rowsRef)
  // console.log("columnsRef", columnsRef)
  // console.log("blocksRef", blocksRef)

  //this not going to works,
  //it needs some test and returns
  const potentialBoard = board.map(
    (row, rowIndex) => {
      return row.map(
        (column, columnIndex) => {
          if (column === '.') {
            const rowRef = rowsRef[rowIndex]
            const columnRef = columnsRef[columnIndex]
            const blockIndex = getBlockIndex(rowIndex, columnIndex)
            const blockRef = blocksRef[blockIndex]
            const availableNumbers = getAvailableNumbers(rowRef, columnRef, blockRef)
            const selectedNumber = availableNumbers[0]
            rowsRef[rowIndex] += selectedNumber
            columnsRef[columnIndex] += selectedNumber
            blocksRef[blockIndex] += selectedNumber
            if (!selectedNumber) {
              console.log("selectedNumber", availableNumbers)
              console.log('blockIndex', blockIndex)
              console.log('rowIndex', rowIndex)
              console.log('columnIndex', columnIndex)
            }
            // console.log("number selcete", selectedNumber)
            return selectedNumber
          }
          return column
        })
    })

  return potentialBoard
}

const input = board1
// solveSudoku1(input)

console.log("solveSudoku1", solveSudoku1(input))
//
//Testings 
const isEqualArray = (
  arr1: (number | string)[][], arr2: (number | string)[][]) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}

// console.log('eq1', isEqualArray([[1, 2, 3], [3, 2, 2]], [[1, 2, 3], [3, 2, 2]]))
// console.log('eq2', isEqualArray([[1, 2, 5], [3, 2, 2]], [[1, 2, 3], [3, 2, 2]]))
//
/** [ '5', '3', '1', '2', '7', '2', '1', '1', '2' ],
    [ '6', '2', '2', '1', '9', '5', '3', '2', '2' ],
    [ '1', '9', '8', '2', '3', '2', '1', '6', '2' ],
    [ '8', '1', '1', '5', '6', '1', '4', '2', '3' ],
    [ '4', '2', '2', '8', '5', '3', '5', '2', '1' ],
    [ '7', '1', '1', '3', '2', '1', '4', '4', '6' ],
    [ '1', '6', '1', '3', '3', '7', '2', '8', '4' ],
    [ '2', '2', '2', '4', '1', '9', '3', '3', '5' ],
    [ '1', '1', '1', '2', '8', '2', '1', '7', '9' ]
]
**/
