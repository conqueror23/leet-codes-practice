function countBits(n: number): number[] {
  const result: number[] = []
  for (let c = 0; c <= n; c++) {
    const cBin = c.toString(2)
    const bit = cBin.split("").reduce((acc, c) => acc + Number(c), 0)

    result.push(bit)
  }
  return result
};


console.log('5', countBits(9))
//




