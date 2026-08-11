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
    //0
    count += prefixCount.get(prefixSum - k) ?? 0

    prefixCount.set(
      prefixSum,
      (prefixCount.get(prefixSum) ?? 0) + 1
    )
    console.log('num,prcount,sum,count', num, prefixCount, prefixSum, count);
  }

  return count
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
  check(`case 3`, subarraySumPre(nums3, k3), res3)

  check(`case 4`, subarraySumPre(nums4, k4), res4)
  // const end = performance.now();

  // console.log(`Run time: ${end - start} ms`);
}

export { }
