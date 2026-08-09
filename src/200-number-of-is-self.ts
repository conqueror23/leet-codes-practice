import { check } from "./utils/check"

function numIslands(grid: string[][]): number {
  let num = 0;
  const maxY = grid.length
  const maxX = grid[0].length

  const dfs = (x: number, y: number) => {
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
      dfs(nx, ny)
    }
  }


  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      const currentCell = grid[y][x]
      if (currentCell === "1") {
        dfs(x, y)
        num++
      }
    }
  }

  return num
};

function numIslandsStack(grid: string[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0;

  let num = 0;
  const maxY = grid.length;
  const maxX = grid[0].length;

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      if (grid[y][x] !== "1") continue;

      num++;

      const stack: Array<[number, number]> = [[y, x]];
      grid[y][x] = "0";

      while (stack.length > 0) {
        const [currentY, currentX] = stack.pop()!;

        for (const [dy, dx] of directions) {
          const nextY = currentY + dy;
          const nextX = currentX + dx;

          if (
            nextY < 0 ||
            nextY >= maxY ||
            nextX < 0 ||
            nextX >= maxX ||
            grid[nextY][nextX] !== "1"
          ) {
            continue;
          }

          // Mark visited when pushing, preventing duplicate stack entries.
          grid[nextY][nextX] = "0";
          stack.push([nextY, nextX]);
        }
      }
    }
  }

  return num;

}

function numIslandsBFS(grid: string[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0;

  let num1 = 0;
  const maxY = grid.length;
  const maxX = grid[0].length;

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      if (grid[y][x] !== "1") continue;

      num1++;
      grid[y][x] = "0";

      const queue: Array<[number, number]> = [[y, x]];
      let head = 0;

      while (head < queue.length) {
        const [currentY, currentX] = queue[head++];

        for (const [dy, dx] of directions) {
          const nextY = currentY + dy;
          const nextX = currentX + dx;

          if (
            nextY < 0 ||
            nextY >= maxY ||
            nextX < 0 ||
            nextX >= maxX ||
            grid[nextY][nextX] !== "1"
          ) {
            continue;
          }

          grid[nextY][nextX] = "0";
          queue.push([nextY, nextX]);
        }
      }
    }
  }

  return num1;
}



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
  //
  // check(`case 2`, numIslands(grid2), res2)
  //
  // check(`case 1`, numIslandsStack(grid1), res1)
  // //
  // check(`case 2`, numIslandsStack(grid2), res2)
  //
  check(`case 1`, numIslandsBFS(grid1), res1)
  //
  check(`case 2`, numIslandsBFS(grid2), res2)

}

export {

}
