"""
133. Clone Graph
Difficulty: Medium

Given a reference of a node in a connected undirected graph, return a deep copy
(clone) of the graph.
"""

from collections import deque
from typing import Dict, List, Optional


class Node:
    def __init__(self, val: int = 0, neighbors: "Optional[List[Node]]" = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


def clone_graph_dfs(node: Optional[Node]) -> Optional[Node]:
    if node is None:
        return None

    cloned: Dict[Node, Node] = {}

    def dfs(original: Node) -> Node:
        if original in cloned:
            return cloned[original]
        copy = Node(original.val)
        cloned[original] = copy
        for neighbor in original.neighbors:
            copy.neighbors.append(dfs(neighbor))
        return copy

    return dfs(node)


def clone_graph_bfs(node: Optional[Node]) -> Optional[Node]:
    if node is None:
        return None

    cloned: Dict[Node, Node] = {node: Node(node.val)}
    queue = deque([node])

    while queue:
        current = queue.popleft()
        current_clone = cloned[current]
        for neighbor in current.neighbors:
            if neighbor not in cloned:
                cloned[neighbor] = Node(neighbor.val)
                queue.append(neighbor)
            current_clone.neighbors.append(cloned[neighbor])

    return cloned[node]


def build_graph(adj_list: List[List[int]]) -> Optional[Node]:
    if not adj_list:
        return None
    nodes = [Node(i + 1) for i in range(len(adj_list))]
    for i, neighbors in enumerate(adj_list):
        for neighbor in neighbors:
            nodes[i].neighbors.append(nodes[neighbor - 1])
    return nodes[0]


def to_adj_list(node: Optional[Node]) -> Dict[int, List[int]]:
    """Serialize a graph to {val: [neighbor vals]} for comparison."""
    result: Dict[int, List[int]] = {}
    if node is None:
        return result
    seen = set()
    queue = deque([node])
    seen.add(node)
    while queue:
        cur = queue.popleft()
        result[cur.val] = [n.val for n in cur.neighbors]
        for n in cur.neighbors:
            if n not in seen:
                seen.add(n)
                queue.append(n)
    return result


if __name__ == "__main__":
    adj = [[2, 4], [1, 3], [2, 4], [1, 3]]
    graph = build_graph(adj)
    expected = to_adj_list(graph)

    dfs_clone = clone_graph_dfs(graph)
    bfs_clone = clone_graph_bfs(graph)

    # Clones must be structurally identical but be different objects.
    assert to_adj_list(dfs_clone) == expected
    assert to_adj_list(bfs_clone) == expected
    assert dfs_clone is not graph
    assert clone_graph_dfs(None) is None
    print("133 OK:", to_adj_list(bfs_clone))
