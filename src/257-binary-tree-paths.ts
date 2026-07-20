import { check } from "./utils/check"

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function helper(node: TreeNode, path: string, result: string[]) {
  if (!node?.left && !node?.right) {
    result.push(path + node.val)
    return
  }
  const currentPath = path + node.val + '->'

  if (node.left) helper(node.left, currentPath, result)
  if (node.right) helper(node.right, currentPath, result)
}

function binaryTreePaths(root: TreeNode | null): string[] {
  if (!root) return []
  const result: string[] = []
  helper(root, "", result)
  return result
};


// ---- tests ----
{

  // case1: [1,2,3,null,5]
  const tree1 = new TreeNode(1,
    new TreeNode(2, null, new TreeNode(5)),
    new TreeNode(3))
  check("case1 [1,2,3,null,5]", binaryTreePaths(tree1), ["1->2->5", "1->3"])

  // case2: single node
  check("case2 [1]", binaryTreePaths(new TreeNode(1)), ["1"])

  // case3: empty tree
  check("case3 empty", binaryTreePaths(null), [])

  // case4: left-skewed chain 1->2->4
  const tree4 = new TreeNode(1, new TreeNode(2, new TreeNode(4)))
  check("case4 left chain", binaryTreePaths(tree4), ["1->2->4"])
}

// WIP: array-to-tree builder attempt, kept for reference
// const testTreeNode = [1, 2, 3, null, 5]
// convert to tree?
//
// function generateTree(array: number[]) {
//   let tree = new TreeNode(array[0])
//
//   const getLevel = (index: number) => {
//     return Math.log2(index + 1)
//   }
//
//   //this for 1st level,
//   //        for 2nd level
//   for (let index = 1; index <= array.length - 1; index++) {
//     //level 1
//     //left
//     //incorrect as you need to know the level first
//     if (index % 2 === 0) {
//       const leftNode = new TreeNode(array[index])
//       tree = new TreeNode(tree.val, leftNode)
//     }
//     //right
//     const rightNode = new TreeNode(array[index])
//     tree = new TreeNode(tree.val, tree.left, rightNode)
//   }
// }

// make this file a module so its declarations stay file-scoped
export {}
