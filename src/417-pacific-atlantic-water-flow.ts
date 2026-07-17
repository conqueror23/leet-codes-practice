// function pacificAtlantic(heights: number[][]): number[][] {
//  const rows = heights.length;
//  const cols = heights[0].length;
//
//   const pacific: boolean[][] = Array.from({ length: rows }, () =>
//     Array(cols).fill(false)
//   );
//
//   const atlantic: boolean[][] = Array.from({ length: rows }, () =>
//     Array(cols).fill(false)
//   );
//
//   const directions = [
//     [1, 0],
//     [-1, 0],
//     [0, 1],
//     [0, -1],
//   ];
//
//   function dfs(row: number, col: number, visited: boolean[][]): void {
//     visited[row][col] = true;
//
//     for (const [dr, dc] of directions) {
//       const nextRow = row + dr;
//       const nextCol = col + dc;
//
//       if (
//         nextRow < 0 ||
//         nextRow >= rows ||
//         nextCol < 0 ||
//         nextCol >= cols
//       ) {
//         continue;
//       }
//
//       if (visited[nextRow][nextCol]) {
//         continue;
//       }
//
//       // Reverse flow:
//       // From ocean inward, we can only move to equal or higher cells.
//       if (heights[nextRow][nextCol] < heights[row][col]) {
//         continue;
//       }
//
//       dfs(nextRow, nextCol, visited);
//     }
//   }
//
//   // Pacific: top row and left column
//   for (let col = 0; col < cols; col++) {
//     dfs(0, col, pacific);
//   }
//
//   for (let row = 0; row < rows; row++) {
//     dfs(row, 0, pacific);
//   }
//
//   // Atlantic: bottom row and right column
//   for (let col = 0; col < cols; col++) {
//     dfs(rows - 1, col, atlantic);
//   }
//
//   for (let row = 0; row < rows; row++) {
//     dfs(row, cols - 1, atlantic);
//   }
//
//   const result: number[][] = [];
//
//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       if (pacific[row][col] && atlantic[row][col]) {
//         result.push([row, col]);
//       }
//     }
//   }
//
//   return result; 
// };
//

function pacificAtlantic(heights: number[][]): number[][] {
  const rows = heights.length;
  const cols = heights[0].length;

  const pacific: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const atlantic: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfsIterative(starts: number[][], visited: boolean[][]): void {
    const stack: number[][] = [];

    for (const [row, col] of starts) {
      if (!visited[row][col]) {
        visited[row][col] = true;
        stack.push([row, col]);
      }
    }

    while (stack.length > 0) {
      const [row, col] = stack.pop()!;

      for (const [dr, dc] of directions) {
        const nextRow = row + dr;
        const nextCol = col + dc;

        if (
          nextRow < 0 ||
          nextRow >= rows ||
          nextCol < 0 ||
          nextCol >= cols
        ) {
          continue;
        }

        if (visited[nextRow][nextCol]) {
          continue;
        }

        // Reverse water flow:
        // From ocean inward, we can only move to equal or higher cells.
        if (heights[nextRow][nextCol] < heights[row][col]) {
          continue;
        }

        visited[nextRow][nextCol] = true;
        stack.push([nextRow, nextCol]);
      }
    }
  }

  const pacificStarts: number[][] = [];
  const atlanticStarts: number[][] = [];

  for (let col = 0; col < cols; col++) {
    pacificStarts.push([0, col]);
    atlanticStarts.push([rows - 1, col]);
  }

  for (let row = 0; row < rows; row++) {
    pacificStarts.push([row, 0]);
    atlanticStarts.push([row, cols - 1]);
  }

  dfsIterative(pacificStarts, pacific);
  dfsIterative(atlanticStarts, atlantic);

  const result: number[][] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pacific[row][col] && atlantic[row][col]) {
        result.push([row, col]);
      }
    }
  }

  return result;
}
// ---- tests ----
{
  // cells can come back in any order, so normalize before comparing
  const normalize = (cells: number[][]): number[][] =>
    [...cells].sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]))

  const check = (name: string, actual: number[][], expected: number[][]): void => {
    const a = JSON.stringify(normalize(actual))
    const e = JSON.stringify(normalize(expected))
    console.log(a === e ? `PASS ${name}` : `FAIL ${name}: expected ${e}, got ${a}`)
  }

  check("case1 classic 5x5",
    pacificAtlantic([
      [1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]
    ]),
    [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]])

  check("case2 single cell", pacificAtlantic([[1]]), [[0, 0]])

  check("case3 2x2 all reach both oceans",
    pacificAtlantic([[2, 1], [1, 2]]),
    [[0, 0], [0, 1], [1, 0], [1, 1]])
}

// make this file a module so its declarations stay file-scoped
export {}
