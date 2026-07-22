"""
102. Binary Tree Level Order Traversal
Difficulty: Medium

Given the root of a binary tree, return the level order traversal of its
nodes' values. (i.e., from left to right, level by level).
"""

from collections import deque
from typing import List, Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: "Optional[TreeNode]" = None,
        right: "Optional[TreeNode]" = None,
    ):
        self.val = val
        self.left = left
        self.right = right


def build_tree_new(values: List[Optional[int]]) -> Optional[TreeNode]:
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    queue = deque([root])
    i = 0
    while i < len(values) and queue:
        node = queue.popleft()
        if i < len(values):
            current = values[i]
            if current is not None:
                node.left = TreeNode(current)
                queue.append(node.left)
        i += 1
        if i < len(values):
            current = values[i]
            if current is not None:
                node.right = TreeNode(current)
                queue.append(node.right)
        i += 1
    return root


def build_tree(values: List[Optional[int]]) -> Optional[TreeNode]:
    if not values or values[0] is None:
        return None

    root = TreeNode(values[0])
    queue = deque([root])
    i = 1

    while i < len(values) and queue:
        node = queue.popleft()

        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])  # pyright: ignore
            queue.append(node.left)
        i += 1

        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])  # pyright: ignore
            queue.append(node.right)
        i += 1

    return root


def level_order(root: Optional[TreeNode]) -> List[List[int]]:
    if root is None:
        return []

    result: List[List[int]] = []
    queue = deque([root])

    while queue:
        level: List[int] = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)

    return result


if __name__ == "__main__":
    node_list = [3, 9, 20, None, None, 15, 7]
    root = build_tree(node_list)
    new_root = build_tree_new(node_list)
    print("root node", new_root)
    assert level_order(root) == [[3], [9, 20], [15, 7]]
    assert level_order(build_tree([1])) == [[1]]
    assert level_order(build_tree([])) == []
    print("102 OK:", level_order(root))
