import { check } from "./utils/check"

function topKFrequent(nums: number[], k: number): number[] {
  const frequent: number[] = []

  const frequentMap = new Map<number, number>()

  for (const num of nums) {
    if (!frequentMap.has(num)) {
      frequentMap.set(num, 1)
      continue
    }
    const current = frequentMap.get(num)!
    frequentMap.set(num, current + 1)
  }

  const base = Array.from(frequentMap.entries())
  console.log('base', base)

  const temp = base
    .sort((a, b) => b[1] - a[1])
  console.log(temp)

  const slices = temp.slice(0, k)
  console.log(slices)


  return Array.from(frequentMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);

};

function topKFrequentOpt(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();

  // 1. Count frequency of each number
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) ?? 0) + 1);
  }

  // 2. Create buckets
  // bucket[i] stores all numbers that appear i times
  const buckets: number[][] = Array.from(
    { length: nums.length + 1 },
    () => []
  );

  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  const result: number[] = [];

  for (let freq = buckets.length - 1; freq >= 0; freq--) {
    for (const num of buckets[freq]) {
      result.push(num);

      if (result.length === k) {
        return result;
      }
    }
  }

  return result;
}


// const nums1 = [1, 1, 1, 2, 2, 3]

const nums1 = [3, 1, 1, 1, 2, 2]
const k1 = 2
const output1 = [1, 2]


const nums2 = [1]
const k2 = 1
const output2 = [1]


const nums3 = [1, 2, 1, 2, 1, 2, 3, 1, 3, 2]
const k3 = 2

const output3 = [1, 2]

{
  check(`topK1 ${nums1} = ${k1}`, topKFrequent(nums1, k1), output1)
  // check(`topK2 ${nums2} = ${k2}`, topKFrequent(nums2, k2), output2)
  // check(`topK3 ${nums3} = ${k3}`, topKFrequent(nums3, k3), output3)
}


export { } 
