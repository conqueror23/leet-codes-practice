/**
 * Definition for _CNode.
 * class _CNode {
 *     val: number
 *     neighbors: _CNode[]
 * 
 *     constructor(val?: number, neighbors?: _CNode[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 * 
 */

class CNode {
  val: number
  neighbors: CNode[]

  constructor(val?: number, neighbors?: CNode[]) {
    this.val = (val === undefined ? 0 : val)
    this.neighbors = (neighbors === undefined ? [] : neighbors)
  }
}

function cloneGraph(node: CNode | null): CNode | null {
  if (node === null) return null;

  const cloned = new Map<CNode, CNode>();

  function dfs(original: CNode): CNode {
    // If already cloned, return the clone
    if (cloned.has(original)) {
      return cloned.get(original)!;
    }

    // Create clone for current node
    const copy = new CNode(original.val);

    // Save it immediately to handle cycles
    cloned.set(original, copy);

    // Clone all neighbors
    for (const neighbor of original.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }
  return dfs(node)
};

function cloneGraphBfs(node: CNode | null): CNode | null {
  if (node === null) return null

  const cloned = new Map<CNode, CNode>()
  const queue: CNode[] = [node]
  cloned.set(node, new CNode(node.val))
  while (queue.length > 0) {
    const current = queue.shift()!
    const currentClone = cloned.get(current)!

    for (const neighbor of current.neighbors) {
      if (!cloned.has(neighbor)) {
        cloned.set(neighbor, new CNode(neighbor.val))
        queue.push(neighbor)
      }
      currentClone.neighbors.push(cloned.get(neighbor)!)
    }
  }
  return cloned.get(node)!
}

const adList = [
  [2, 4],
  [1, 3],
  [2, 4],
  [1, 3]
]

/**
 * 1 : 2, 4
 * 2 : 1, 3
 * 3 : 2, 4
 * 4 : 1, 3
 */


const buildGraph = (adList: number[][]): CNode | null => {
  if (adList.length === 0) return null
  const nodes: CNode[] = []

  for (const index in adList) {
    nodes.push(new CNode(Number(index) + 1))
  }

  for (const [index, neighbors] of adList.entries()) {
    const currentNode = nodes[index]
    for (const neighbor of neighbors) {
      currentNode.neighbors.push(nodes[neighbor - 1])
    }
  }
  return nodes[0]
}

const graph = buildGraph(adList)!
// const clonedGraph = cloneGraph(graph)!
const cloneGraphBfsF = cloneGraphBfs(graph)!
console.log(cloneGraphBfsF)
// console.log(clonedGraph)

