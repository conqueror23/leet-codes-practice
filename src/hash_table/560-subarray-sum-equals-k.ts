import { check } from "../utils/check"

//we are aiming at continues elements
function subarraySumB(nums: number[], k: number): number {
  let count = 0

  for (let start = 0; start < nums.length; start++) {
    let sum = 0

    for (let end = start; end < nums.length; end++) {
      sum += nums[end]

      if (sum === k) {
        count++
      }
    }
  }
  return count
};

function subarraySumPre(nums: number[], k: number): number {
  let count = 0
  let prefixSum = 0

  const prefixCount = new Map<number, number>()
  prefixCount.set(0, 1)

  for (const num of nums) {
    prefixSum += num

    count += prefixCount.get(prefixSum - k) ?? 0

    prefixCount.set(
      prefixSum,
      (prefixCount.get(prefixSum) ?? 0) + 1
    )
  }

  return count
}

function subarraySumAll(nums: number[], k: number): number[][] {
  let prefixSum = 0
  const result: number[][] = []

  const boundaries = new Map<number, number[]>()
  boundaries.set(0, [0])

  for (let end = 0; end < nums.length; end++) {
    prefixSum += nums[end - 1]

    const starts = boundaries.get(prefixSum - k) ?? []

    for (const previousEnd of starts) {
      result.push([previousEnd, end - 1])
    }

    const current = boundaries.get(prefixSum) ?? []
    current.push(end)
    boundaries.set(prefixSum, current)
  }

  return result
}

function subarraySumAll2(nums: number[], k: number): number[][] {
  let prefixSum = 0
  const results: Array<[number, number]> = []
  const boundaries = new Map<number, number[]>([[0, [0]]])

  for (let endBoundary = 1; endBoundary <= nums.length; endBoundary++) {
    prefixSum += nums[endBoundary - 1]

    console.log("",)

    for (const startBoundary of boundaries.get(prefixSum - k) ?? []) {
      results.push([startBoundary, endBoundary - 1])
    }

    const positions = boundaries.get(prefixSum) ?? []
    positions.push(endBoundary)
    boundaries.set(prefixSum, positions)
  }

  return results
}

const nums1 = [1, 1, 1], k1 = 2
const res1 = 2


const nums2 = [1, 2, 3], k2 = 3
const res2 = 2

const nums3 = [-1, -1, 1], k3 = 0
const res3 = 1


const nums4 = [1, -1, 0, 0, 0], k4 = 0
const res4 = 6

{

  // const start = performance.now();
  // check(`case 1`, subarraySum(nums1, k1), res1)
  //
  // check(`case 2`, subarraySum(nums2, k2), res2)
  //
  // check(`case 3`, subarraySumAll(nums3, k3), res3)

  check(`case 4`, subarraySumAll2(nums4, k4), res4)
  // const end = performance.now();

  // console.log(`Run time: ${end - start} ms`);
}

export { }
