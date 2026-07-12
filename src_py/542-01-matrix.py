"""
542. 01 Matrix
Difficulty: Medium

Given an m x n binary matrix mat, return the distance of the nearest 0 for
each cell. The distance between two adjacent cells is 1.
"""

from collections import deque
from typing import List


DIRECTIONS = [(0, 1), (0, -1), (1, 0), (-1, 0)]


def update_matrix_bfs(mat: List[List[int]]) -> List[List[int]]:
    rows, cols = len(mat), len(mat[0])
    dist = [[-1] * cols for _ in range(rows)]
    queue = deque()

    for r in range(rows):
        for c in range(cols):
            if mat[r][c] == 0:
                dist[r][c] = 0
                queue.append((r, c))

    while queue:
        r, c = queue.popleft()
        for dr, dc in DIRECTIONS:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))

    return dist


def update_matrix_dp(mat: List[List[int]]) -> List[List[int]]:
    rows, cols = len(mat), len(mat[0])
    INF = float("inf")
    dist = [[0 if mat[r][c] == 0 else INF for c in range(cols)] for r in range(rows)]

    # Pass 1: from top-left
    for r in range(rows):
        for c in range(cols):
            if r > 0:
                dist[r][c] = min(dist[r][c], dist[r - 1][c] + 1)
            if c > 0:
                dist[r][c] = min(dist[r][c], dist[r][c - 1] + 1)

    # Pass 2: from bottom-right
    for r in range(rows - 1, -1, -1):
        for c in range(cols - 1, -1, -1):
            if r < rows - 1:
                dist[r][c] = min(dist[r][c], dist[r + 1][c] + 1)
            if c < cols - 1:
                dist[r][c] = min(dist[r][c], dist[r][c + 1] + 1)

    return dist


if __name__ == "__main__":
    mat = [[0, 0, 0], [0, 1, 0], [1, 1, 1]]
    expected = [[0, 0, 0], [0, 1, 0], [1, 2, 1]]
    assert update_matrix_bfs(mat) == expected
    assert update_matrix_dp(mat) == expected

    mat2 = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    assert update_matrix_bfs(mat2) == [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    assert update_matrix_dp(mat2) == [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    print("542 OK:", update_matrix_bfs(mat))
