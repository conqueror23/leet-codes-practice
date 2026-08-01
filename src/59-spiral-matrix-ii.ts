import { check } from "./utils/check";
// Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

function generateMatrix(n: number): number[][] {
  const matrix: number[][] = Array.from(
    { length: n },
    () => Array(n).fill(0)
  );

  type Direction = "R" | "D" | "L" | "U";

  const directions: Record<Direction, [number, number]> = {
    R: [1, 0],
    D: [0, 1],
    L: [-1, 0],
    U: [0, -1],
  };

  const turn: Record<Direction, Direction> = {
    R: "D",
    D: "L",
    L: "U",
    U: "R",
  };

  let x = 0;
  let y = 0;
  let dir: Direction = "R";

  for (let num = 1; num <= n * n; num++) {
    // Fill current cell
    matrix[y][x] = num;

    // Look ahead
    let [dx, dy] = directions[dir];
    let nx = x + dx;
    let ny = y + dy;

    // Turn if next position is invalid
    if (
      nx < 0 ||
      nx >= n ||
      ny < 0 ||
      ny >= n ||
      matrix[ny][nx] !== 0
    ) {
      dir = turn[dir];

      [dx, dy] = directions[dir];
      nx = x + dx;
      ny = y + dy;
    }

    // Move
    x = nx;
    y = ny;
  }

  return matrix;
};


const n = 3
const res = [[1, 2, 3], [8, 9, 4], [7, 6, 5]]


const n1 = 5

const res1 = [
  [1, 2, 3, 4, 5],
  [16, 17, 18, 19, 6],
  [15, 24, 25, 20, 7],
  [14, 23, 22, 21, 8],
  [13, 12, 11, 10, 9]
]

{
  check(`${n} -- res ${res} `, generateMatrix(n), res)

  // check(`${n1} -- res ${res1} `, generateMatrix(n1), res1)
}

export { }
