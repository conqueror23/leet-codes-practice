"""
417. Pacific Atlantic Water Flow
Difficulty: Medium

Given an m x n grid of heights, return the coordinates where rain water can
flow to both the Pacific ocean (top/left edges) and the Atlantic ocean
(bottom/right edges). Water flows from a cell to a neighbor of equal or lower
height.
"""

from typing import List


DIRECTIONS = [(1, 0), (-1, 0), (0, 1), (0, -1)]


def pacific_atlantic(heights: List[List[int]]) -> List[List[int]]:
    if not heights or not heights[0]:
        return []

    rows, cols = len(heights), len(heights[0])
    pacific = [[False] * cols for _ in range(rows)]
    atlantic = [[False] * cols for _ in range(rows)]

    def dfs(starts, visited):
        stack = []
        for r, c in starts:
            if not visited[r][c]:
                visited[r][c] = True
                stack.append((r, c))
        while stack:
            r, c = stack.pop()
            for dr, dc in DIRECTIONS:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc] \
                        and heights[nr][nc] >= heights[r][c]:
                    visited[nr][nc] = True
                    stack.append((nr, nc))

    pacific_starts = [(0, c) for c in range(cols)] + [(r, 0) for r in range(rows)]
    atlantic_starts = [(rows - 1, c) for c in range(cols)] + [(r, cols - 1) for r in range(rows)]

    dfs(pacific_starts, pacific)
    dfs(atlantic_starts, atlantic)

    return [[r, c] for r in range(rows) for c in range(cols)
            if pacific[r][c] and atlantic[r][c]]


if __name__ == "__main__":
    heights = [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
    ]
    expected = [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
    got = pacific_atlantic(heights)
    assert sorted(got) == sorted(expected), got
    print("417 OK:", got)
