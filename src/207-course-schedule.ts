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


const canFinishDFS = (numCourses: number, prerequisites: number[][]) => {

}


const numCourses = 3
// const prerequisites = [[1, 0]]

// const prerequisites = [[1, 0], [0, 1]]

// const prerequisites = [[1, 0], [2, 0]]
const prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]
console.log(canFinishBFS(numCourses, prerequisites))

console.log(canFinishDFS(numCourses, prerequisites))

