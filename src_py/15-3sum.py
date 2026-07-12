"""
15. 3Sum
Difficulty: Medium

Given an integer array nums, return all the triplets [nums[i], nums[j],
nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.
The solution set must not contain duplicate triplets.
"""

from typing import List


def three_sum(nums: List[int]) -> List[List[int]]:
    nums = sorted(nums)
    n = len(nums)
    result: List[List[int]] = []

    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue  # skip duplicate anchors
        if nums[i] > 0:
            break

        left, right = i + 1, n - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1

    return result


def _normalize(triplets: List[List[int]]) -> set:
    return {tuple(t) for t in triplets}


if __name__ == "__main__":
    assert _normalize(three_sum([-1, 0, 1, 2, -1, -4])) == {(-1, -1, 2), (-1, 0, 1)}
    assert three_sum([0, 1, 1]) == []
    assert three_sum([0, 0, 0]) == [[0, 0, 0]]
    print("15 OK:", three_sum([-1, 0, 1, 2, -1, -4]))
