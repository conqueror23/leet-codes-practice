"""
118. Pascal's Triangle
Difficulty: Easy

Given an integer numRows, return the first numRows of Pascal's triangle.
"""

from typing import List


def generate(num_rows: int) -> List[List[int]]:
    triangle: List[List[int]] = []
    for i in range(num_rows):
        row = [1] * (i + 1)
        for j in range(1, i):
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
        triangle.append(row)
    return triangle


if __name__ == "__main__":
    assert generate(5) == [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
    ]
    assert generate(1) == [[1]]
    assert generate(0) == []
    print("118 OK:", generate(5))
