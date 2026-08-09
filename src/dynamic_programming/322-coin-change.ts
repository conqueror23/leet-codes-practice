import { check } from "../utils/check"

function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);

  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      const current = coin
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};

const coins = [1, 2, 5], amount = 11
const res = 3


const coins1 = [2]
const amount1 = 3
const res1 = -1

const coins2 = [1]
const amount2 = 0
const res2 = 0


const coins3 = [2, 5, 10, 1]
const amount3 = 27
const res3 = 4

const coins4 = [186, 419, 83, 408]
const amount4 = 6249
const res4 = 20

{
  // check(`coins ${coins} = ${res}`, coinChange(coins, amount), res)
  //
  // check(`coins1 ${coins1} = ${res1}`, coinChange(coins1, amount1), res1)
  //
  // check(`coins2 ${coins2} = ${res2}`, coinChange(coins2, amount2), res2)
  //
  check(`coins3 ${coins3} = ${res3}`, coinChange(coins3, amount3), res3)

  // check(`coins4 ${coins4} = ${res4}`, coinChange(coins4, amount4), res4)
}

export { }
