function maxProfit(prices: number[]): number {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    minPrice = Math.min(minPrice, prices[i]);
  }

  return maxProfit;
};


// ---- tests ----
{
  const check = (name: string, actual: unknown, expected: unknown): void => {
    console.log(actual === expected
      ? `PASS ${name}`
      : `FAIL ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }

  check("case1 [7,1,5,3,6,4]", maxProfit([7, 1, 5, 3, 6, 4]), 5)
  check("case2 [7,6,4,3,1] no profit", maxProfit([7, 6, 4, 3, 1]), 0)
  check("case3 [2,4,1]", maxProfit([2, 4, 1]), 2)
  check("case4 [1] single day", maxProfit([1]), 0)
}

// make this file a module so its declarations stay file-scoped
export {}
