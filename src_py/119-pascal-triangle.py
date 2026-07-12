"""
119. Pascal's Triangle II
Difficulty: Easy

Given an integer rowIndex, return the rowIndex-th (0-indexed) row of Pascal's
triangle.
"""

from typing import List


def get_row(row_index: int) -> List[int]:
    row_above: List[int] = []
    for y in range(row_index + 1):
        row = [1] * (y + 1)
        for x in range(1, y):
            row[x] = row_above[x - 1] + row_above[x]
        row_above = row
    return row_above


if __name__ == "__main__":
    assert get_row(0) == [1]
    assert get_row(1) == [1, 1]
    assert get_row(3) == [1, 3, 3, 1]
    assert get_row(4) == [1, 4, 6, 4, 1]
    print("119 OK:", get_row(3))
