class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

function buildTree(values: Array<number | null>): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null

  const root = new TreeNode(values[0])
  const queue: TreeNode[] = [root]
  let i = 1;

  while (i < values.length && queue.length > 0) {
    const node = queue.shift()!;

    const leftValue = values[i];
    i++;

    if (leftValue !== undefined && leftValue !== null) {
      node.left = new TreeNode(leftValue)
      queue.push(node.left)
    }

    const rightValue = values[i];

    i++;
    if (rightValue !== undefined && rightValue !== null) {
      node.right = new TreeNode(rightValue)
      queue.push(node.right)
    }
  }

  return root
}


function levelOrder(root: TreeNode | null): number[][] {
  if (root === null || root.val === null) return []

  const result: number[][] = []
  let queue = [root]


  while (queue.length > 0) {
    const level: number[] = []
    const levelQueue = [...queue]
    queue = []

    for (const node of levelQueue) {
      if (node.val !== undefined && node.val !== null) level.push(node.val)

      if (node.left?.val !== undefined && node.left.val !== null) queue.push(node.left)
      if (node.right?.val !== undefined && node.right.val !== null) queue.push(node.right)
    }
    result.push(level)

  }

  return result
}

const input: (number | null)[] = [3, 9, 20, null, null, 15, 7];


const root = buildTree(input);
console.log(root)

console.log(levelOrder(root)); // [[3], [9, 20], [15, 7]]/ const: [[3],[9,20],[15,7]]
