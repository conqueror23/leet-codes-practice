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
