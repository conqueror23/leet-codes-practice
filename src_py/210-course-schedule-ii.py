"""
210. Course Schedule II
Difficulty: Medium

Return the ordering of courses you should take to finish all courses. If it is
impossible, return an empty list. As a follow-up, find *all* valid orderings.
"""

from collections import deque
from typing import List


def find_order(num_courses: int, prerequisites: List[List[int]]) -> List[int]:
    graph: List[List[int]] = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1

    queue = deque(c for c in range(num_courses) if indegree[c] == 0)
    order: List[int] = []

    while queue:
        current = queue.popleft()
        order.append(current)
        for nxt in graph[current]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)

    return order if len(order) == num_courses else []


def find_all_orders(num_courses: int, prerequisites: List[List[int]]) -> List[List[int]]:
    graph: List[List[int]] = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1

    result: List[List[int]] = []
    path: List[int] = []
    used = [False] * num_courses

    def backtrack() -> None:
        if len(path) == num_courses:
            result.append(path[:])
            return
        for course in range(num_courses):
            if not used[course] and indegree[course] == 0:
                used[course] = True
                path.append(course)
                for nxt in graph[course]:
                    indegree[nxt] -= 1

                backtrack()

                for nxt in graph[course]:
                    indegree[nxt] += 1
                path.pop()
                used[course] = False

    backtrack()
    return result


if __name__ == "__main__":
    order = find_order(4, [[1, 0], [2, 0], [3, 1], [3, 2]])
    # Valid topological order: 0 first, 3 last.
    assert order[0] == 0 and order[-1] == 3
    assert find_order(2, [[1, 0], [0, 1]]) == []
    assert find_order(2, [[1, 0]]) == [0, 1]

    all_orders = find_all_orders(4, [[1, 0], [2, 0], [3, 1], [3, 2]])
    expected = [[0, 1, 2, 3], [0, 2, 1, 3]]
    assert sorted(all_orders) == sorted(expected), all_orders
    print("210 OK:", all_orders)
