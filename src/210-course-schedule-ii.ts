
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

function findAllOrdersIterative(
  numCourses: number,
  prerequisites: number[][]
): number[][] {

  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  const initialIndegree: number[] = Array(numCourses).fill(0);

  // Build graph: prerequisite -> course
  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    initialIndegree[course]++;
  }

  type State = {
    path: number[];
    indegree: number[];
    used: boolean[];
  };

  const result: number[][] = [];

  const stack: State[] = [
    {
      path: [],
      indegree: initialIndegree,
      used: Array(numCourses).fill(false),
    },
  ];

  while (stack.length > 0) {
    const state = stack.pop()!;
    const { path, indegree, used } = state;

    if (path.length === numCourses) {
      result.push(path);
      continue;
    }

    // Find all currently available courses
    const candidates: number[] = [];

    for (let course = 0; course < numCourses; course++) {
      if (!used[course] && indegree[course] === 0) {
        candidates.push(course);
      }
    }

    // Try every candidate as the next course
    for (const course of candidates) {
      const newPath = [...path, course];
      const newUsed = [...used];
      const newIndegree = [...indegree];

      newUsed[course] = true;

      for (const next of graph[course]) {
        newIndegree[next]--;
      }

      stack.push({
        path: newPath,
        indegree: newIndegree,
        used: newUsed,
      });
    }
  }

  return result;
}

// ---- tests ----
{
  // orders can come back in any sequence, so normalize before comparing
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
    {
      name: "case4 single course",
      numCourses: 1,
      prerequisites: [],
      expected: [[0]],
    },
  ]

  for (const c of cases) {
    check(`${c.name} (backtracking)`, findAllOrders(c.numCourses, c.prerequisites), c.expected)
    check(`${c.name} (iterative)`, findAllOrdersIterative(c.numCourses, c.prerequisites), c.expected)
  }
}

// make this file a module so its declarations stay file-scoped
export {}
