import { check } from "./utils/check"

function getRow(rowIndex: number): number[] {
  let rowAbove: number[] = []

  for (let y = 0; y <= rowIndex; y++) {
    const line = Array(y + 1).fill(1)
    for (let x = 1; x < y; x++) {
      line[x] = rowAbove[x - 1] + rowAbove[x]
    }
    rowAbove = line
  }
  return rowAbove
};



// ---- tests ----
{

  check("case1 rowIndex=0", getRow(0), [1])
  check("case2 rowIndex=1", getRow(1), [1, 1])
  check("case3 rowIndex=3", getRow(3), [1, 3, 3, 1])
  check("case4 rowIndex=4", getRow(4), [1, 4, 6, 4, 1])
}

// make this file a module so its declarations stay file-scoped
export {}
