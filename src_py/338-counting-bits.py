"""
338. Counting Bits
Difficulty: Easy

Given an integer n, return an array ans of length n + 1 such that for each i
(0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
"""

from typing import List


def count_bits(n: int) -> List[int]:
    result = [0] * (n + 1)
    for i in range(1, n + 1):
        # i >> 1 has all bits of i except the lowest; add back the lowest bit.
        result[i] = result[i >> 1] + (i & 1)
    return result


if __name__ == "__main__":
    assert count_bits(2) == [0, 1, 1]
    assert count_bits(5) == [0, 1, 1, 2, 1, 2]
    assert count_bits(9) == [0, 1, 1, 2, 1, 2, 2, 3, 1, 2]
    assert count_bits(0) == [0]
    print("338 OK:", count_bits(9))
