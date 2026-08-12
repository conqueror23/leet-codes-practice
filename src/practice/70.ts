import { check } from "../utils/check"

function climbStairs(n: number): number {
  if (n <= 2) return n

  const result = climbStairs(n - 1) + climbStairs(n - 2)
  return result
};


function climbStairsMemo(n: number): number {
  const memo = new Map<number, number>()
  function count(stair: number): number {
    if (stair <= 2) return stair
    const cache = memo.get(stair)!
    if (cache !== undefined) return cache
    const result = count(stair - 1) + count(stair - 2)
    memo.set(n, result)
    return result
  }
  return count(n)
}

function climbStairsDp(n: number): number {
  if (n <= 2) return n
  const dp = new Array(n + 1).fill(0)
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

function climbStairsDpOpt(n: number): number {
  if (n <= 2) return n
  let twoS = 1
  let oneS = 2
  for (let stair = 3; stair <= n; stair++) {
    const current = twoS + oneS
    twoS = oneS
    oneS = current
  }
  return oneS
}

const n1 = 3
const res1 = 3

{
  check(`case 1 `, climbStairsMemo(n1), res1)

  check(`case 1 `, climbStairsDpOpt(n1), res1)
}
