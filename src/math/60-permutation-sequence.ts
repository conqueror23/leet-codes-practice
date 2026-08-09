import { check } from "../utils/check"

function getPermutation(n: number, k: number): string {
  const numbers: number[] = [];
  const factorial: number[] = new Array(n + 1).fill(1);

  for (let i = 1; i <= n; i++) {
    numbers.push(i);
    factorial[i] = factorial[i - 1] * i;
  }

  // Convert from 1-based position to 0-based index.
  k--;

  let result = "";
  for (let remaining = n; remaining >= 1; remaining--) {
    const blockSize = factorial[remaining - 1];
    const index = Math.floor(k / blockSize);

    result += numbers[index];
    numbers.splice(index, 1);


    k %= blockSize;
  }

  return result;
};

function getPermutationBT(n: number, k: number): string {
  // const numbers: number[] = []
  const used = Array(n + 1).fill(false)
  let count = 0
  let answer = ""

  function backtrack(path: number[]) {
    if (path.length === n) {
      count++

      if (count === k) {
        answer = path.join("")
        return true
      }
      return false
    }

    for (let i = 1; i <= n; i++) {
      if (used[i]) continue

      used[i] = true
      path.push(i)

      backtrack(path)

      used[i] = false
      path.pop()
    }
    return false
  }

  backtrack([])
  return answer
}

const n1 = 3
const k1 = 3
const res1 = "213"

const n2 = 4, k2 = 9
const res2 = "2314"

{

  // check(`case 1`, getPermutation(n1, k1), res1)

  check(`case 2`, getPermutationBT(n2, k2), res2)
}

export { }
