import { check } from "./utils/check"


function MaximalSquareSel(strArr: string[]) {
  if (!strArr || strArr.length === 0) return 0
  if (!strArr || strArr.length === 0) return 0;

  const rows = strArr.length;
  const cols = strArr[0].length;

  const dp = Array.from(
    { length: rows },
    () => new Array(cols).fill(0)
  );

  let maxEdge = 0;

  // First column
  for (let r = 0; r < rows; r++) {
    dp[r][0] = Number(strArr[r][0]);
    maxEdge = Math.max(maxEdge, dp[r][0]);
  }

  // First row
  for (let c = 0; c < cols; c++) {
    dp[0][c] = Number(strArr[0][c]);
    maxEdge = Math.max(maxEdge, dp[0][c]);
  }

  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (strArr[r][c] === "1") {
        dp[r][c] =
          Math.min(
            dp[r - 1][c],
            dp[r][c - 1],
            dp[r - 1][c - 1]
          ) + 1;

        maxEdge = Math.max(maxEdge, dp[r][c]);
      }
    }
  }

  return maxEdge * maxEdge;
}


function MaximalSquare(strArr: string[]) {
  if (!strArr || strArr.length === 0) return 0

  const rows = strArr.length
  const cols = strArr[0].length
  const dp = new Array(cols + 1).fill(0)
  let maxEdge: number = 0

  for (let r = 0; r < rows; r++) {
    let prev = 0
    for (let c = 0; c < cols; c++) {
      const temp = dp[c + 1]
      if (strArr[r][c] === "1") {
        dp[c + 1] = Math.min(dp[c + 1], dp[c], prev) + 1
        maxEdge = Math.max(maxEdge, dp[c + 1])
      } else {
        dp[c + 1] = 0
      }
      prev = temp
    }
  }



  // code goes here  

  return maxEdge * maxEdge
}

const input = ["0111", "1111", "1111", "1111"]
const size = 9

// keep this function call here 
// @ts-ignore
console.log(MaximalSquare(input));
{
  check(`case 1 ${input} - size ${size}`, MaximalSquareSel(input), size)
}

export { }
