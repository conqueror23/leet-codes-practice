
//Original
// function findOrder(numCourses: number, prerequisites: number[][]): number[] {
//   const graph: number[][] = Array.from({ length: numCourses }, () => []);
//   const indegree: number[] = Array(numCourses).fill(0);
//
//   // Build graph: prerequisite -> course
//   for (const [course, prerequisite] of prerequisites) {
//     graph[prerequisite].push(course);
//     indegree[course]++;
//   }
//
//   const queue: number[] = [];
//
//   // Courses with no prerequisites can be taken first
//   for (let course = 0; course < numCourses; course++) {
//     if (indegree[course] === 0) {
//       queue.push(course);
//     }
//   }
//
//   const result: number[] = [];
//   let head = 0;
//
//   while (head < queue.length) {
//     const current = queue[head++];
//     result.push(current);
//
//     for (const next of graph[current]) {
//       indegree[next]--;
//
//       if (indegree[next] === 0) {
//         queue.push(next);
//       }
//     }
//   }
//
//   return result.length === numCourses ? result : [];
// }

//follow up, all combo
function findAllOrders(numCourses: number, prerequisites: number[][]): number[][] {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  const indegree: number[] = Array(numCourses).fill(0);

  // Build graph: prerequisite -> course
  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course]++;
  }

  const result: number[][] = [];
  const path: number[] = [];
  const used: boolean[] = Array(numCourses).fill(false);

  function backtrack(): void {
    // We have completed all courses
    if (path.length === numCourses) {
      result.push([...path]);
      return;
    }

    let foundCandidate = false;

    // Try every course that currently has no remaining prerequisites
    for (let course = 0; course < numCourses; course++) {
      if (!used[course] && indegree[course] === 0) {
        foundCandidate = true;

        // Choose this course
        used[course] = true;
        path.push(course);

        // Remove this course's effect from dependent courses
        for (const next of graph[course]) {
          indegree[next]--;
        }

        backtrack();

        // Undo changes
        for (const next of graph[course]) {
          indegree[next]++;
        }

        path.pop();
        used[course] = false;
      }
    }

    // If no candidate exists before path is complete,
    // there is a cycle in the remaining graph.
    if (!foundCandidate) {
      return;
    }
  }

  backtrack();
  return result;
}

const numCourses = 4
const prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]

// const order = findOrder(numCourses, prerequisites)


const order = findAllOrders(numCourses, prerequisites)

console.log(order)
