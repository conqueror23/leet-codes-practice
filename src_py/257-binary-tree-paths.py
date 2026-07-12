"""
257. Binary Tree Paths
Difficulty: Easy

Given the root of a binary tree, return all root-to-leaf paths in any order.
A leaf is a node with no children.
"""

from typing import List, Optional


class TreeNode:
    def __init__(self, val: int = 0,
                 left: "Optional[TreeNode]" = None,
                 right: "Optional[TreeNode]" = None):
        self.val = val
        self.left = left
        self.right = right


def binary_tree_paths(root: Optional[TreeNode]) -> List[str]:
    result: List[str] = []

    def dfs(node: Optional[TreeNode], path: str) -> None:
        if node is None:
            return
        path = path + str(node.val) if path == "" else path + "->" + str(node.val)
        if node.left is None and node.right is None:
            result.append(path)
            return
        dfs(node.left, path)
        dfs(node.right, path)

    dfs(root, "")
    return result


if __name__ == "__main__":
    # Tree:   1
    #        / \
    #       2   3
    #        \
    #         5
    root = TreeNode(1, TreeNode(2, None, TreeNode(5)), TreeNode(3))
    assert sorted(binary_tree_paths(root)) == sorted(["1->2->5", "1->3"])
    assert binary_tree_paths(TreeNode(1)) == ["1"]
    assert binary_tree_paths(None) == []
    print("257 OK:", binary_tree_paths(root))
