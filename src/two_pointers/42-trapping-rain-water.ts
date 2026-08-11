import { check } from "../utils/check"

function trap(height: number[]): number {
  let left = 0;
  let right = height.length - 1;

  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] <= height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }

  return water;

};

const height1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
const res1 = 6

{
  check(`case 1`, trap(height1), res1)
}

export { }
