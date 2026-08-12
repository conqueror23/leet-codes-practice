import { check } from "../utils/check"

function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const refMap = new Map<number, number>()
  for (let index = 0; index < nums2.length; index++) {
    refMap.set(nums2[index], index)
  }

  const answer: number[] = []

  for (const currentNum of nums1) {
    const index = refMap.get(currentNum)!
    let j = index + 1
    let nextGreater = -1

    while (j < nums2.length) {
      if (nums2[j] > currentNum) {
        nextGreater = nums2[j]
        break
      }
      j++
    }
    answer.push(nextGreater)
  }
  return answer
};

function nextGreaterElementOpt(nums1: number[], nums2: number[]): number[] {
  const nextGreaterMap = new Map<number, number>()
  const stack: number[] = [nums2[0]]

  let index = 1
  while (index < nums2.length + 1) {
    const pre = stack.pop()!
    const currentNum = nums2[index]

    if (currentNum > pre) {
      nextGreaterMap.set(pre, currentNum)
    } else {
      nextGreaterMap.set(pre, -1)
    }
    stack.push(nums2[index])
    index++
  }

  const answer: number[] = []
  for (const num of nums1) {
    answer.push(nextGreaterMap.get(num)!)
  }
  return answer
}

function nextGreaterElementMono(nums1: number[], nums2: number[]): number[] {
  const nextGreaterMap = new Map<number, number>()
  const stack: number[] = []
  for (const num of nums2) {
    while (
      stack.length > 0 &&
      num > stack[stack.length - 1]
    ) {
      const pre = stack.pop()!
      nextGreaterMap.set(pre, num)

    }
    stack.push(num)
  }
  return nums1.map(num => nextGreaterMap.get(num) ?? -1)
}

function nextGreaterElementHack(nums1: number[], nums2: number[]): number[] {
  const nextGreaterMap = new Map<number, number>()
  const stack: number[] = []
  for (const num of nums2) {
    while (stack.length > 0 && stack[stack.length - 1] < num) {
      const smaller = stack.pop()!
      nextGreaterMap.set(smaller, num)
    }
    stack.push(num)
  }
  return nums1.map(num => nextGreaterMap.get(num) ?? -1)
}

const nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]
const output1 = [-1, 3, -1]
{
  check(`case 1`, nextGreaterElementMono(nums1, nums2), output1)
}

export { }
