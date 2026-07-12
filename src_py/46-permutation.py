"""
46. Permutations
Difficulty: Medium

Given an array nums of distinct integers, return all the possible permutations
in any order.
"""

from typing import List


def permute(nums: List[int]) -> List[List[int]]:
    result: List[List[int]] = []
    path: List[int] = []
    used = [False] * len(nums)

    def backtrack() -> None:
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True
            path.append(nums[i])
            backtrack()
            path.pop()
            used[i] = False

    backtrack()
    return result


if __name__ == "__main__":
    got = permute([1, 2, 3])
    expected = [
        [1, 2, 3], [1, 3, 2],
        [2, 1, 3], [2, 3, 1],
        [3, 1, 2], [3, 2, 1],
    ]
    assert sorted(got) == sorted(expected), got
    assert permute([1]) == [[1]]
    assert sorted(permute([0, 1])) == [[0, 1], [1, 0]]
    print("46 OK:", got)
