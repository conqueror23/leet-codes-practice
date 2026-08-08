import { check } from "./utils/check"

function numIslands(grid: string[][]): number {
  let num = 0;
  const maxY = grid.length
  const maxX = grid[0].length


  const bfs = (x: number, y: number) => {
    const directions = [
      [0, 1], [0, -1],
      [1, 0], [-1, 0]
    ]

    grid[y][x] = "0"

    for (const [cx, cy] of directions) {
      const nx = x + cx
      const ny = y + cy

      if (
        nx < 0 ||
        ny < 0 ||
        nx > maxX - 1 ||
        ny > maxY - 1 ||
        grid[ny][nx] === '0'
      )
        continue
      bfs(nx, ny)
    }
  }


  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      const currentCell = grid[y][x]
      if (currentCell === "1") {
        bfs(x, y)
        num++
      }
    }
  }
  console.log("grid", grid)

  return num
};


const grid1 = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"]
]
const res1 = 1

const grid2 = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"]
]
const res2 = 3

{
  // check(`case 1`, numIslands(grid1), res1)

  check(`case 2`, numIslands(grid2), res2)
}

export {

}
