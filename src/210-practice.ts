const findAllOrdersIterative = (numCourses: number, prerequisites: number[][]) => {
  const graph: number[][] = Array.from({ length: numCourses }, () => [])
  const initialIndegree = Array(numCourses).fill(0)
  const initialUsed = Array.from({ length: numCourses }, () => false)

  type State = {
    path: number[],
    indegree: number[],
    used: boolean[]
  }

  const result: number[][] = []

  for (const [pre, cur] of prerequisites) {
    graph[cur].push(pre)
    initialIndegree[pre]++
  }

  const stack: State[] = [{
    path: [],
    indegree: initialIndegree,
    used: initialUsed
  }]

  while (stack.length > 0) {
    const { path, indegree, used } = stack.pop()!
    //exit
    if (path.length === numCourses) {
      result.push(path)
      continue
    }
    const candidates: number[] = []

    for (let course = 0; course < numCourses; course++) {
      if (!used[course] && indegree[course] === 0) {
        candidates.push(course)
      }
    }

    for (const candidate of candidates) {
      if (indegree[candidate] === 0 && !used[candidate]) {

        const newPath = [...path, candidate]
        const newIndegree = [...indegree]
        const newUser = [...used]

        newUser[candidate] = true;

        for (const next of graph[candidate]) {
          newIndegree[next]--;
        }

        stack.push({
          path: newPath,
          indegree: newIndegree,
          used: newUser
        })
      }
    }
  }

  return result
}

const findOneOrder = (numCourses: number, prerequisites: number[][]) => {
  const used: boolean[] = Array(numCourses).fill(false)
  const indegree: number[] = Array(numCourses).fill(0)
  const graph: number[][] = Array.from({ length: numCourses }, () => [])

  for (const [pre, cur] of prerequisites) {
    graph[cur].push(pre)
    indegree[pre]++
  }

  const path: number[] = []

  for (let course = 0; course < numCourses; course++) {
    if (indegree[course] === 0 && used[course] === false) {
      used[course] = true
      path.push(course)


      for (const next of graph[course]) {
        indegree[next]--
      }
    }
  }

  return path
}

const findAllOrderBacktracking = (numCourses: number, prerequest: number[][]) => {
  const used: boolean[] = Array(numCourses).fill(false)
  const indegree: number[] = Array(numCourses).fill(0)
  const graph: number[][] = Array.from({ length: numCourses }, () => [])

  for (const [cur, pre] of prerequest) {
    graph[pre].push(cur)
    indegree[cur]++
  }

  const result: number[][] = []
  const path: number[] = []
  const backtracking = () => {
    if (path.length === numCourses) {
      result.push([...path])
      return;
    }

    let candidate = false

    for (let course = 0; course < numCourses; course++) {
      if (!used[course] && indegree[course] === 0) {
        candidate = true
        used[course] = true

        path.push(course)
        for (const next of graph[course]) {
          indegree[next]--
        }

        backtracking()

        for (const next of graph[course]) {
          indegree[next]++
        }

        path.pop()
        used[course] = false
      }
    }

    if (!candidate) {
      return
    }
  }

  backtracking()
  return result

}


// ---- tests ----
{
  const normalize = (orders: number[][]): number[][] =>
    [...orders].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))

  const check = (name: string, actual: number[][], expected: number[][]): void => {
    const a = JSON.stringify(normalize(actual))
    const e = JSON.stringify(normalize(expected))
    console.log(a === e ? `PASS ${name}` : `FAIL ${name}: expected ${e}, got ${a}`)
  }

  type Case = { name: string, numCourses: number, prerequisites: number[][], expected: number[][] }
  const cases: Case[] = [
    {
      name: "case1 diamond",
      numCourses: 4,
      prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]],
      expected: [[0, 1, 2, 3], [0, 2, 1, 3]],
    },
    {
      name: "case2 simple chain",
      numCourses: 2,
      prerequisites: [[1, 0]],
      expected: [[0, 1]],
    },
    {
      name: "case3 cycle has no order",
      numCourses: 2,
      prerequisites: [[1, 0], [0, 1]],
      expected: [],
    },
  ]

  for (const c of cases) {
    check(`${c.name} (backtracking)`, findAllOrderBacktracking(c.numCourses, c.prerequisites), c.expected)
    check(`${c.name} (iterative)`, findAllOrdersIterative(c.numCourses, c.prerequisites), c.expected)
  }

  // findOneOrder is a single forward pass, so it only works when courses
  // unlock in increasing index order — test it on such a case only
  check("case4 findOneOrder diamond", [findOneOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])], [[0, 1, 2, 3]])
}

// make this file a module so its declarations stay file-scoped
export {}
