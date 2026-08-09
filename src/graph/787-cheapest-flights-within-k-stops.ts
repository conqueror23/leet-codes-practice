import { check } from "../utils/check";

function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
  let prices = new Array<number>(n).fill(Infinity);
  prices[src] = 0;

  // At most k stops means at most k + 1 flights.
  for (let flightCount = 0; flightCount <= k; flightCount++) {
    const nextPrices = [...prices];

    for (const [from, to, cost] of flights) {
      if (prices[from] === Infinity) continue;

      nextPrices[to] = Math.min(
        nextPrices[to],
        prices[from] + cost
      );
    }

    prices = nextPrices;
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
};

const n1 = 4
const flights1 = [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]]
const src1 = 0
const dst1 = 3
const k1 = 1
const res1 = 700

{
  check(` case 1 `, findCheapestPrice(n1, flights1, src1, dst1, k1), res1)
}

export { }
