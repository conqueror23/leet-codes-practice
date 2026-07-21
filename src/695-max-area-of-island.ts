import { check } from "./utils/check"

function maxAreaOfIsland(grid: number[][]): number {
  let maxSize = 0

  const maxX = grid.length
  const maxY = grid[0].length

  const visited = new Set<string>()

  let tempSize = 0
  const dfs = (x: number, y: number) => {
    if (x < 0 || y < 0 || x > maxX - 1 || y > maxY - 1) return
    const cordinateKey = `${x}-${y}`
    if (visited.has(cordinateKey)) return
    visited.add(cordinateKey)
    if (grid[x][y] === 0) return
    tempSize++

    dfs(x - 1, y)
    dfs(x + 1, y)
    dfs(x, y + 1)
    dfs(x, y - 1)

    maxSize = Math.max(tempSize, maxSize)
  }

  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      const cordinateKey = `${x}-${y}`
      if (visited.has(cordinateKey)) continue
      if (grid[x][y] === 1) {

        tempSize = 0
        dfs(x, y)
      }
    }
  }


  return maxSize
};


function maxAreaOfIslandBFS(grid: number[][]): number {
  let maxSize = 0

  const maxX = grid.length
  const maxY = grid[0].length

  const direction = [
    [-1, 0], [1, 0]
    , [0, 1], [0, -1]
  ]

  const bfs = (x: number, y: number): number => {
    grid[x][y] = 0
    const queue: [number, number][] = [[x, y]]
    let tempSize = 0

    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!
      tempSize++
      for (const [dx, dy] of direction) {
        const nx = cx + dx
        const ny = cy + dy
        if (nx >= 0 && nx < maxX && ny >= 0 && ny < maxY && grid[nx][ny] === 1) {

          grid[nx][ny] = 0
          queue.push([nx, ny])
        }
      }
    }

    return tempSize
  }

  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      if (grid[x][y] === 1) maxSize = Math.max(maxSize, bfs(x, y))
    }
  }



  return maxSize
}

const grid = [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]
const res = 6

const grid1 = [[1]]
const res1 = 1

{
  // check(`grid with res`, maxAreaOfIsland(grid), res)
  // check(`grid1 with res1`, maxAreaOfIsland(grid1), res1)
  //
  check(`grid1 with res1 - bfs`, maxAreaOfIslandBFS(grid1), res1)
  check(`grid with res -bfs`, maxAreaOfIslandBFS(grid), res)
}


export { }
