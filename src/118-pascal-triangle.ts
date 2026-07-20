import { check } from "./utils/check"

function generate(numRows: number): number[][] {
  const refArray: number[][] = []

  for (let index = 1; index < numRows + 1; index++) {
    const line = Array(index).fill(1)
    refArray.push(line)
  }

  if (numRows < 2) return refArray

  for (let y = 2; y < numRows; y++) {
    const line = refArray[y]
    for (let x = 0; x < line.length; x++) {
      if (x === 0 || x === line.length - 1) continue
      refArray[y][x] = refArray[y - 1][x - 1] + refArray[y - 1][x]
    }
  }


  return refArray
};




// ---- tests ----
{

  check("case1 numRows=1", generate(1), [[1]])
  check("case2 numRows=2", generate(2), [[1], [1, 1]])
  check("case3 numRows=5", generate(5), [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]])
}

// make this file a module so its declarations stay file-scoped
export {}
