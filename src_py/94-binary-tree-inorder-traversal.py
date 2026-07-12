"""
94. Binary Tree Inorder Traversal
Difficulty: Easy

Given the root of a binary tree, return the inorder traversal of its nodes'
values (left, node, right).
"""

from typing import List, Optional


class TreeNode:
    def __init__(self, val: int = 0,
                 left: "Optional[TreeNode]" = None,
                 right: "Optional[TreeNode]" = None):
        self.val = val
        self.left = left
        self.right = right


def inorder_traversal(root: Optional[TreeNode]) -> List[int]:
    result: List[int] = []
    stack: List[TreeNode] = []
    node = root

    while stack or node:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        result.append(node.val)
        node = node.right

    return result


if __name__ == "__main__":
    # Tree:  1
    #         \
    #          2
    #         /
    #        3
    root = TreeNode(1, None, TreeNode(2, TreeNode(3)))
    assert inorder_traversal(root) == [1, 3, 2]
    assert inorder_traversal(None) == []
    assert inorder_traversal(TreeNode(1)) == [1]
    print("94 OK:", inorder_traversal(root))
