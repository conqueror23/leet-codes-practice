import { number } from "zod/v4/core/regexes.cjs";
import { check } from "../utils/check";

function findDeploymentOrderOld(
  numsServices: number,
  dependencies: number[][]
): number[] {
  const prerequisites: number[][] = Array.from(
    { length: numsServices },
    () => []
  )
  for (const [service, prerequisite] of dependencies) {
    prerequisites[service].push(prerequisite)
  }

  const deployed = new Array<boolean>(numsServices).fill(false)
  const order: number[] = []

  while (order.length < numsServices) {
    let madeProgresss = false
    for (let service = 0; service < numsServices; service++) {
      if (deployed[service]) continue

      const ready = prerequisites[service].every(
        prerequesite => deployed[prerequesite]
      )
      if (ready) {
        deployed[service] = true
        order.push(service)
        madeProgresss = true
      }
    }

    if (!madeProgresss) return []
  }

  return order
}

function findDeploymentOrder(
  numServices: number,
  dependencies: number[][]
): number[] {
  const dependents: number[][] = Array.from(
    { length: numServices },
    () => []
  );

  const indegree = new Array<number>(numServices).fill(0);

  for (const [service, prerequisite] of dependencies) {
    dependents[prerequisite].push(service);
    indegree[service]++;
  }

  const ready: number[] = [];

  let index = 0
  // for (let service = 0; service < numServices; service++) {
  while (index < numServices) {
    if (indegree[index] === 0) ready.push(index)
    index++
  }

  const order: number[] = [];

  let head = 0
  while (head < ready.length) {
    const prerequisite = ready[head++];
    order.push(prerequisite);

    for (const service of dependents[prerequisite]) {
      indegree[service]--;

      if (indegree[service] === 0) {
        ready.push(service);
      }
    }
  }

  return order.length === numServices ? order : [];

}

const numsServices1 = 4
const dependencies1 = [[1, 0], [2, 0], [3, 1], [3, 2]]

const output1 = [0, 1, 2, 3]

{
  check(`case 1 `, findDeploymentOrder(numsServices1, dependencies1), output1)
}

export { }
