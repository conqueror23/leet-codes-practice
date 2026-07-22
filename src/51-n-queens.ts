import { check } from "./utils/check"

function solveNQueens(n: number): string[][] {
  const result: string[][] = [];

  const board: string[][] = Array.from(
    { length: n },
    () => Array(n).fill(".")
  );

  const cols = new Set<number>();
  const diag = new Set<number>();       // row - col
  const anti = new Set<number>();       // row + col

  function dfs(row: number): void {
    if (row === n) {
      result.push(board.map(r => r.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {

      if (
        cols.has(col) ||
        diag.has(row - col) ||
        anti.has(row + col)
      ) {
        continue;
      }

      board[row][col] = "Q";
      cols.add(col);
      diag.add(row - col);
      anti.add(row + col);

      dfs(row + 1);

      board[row][col] = ".";
      cols.delete(col);
      diag.delete(row - col);
      anti.delete(row + col);
    }
  }

  dfs(0);

  return result;

};

const n = 4
const output = [[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]]

{
  check(`n = ${n}`, solveNQueens(n), output)
}

export { }
