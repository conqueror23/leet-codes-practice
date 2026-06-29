//prerequest
const numCourses = 4
const prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]

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

  for (const [cur, pre] of prerequisites) {
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


// const order = findOneOrder(numCourses, prerequisites)

const order = findAllOrderBacktracking(numCourses, prerequisites)
// const order = findAllOrdersIterative(numCourses, prerequisites)

console.log(order)
