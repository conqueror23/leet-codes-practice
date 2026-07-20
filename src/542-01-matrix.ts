import { check } from "./utils/check"

// solution 1 BFS
function updateMatrixBFS(mat: number[][]): number[][] {
  const rows = mat.length;
  const cols = mat[0].length;

  const dist: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );

  const queue: [number, number][] = [];

  // 1. Add all zero cells as BFS starting points
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (mat[r][c] === 0) {
        dist[r][c] = 0;
        queue.push([r, c]);
      }
    }
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let head = 0;

  // 2. BFS from all zeros
  while (head < queue.length) {
    const [r, c] = queue[head++];

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
        continue;
      }

      // If going through current cell gives a shorter distance
      if (dist[nr][nc] > dist[r][c] + 1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return dist;
}

function updateMatrixDP(mat: number[][]): number[][] {
  const rows = mat.length;
  const cols = mat[0].length;

  const dist: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );

  // Initialize zeros
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (mat[r][c] === 0) {
        dist[r][c] = 0;
      }
    }
  }

  // Pass 1: top-left to bottom-right
  // Check top and left
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r > 0) {
        dist[r][c] = Math.min(dist[r][c], dist[r - 1][c] + 1);
      }

      if (c > 0) {
        dist[r][c] = Math.min(dist[r][c], dist[r][c - 1] + 1);
      }
    }
  }

  // Pass 2: bottom-right to top-left
  // Check bottom and right
  for (let r = rows - 1; r >= 0; r--) {
    for (let c = cols - 1; c >= 0; c--) {
      if (r < rows - 1) {
        dist[r][c] = Math.min(dist[r][c], dist[r + 1][c] + 1);
      }

      if (c < cols - 1) {
        dist[r][c] = Math.min(dist[r][c], dist[r][c + 1] + 1);
      }
    }
  }

  return dist;
}

// ---- tests ----
{

  type Case = { name: string, mat: number[][], expected: number[][] }
  const cases: Case[] = [
    {
      name: "case1 single 1 in center",
      mat: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
      expected: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
    },
    {
      name: "case2 bottom row of 1s",
      mat: [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
      expected: [[0, 0, 0], [0, 1, 0], [1, 2, 1]],
    },
    {
      name: "case3 single zero corner",
      mat: [[0, 1, 1], [1, 1, 1]],
      expected: [[0, 1, 2], [1, 2, 3]],
    },
  ]

  for (const c of cases) {
    check(`${c.name} (BFS)`, updateMatrixBFS(c.mat), c.expected)
    check(`${c.name} (DP)`, updateMatrixDP(c.mat), c.expected)
  }
}

// make this file a module so its declarations stay file-scoped
export {}
