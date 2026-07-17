function threeSum(nums: number[]): number[][] {
  const result = new Map<string, number[]>()
  const sortedNums = nums.sort((a, b) => a - b)
  let start = 0
  let end = sortedNums.length - 1
  let mid = start + 1

  while (start < end) {
    while (mid < end) {
      if (sortedNums[start] + sortedNums[mid] + sortedNums[end] > 0) {
        end--
        continue
      }
      if (sortedNums[start] + sortedNums[mid] + sortedNums[end] < 0) {
        mid++
        continue
      }
      const key = `${sortedNums[start]}${sortedNums[mid]}${sortedNums[end]}`
      result.set(key, [sortedNums[start], sortedNums[mid], sortedNums[end]])
      end--
      continue
    }
    start++
    mid = start + 1
    end = sortedNums.length - 1
  }

  return [...result.values()]
};



// ---- tests ----
{
  // triplets can come back in any order, so normalize before comparing
  const normalize = (triplets: number[][]): number[][] =>
    triplets
      .map(t => [...t].sort((a, b) => a - b))
      .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))

  const check = (name: string, actual: number[][], expected: number[][]): void => {
    const a = JSON.stringify(normalize(actual))
    const e = JSON.stringify(normalize(expected))
    console.log(a === e ? `PASS ${name}` : `FAIL ${name}: expected ${e}, got ${a}`)
  }

  check("case1 [-1,0,1,2,-1,-4]", threeSum([-1, 0, 1, 2, -1, -4]), [[-1, -1, 2], [-1, 0, 1]])
  check("case2 [0,1,1] no triplet", threeSum([0, 1, 1]), [])
  check("case3 [0,0,0]", threeSum([0, 0, 0]), [[0, 0, 0]])
  check("case4 [1,2,3,0,-2,-3,-1]", threeSum([1, 2, 3, 0, -2, -3, -1]),
    [[-3, 0, 3], [-3, 1, 2], [-2, -1, 3], [-2, 0, 2], [-1, 0, 1]])
  check("case5 [3,0,-2,-1,1,2]", threeSum([3, 0, -2, -1, 1, 2]),
    [[-2, -1, 3], [-2, 0, 2], [-1, 0, 1]])
}

// make this file a module so its declarations stay file-scoped
export {}
