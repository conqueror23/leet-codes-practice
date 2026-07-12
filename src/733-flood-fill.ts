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
  if (oldColor === color) return

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

const image = [[1, 1, 1], [1, 1, 0], [1, 0, 1]]
const sr = 1
const sc = 1
const color = 2

// const result = floodFill(image, sr, sc, color)
const result = floodFillBFS(image, sr, sc, color)
console.log(result)

const expectedOutput = [[2, 2, 2], [2, 2, 0], [2, 0, 1]]
