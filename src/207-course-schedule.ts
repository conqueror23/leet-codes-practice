function canFinishBFS(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = Array.from({ length: numCourses }, () => [])
  const indegree = Array(numCourses).fill(0)

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    indegree[course]++;
  }
  const queue: number[] = []

  // detect loop
  for (let course = 0; course < numCourses; course++) {
    if (indegree[course] === 0) {
      queue.push(course)
    }
  }

  let completed = 0;
  let head = 0;

  while (head < queue.length) {
    const current = queue[head++];
    completed++;

    for (const next of graph[current]) {
      indegree[next]--
      if (indegree[next] === 0) {
        queue.push(next)
      }
    }
  }
  return completed === numCourses
};


const canFinishDFS = (numCourses: number, prerequisites: number[][]): boolean => {
  const graph: number[][] = Array.from({ length: numCourses }, () => [])
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course)
  }

  // 0 = unvisited, 1 = visiting (on current path), 2 = done
  const state: number[] = Array(numCourses).fill(0)

  const hasCycle = (course: number): boolean => {
    if (state[course] === 1) return true
    if (state[course] === 2) return false

    state[course] = 1
    for (const next of graph[course]) {
      if (hasCycle(next)) return true
    }
    state[course] = 2
    return false
  }

  for (let course = 0; course < numCourses; course++) {
    if (hasCycle(course)) return false
  }
  return true
}

// ---- tests ----
{
  const check = (name: string, actual: boolean, expected: boolean): void => {
    console.log(actual === expected
      ? `PASS ${name}`
      : `FAIL ${name}: expected ${expected}, got ${actual}`)
  }

  type Case = { name: string, numCourses: number, prerequisites: number[][], expected: boolean }
  const cases: Case[] = [
    { name: "case1 simple chain", numCourses: 2, prerequisites: [[1, 0]], expected: true },
    { name: "case2 two-node cycle", numCourses: 2, prerequisites: [[1, 0], [0, 1]], expected: false },
    { name: "case3 diamond", numCourses: 4, prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]], expected: true },
    { name: "case4 three-node cycle", numCourses: 3, prerequisites: [[1, 0], [2, 1], [0, 2]], expected: false },
    { name: "case5 no prerequisites", numCourses: 3, prerequisites: [], expected: true },
  ]

  for (const c of cases) {
    check(`${c.name} (BFS)`, canFinishBFS(c.numCourses, c.prerequisites), c.expected)
    check(`${c.name} (DFS)`, canFinishDFS(c.numCourses, c.prerequisites), c.expected)
  }
}


// make this file a module so its declarations stay file-scoped
export {}
