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


function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const stack: TreeNode[] = [];
  const result: number[] = [];

  while (stack.length > 0 || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    const popped = stack.pop();
    if (!popped) break;
    result.push(popped.val);
    root = popped.right;
  }

  return result;
}

// ---- tests ----
{

  // case1: [1,null,2,3] — right child with left grandchild
  const tree1 = new TreeNode(1, null, new TreeNode(2, new TreeNode(3)))
  check("case1 [1,null,2,3]", inorderTraversal(tree1), [1, 3, 2])

  // case2: empty tree
  check("case2 empty", inorderTraversal(null), [])

  // case3: single node
  check("case3 [1]", inorderTraversal(new TreeNode(1)), [1])

  // case4: full tree [1,2,3,4,5]
  const tree4 = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3))
  check("case4 [1,2,3,4,5]", inorderTraversal(tree4), [4, 2, 5, 1, 3])
}

// make this file a module so its declarations stay file-scoped
export {}
