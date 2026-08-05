import { check } from "./utils/check";

function search(nums: number[], target: number): number {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) return mid

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
};


const nums1 = [4, 5, 6, 7, 0, 1, 2]
const target1 = 0
const res1 = 4

{
  check(`case 1 - ${res1}`, search(nums1, target1), res1)
}

export { }
