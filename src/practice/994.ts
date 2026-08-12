import { check } from "../utils/check"

function orangesRotting(grid: number[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;

  const queue: Array<[number, number]> = [];
  let head = 0;
  let fresh = 0;

  // Collect all BFS sources and count fresh oranges.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 2) {
        queue.push([row, col]);
      } else if (grid[row][col] === 1) {
        fresh++;
      }
    }
  }

  if (fresh === 0) return 0

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let minutes = 0;

  while (head < queue.length && fresh > 0) {
    const levelSize = queue.length - head;

    // Process everything that is rotten at the current minute.
    for (let i = 0; i < levelSize; i++) {
      const [row, col] = queue[head++];

      for (const [dr, dc] of directions) {
        const nextRow = row + dr;
        const nextCol = col + dc;

        const isInside =
          nextRow >= 0 &&
          nextRow < rows &&
          nextCol >= 0 &&
          nextCol < cols;

        if (!isInside || grid[nextRow][nextCol] !== 1) {
          continue;
        }

        grid[nextRow][nextCol] = 2;
        fresh--;
        queue.push([nextRow, nextCol]);
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


{
  check(`case 1`, orangesRotting(grid), res)
}

export { }
