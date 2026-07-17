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

/**
 * adjacency list example:
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

// serialize a graph back to an adjacency list so clones can be compared
const toAdjList = (node: CNode | null): number[][] => {
  if (node === null) return []
  const seen = new Map<number, CNode>()
  const queue: CNode[] = [node]
  seen.set(node.val, node)
  let head = 0
  while (head < queue.length) {
    const current = queue[head++]
    for (const neighbor of current.neighbors) {
      if (!seen.has(neighbor.val)) {
        seen.set(neighbor.val, neighbor)
        queue.push(neighbor)
      }
    }
  }
  const result: number[][] = []
  for (let val = 1; val <= seen.size; val++) {
    result.push(seen.get(val)!.neighbors.map(n => n.val))
  }
  return result
}

// ---- tests ----
{
  const eq = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b)
  const check = (name: string, actual: unknown, expected: unknown): void => {
    console.log(eq(actual, expected)
      ? `PASS ${name}`
      : `FAIL ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }

  const cases: number[][][] = [
    [[2, 4], [1, 3], [2, 4], [1, 3]], // 4-node cycle
    [[]],                             // single node, no neighbors
    [[2], [1]],                       // two connected nodes
  ]

  for (const [index, adjacency] of cases.entries()) {
    const original = buildGraph(adjacency)!

    const dfsClone = cloneGraph(original)
    check(`case${index + 1} DFS clone structure`, toAdjList(dfsClone), adjacency)
    check(`case${index + 1} DFS clone is a new object`, dfsClone !== original, true)

    const bfsClone = cloneGraphBfs(original)
    check(`case${index + 1} BFS clone structure`, toAdjList(bfsClone), adjacency)
    check(`case${index + 1} BFS clone is a new object`, bfsClone !== original, true)
  }

  check("null input DFS", cloneGraph(null), null)
  check("null input BFS", cloneGraphBfs(null), null)
}


// make this file a module so its declarations stay file-scoped
export {}
