function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
  const oldColor = image[sr][sc];

  if (oldColor === color) return image;

  const rows = image.length;
  const cols = image[0].length;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (image[r][c] !== oldColor) return;

    image[r][c] = color;

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  dfs(sr, sc);

  return image;
};

function floodFillBFS(image: number[][], sr: number, sc: number, color: number) {
  const oldColor = image[sr][sc]
  if (oldColor === color) return image

  const rows = image.length;
  const cols = image[0].length;

  const queue: [number, number][] = [[sr, sc]]

  let head = 0
  while (head < queue.length) {
    const [r, c] = queue[head++]
    if (r < 0 || r >= rows || c < 0 || c >= cols) continue
    if (image[r][c] !== oldColor) continue

    image[r][c] = color

    queue.push([r + 1, c])
    queue.push([r - 1, c])
    queue.push([r, c + 1])
    queue.push([r, c - 1])
  }

  return image
}

// ---- tests ----
{
  const check = (name: string, actual: unknown, expected: unknown): void => {
    console.log(JSON.stringify(actual) === JSON.stringify(expected)
      ? `PASS ${name}`
      : `FAIL ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }

  const deepCopy = (image: number[][]): number[][] => image.map(row => [...row])

  type Case = { name: string, image: number[][], sr: number, sc: number, color: number, expected: number[][] }
  const cases: Case[] = [
    {
      name: "case1 classic fill",
      image: [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr: 1, sc: 1, color: 2,
      expected: [[2, 2, 2], [2, 2, 0], [2, 0, 1]],
    },
    {
      name: "case2 same color no-op",
      image: [[0, 0, 0], [0, 0, 0]], sr: 0, sc: 0, color: 0,
      expected: [[0, 0, 0], [0, 0, 0]],
    },
    {
      name: "case3 fill bottom-right region",
      image: [[0, 0, 0], [0, 1, 1]], sr: 1, sc: 1, color: 9,
      expected: [[0, 0, 0], [0, 9, 9]],
    },
  ]

  // both implementations mutate the image, so each run gets a fresh copy
  for (const c of cases) {
    check(`${c.name} (DFS)`, floodFill(deepCopy(c.image), c.sr, c.sc, c.color), c.expected)
    check(`${c.name} (BFS)`, floodFillBFS(deepCopy(c.image), c.sr, c.sc, c.color), c.expected)
  }
}

// make this file a module so its declarations stay file-scoped
export {}
