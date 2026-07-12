"""
210. Course Schedule II - practice variants
Difficulty: Medium

Extra practice implementations: one valid order, all orders via backtracking,
and all orders via an explicit stack (iterative).
"""

from typing import List


def find_one_order(num_courses: int, prerequisites: List[List[int]]) -> List[int]:
    """Kahn's algorithm producing a single topological order (or []). """
    graph: List[List[int]] = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1

    stack = [c for c in range(num_courses) if indegree[c] == 0]
    order: List[int] = []
    while stack:
        node = stack.pop()
        order.append(node)
        for nxt in graph[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                stack.append(nxt)

    return order if len(order) == num_courses else []


def find_all_orders_backtracking(num_courses: int, prerequisites: List[List[int]]) -> List[List[int]]:
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


def find_all_orders_iterative(num_courses: int, prerequisites: List[List[int]]) -> List[List[int]]:
    graph: List[List[int]] = [[] for _ in range(num_courses)]
    initial_indegree = [0] * num_courses
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        initial_indegree[course] += 1

    result: List[List[int]] = []
    # State: (path, indegree, used)
    stack = [([], initial_indegree, [False] * num_courses)]

    while stack:
        path, indegree, used = stack.pop()
        if len(path) == num_courses:
            result.append(path)
            continue
        for course in range(num_courses):
            if not used[course] and indegree[course] == 0:
                new_indegree = indegree[:]
                new_used = used[:]
                new_used[course] = True
                for nxt in graph[course]:
                    new_indegree[nxt] -= 1
                stack.append((path + [course], new_indegree, new_used))

    return result


if __name__ == "__main__":
    prereq = [[1, 0], [2, 0], [3, 1], [3, 2]]
    expected = [[0, 1, 2, 3], [0, 2, 1, 3]]

    one = find_one_order(4, prereq)
    assert one[0] == 0 and one[-1] == 3

    assert sorted(find_all_orders_backtracking(4, prereq)) == sorted(expected)
    assert sorted(find_all_orders_iterative(4, prereq)) == sorted(expected)
    print("210-practice OK:", find_all_orders_iterative(4, prereq))
