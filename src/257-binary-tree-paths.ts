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
  const currentPath = node.val + path + '->'

  if (node.left) helper(node.left, currentPath, result)
  if (node.right) helper(node.right, currentPath, result)
}

function binaryTreePaths(root: TreeNode | null): string[] {
  const result = []
  helper(root!, "", result)
  return result
};


const testTreeNode = [1, 2, 3, null, 5]
// convert to tree?

function generateTree(array: number[]) {
  let tree = new TreeNode(array[0])

  const getLevel = (index: number) => {
    return Math.log2(index + 1)
  }

  //this for 1st level, 
  //        for 2nd level
  for (let index = 1; index <= array.length - 1; index++) {
    //level 1
    //left
    //incorrect as you need to know the level first
    if (index % 2 === 0) {
      const leftNode = new TreeNode(array[index])
      tree = new TreeNode(tree.val, leftNode)
    }
    //right
    const rightNode = new TreeNode(array[index])
    tree = new TreeNode(tree.val, tree.left, rightNode)
  }
}
