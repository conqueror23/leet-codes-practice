
/**
  *
  *You are given an m x n grid where each cell can have one of three values:
  0 representing an empty cell,
  1 representing a fresh orange, or
  2 representing a rotten orange.
  Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
  Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.
  *
  */
import { check } from "../utils/check";

function orangesRotting(grid: number[][]): number {
  //how many recurssion do we need to cover all oranges
  const maxX = grid.length
  const maxY = grid[0].length
  let rottenMin = 0
  let queue: [number, number][] = []
  let freshOrange = 0

  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      if (grid[x][y] === 2) queue.push([x, y])

      if (grid[x][y] === 1) freshOrange++
    }
  }

  const directions = [
    [-1, 0], [1, 0],
    [0, 1], [0, -1]
  ]

  //rotting process
  while (queue.length > 0) {
    const temp = [...queue]
    queue = []
    for (const [px, py] of temp) {
      for (const [dx, dy] of directions) {
        const cx = px + dx
        const cy = py + dy
        if (cx < 0 || cy < 0 || cx > maxX - 1 || cy > maxY - 1) continue
        if (grid[cx][cy] === 1) {
          grid[cx][cy] = 2
          freshOrange--
          queue.push([cx, cy])
        }
      }
    }
    if (queue.length > 0) rottenMin++
  }

  return freshOrange ? -1 : rottenMin
};

function orangesRottingOpt(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const queue: [number, number][] = [];
  let fresh = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  if (fresh === 0) return 0;

  const dirs = [-1, 0, 1, 0, -1];

  let head = 0;
  let minutes = 0;

  while (head < queue.length && fresh > 0) {
    const levelSize = queue.length - head;

    for (let i = 0; i < levelSize; i++) {

      const [r, c] = queue[head++];

      for (let d = 0; d < 4; d++) {

        const nr = r + dirs[d];
        const nc = c + dirs[d + 1];

        if (
          nr < 0 ||
          nr >= rows ||
          nc < 0 ||
          nc >= cols ||
          grid[nr][nc] !== 1
        ) continue;

        grid[nr][nc] = 2;
        fresh--;

        queue.push([nr, nc]);
      }
    }

    minutes++;
  }

  return fresh === 0 ? minutes : -1;
}

const grid = [[2, 1, 1], [1, 1, 0], [0, 1, 1]]
const res = 4

const grid1 = [[2, 1, 1], [0, 1, 1], [1, 0, 1]]
const res1 = -1

const grid2 = [[0, 2]]
const res2 = 0

const grid3 = [[0]]
const res3 = 0
{
  //   check(`${grid} - ${res}`, orangesRotting(grid), res)
  //
  //   check(`${grid1} - ${res1}`, orangesRotting(grid1), res1)
  //
  //   check(`${grid2} - ${res2}`, orangesRotting(grid2), res2)
  //
  //   check(`${grid3} - ${res3}`, orangesRotting(grid3), res3)
  //
  check(`${grid} - ${res}`, orangesRottingOpt(grid), res)

  check(`${grid1} - ${res1}`, orangesRottingOpt(grid1), res1)

  check(`${grid2} - ${res2}`, orangesRottingOpt(grid2), res2)

  check(`${grid3} - ${res3}`, orangesRotting(grid3), res3)

}

export { }
