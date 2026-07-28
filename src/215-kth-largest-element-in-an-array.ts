import { check } from "./utils/check"


function findKthLargest(nums: number[], k: number): number {
  const targetIndex = nums.length - k

  const quickSelect = (left: number, right: number): number => {
    const pivotIndex = partition(left, right)
    if (pivotIndex === targetIndex) return nums[pivotIndex]
    if (pivotIndex < targetIndex) return quickSelect(pivotIndex + 1, right)
    return quickSelect(left, pivotIndex - 1)
  }

  const partition = (left: number, right: number): number => {
    const pivot = nums[right]
    let storeIndex = left

    for (let i = left; i < right; i++) {
      // when that numb is <pivot
      if (nums[i] < pivot) {
        [nums[i], nums[storeIndex]] = [nums[storeIndex], nums[i]]
        storeIndex++
      }
    }

    //storeIndex locked there
    [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]]
    //each time it move one values there and returns where it actually make a difference
    return storeIndex
  }
  return quickSelect(0, nums.length - 1)
};

const nums = [3, 2, 1, 5, 6, 4]
const k = 5
const res = 2

const nums1 = [3, 2, 3, 1, 2, 4, 5, 5, 6]
const k1 = 4
const res1 = 4

const nums2 = [2, 1]
const k2 = 2
const res2 = 1

{
  check(`case 1 ${nums} , k ${k} - res = ${res}`, findKthLargest(nums, k), res)

  // check(`case 2 ${nums1} , k ${k1} - res = ${res1}`, findKthLargest(nums1, k1), res1)
  //
  // check(`case 2 ${nums2} , k ${k2} - res = ${res2}`, findKthLargest(nums2, k2), res2)
}

export { }
