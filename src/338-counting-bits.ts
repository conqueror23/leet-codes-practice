function countBits(n: number): number[] {
  const result: number[] = []
  for (let c = 0; c <= n; c++) {
    const cBin = c.toString(2)
    const bit = cBin.split("").reduce((acc, c) => acc + Number(c), 0)

    result.push(bit)
  }
  return result
};


// ---- tests ----
{
  const check = (name: string, actual: unknown, expected: unknown): void => {
    console.log(JSON.stringify(actual) === JSON.stringify(expected)
      ? `PASS ${name}`
      : `FAIL ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }

  check("case1 n=0", countBits(0), [0])
  check("case2 n=2", countBits(2), [0, 1, 1])
  check("case3 n=5", countBits(5), [0, 1, 1, 2, 1, 2])
  check("case4 n=9", countBits(9), [0, 1, 1, 2, 1, 2, 2, 3, 1, 2])
}

// make this file a module so its declarations stay file-scoped
export {}
