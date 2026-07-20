import { check } from "./utils/check"

/**
  *  start from top left (0,0) and move all the way to bottom right (n-1,n-1)
  *
  */
function shortestPathBinaryMatrix(grid: number[][]): number {

  const directions = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
    [1, 1], [-1, 1], [1, -1], [-1, -1]
  ]


  // no go grid
  if (grid[0][0] !== 0 || grid[grid.length - 1][grid.length - 1] !== 0) return -1

  const queue: [number, number, number][] = [[0, 0, 1]]

  //start point
  grid[0][0] = 1
  let head = 0
  //start to check following path
  while (head < queue.length) {
    const [cx, cy, distance] = queue[head++]
    if (cx === grid.length - 1 && cy === grid.length - 1) return distance

    for (const [dx, dy] of directions) {
      const nx = cx + dx
      const ny = cy + dy

      if (nx < 0 || nx > grid.length - 1 || ny < 0 || ny > grid.length - 1) continue
      if (grid[nx][ny] !== 0) continue

      grid[nx][ny] = 1
      queue.push([nx, ny, distance + 1])
    }
  }
  return -1
};

// ---- tests ----
{

  // the function mutates the grid, so each case gets a fresh input
  check("case1 [[0,1],[1,0]]", shortestPathBinaryMatrix([[0, 1], [1, 0]]), 2)
  check("case2 [[0,0,0],[1,1,0],[1,1,0]]", shortestPathBinaryMatrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]]), 4)
  check("case3 blocked start", shortestPathBinaryMatrix([[1, 0, 0], [1, 1, 0], [1, 1, 0]]), -1)
  check("case4 unreachable", shortestPathBinaryMatrix([[0, 1], [1, 1]]), -1)
  check("case5 single cell", shortestPathBinaryMatrix([[0]]), 1)
}

// make this file a module so its declarations stay file-scoped
export {}
