"""
207. Course Schedule
Difficulty: Medium

There are numCourses courses labeled 0..numCourses-1. prerequisites[i] =
[a, b] means you must take course b before course a. Return true if you can
finish all courses (i.e., the dependency graph has no cycle).
"""

from collections import deque
from typing import List


def can_finish_bfs(num_courses: int, prerequisites: List[List[int]]) -> bool:
    graph: List[List[int]] = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1

    queue = deque(c for c in range(num_courses) if indegree[c] == 0)
    completed = 0

    while queue:
        current = queue.popleft()
        completed += 1
        for nxt in graph[current]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)

    return completed == num_courses


def can_finish_dfs(num_courses: int, prerequisites: List[List[int]]) -> bool:
    graph: List[List[int]] = [[] for _ in range(num_courses)]
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    # 0 = unvisited, 1 = visiting (on stack), 2 = done
    state = [0] * num_courses

    def has_cycle(node: int) -> bool:
        if state[node] == 1:
            return True
        if state[node] == 2:
            return False
        state[node] = 1
        for nxt in graph[node]:
            if has_cycle(nxt):
                return True
        state[node] = 2
        return False

    return not any(has_cycle(c) for c in range(num_courses))


if __name__ == "__main__":
    assert can_finish_bfs(2, [[1, 0]]) is True
    assert can_finish_bfs(2, [[1, 0], [0, 1]]) is False
    assert can_finish_bfs(4, [[1, 0], [2, 0], [3, 1], [3, 2]]) is True

    assert can_finish_dfs(2, [[1, 0]]) is True
    assert can_finish_dfs(2, [[1, 0], [0, 1]]) is False
    assert can_finish_dfs(4, [[1, 0], [2, 0], [3, 1], [3, 2]]) is True
    print("207 OK")
