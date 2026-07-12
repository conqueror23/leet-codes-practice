"""
1091. Shortest Path in Binary Matrix
Difficulty: Medium

Given an n x n binary matrix grid, return the length of the shortest clear
path from top-left (0,0) to bottom-right (n-1,n-1). A clear path moves through
0-cells in 8 directions. Return -1 if no such path exists.
"""

from collections import deque
from typing import List


DIRECTIONS = [
    (0, 1), (0, -1), (1, 0), (-1, 0),
    (1, 1), (-1, 1), (1, -1), (-1, -1),
]


def shortest_path_binary_matrix(grid: List[List[int]]) -> int:
    n = len(grid)
    if grid[0][0] != 0 or grid[n - 1][n - 1] != 0:
        return -1

    visited = [[False] * n for _ in range(n)]
    visited[0][0] = True
    queue = deque([(0, 0, 1)])

    while queue:
        x, y, dist = queue.popleft()
        if x == n - 1 and y == n - 1:
            return dist

        for dx, dy in DIRECTIONS:
            nx, ny = x + dx, y + dy
            if 0 <= nx < n and 0 <= ny < n and not visited[nx][ny] and grid[nx][ny] == 0:
                visited[nx][ny] = True
                queue.append((nx, ny, dist + 1))

    return -1


if __name__ == "__main__":
    assert shortest_path_binary_matrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]]) == 4
    assert shortest_path_binary_matrix([[0, 1], [1, 0]]) == 2
    assert shortest_path_binary_matrix([[1, 0, 0], [1, 1, 0], [1, 1, 0]]) == -1
    assert shortest_path_binary_matrix([[0]]) == 1
    print("1091 OK")
