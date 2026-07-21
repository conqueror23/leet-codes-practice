import { check } from "./utils/check"

function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const visited = new Set<number>();

  function dfs(city: number): void {
    visited.add(city);

    for (let nextCity = 0; nextCity < n; nextCity++) {
      if (
        isConnected[city][nextCity] === 1 &&
        !visited.has(nextCity)
      ) {
        dfs(nextCity);
      }
    }
  }

  let provinces = 0;

  //try to count only when connected cities are linked to map
  for (let city = 0; city < n; city++) {
    if (!visited.has(city)) {
      provinces++;
      dfs(city);
    }
  }

  return provinces;


};

const findCircleNumBFS = (isConnected: number[][]): number => {
  const n = isConnected.length
  const visited = new Set<number>()

  let provinces = 0
  //visit all cities
  for (let city = 0; city < n; city++) {
    provinces++

    if (visited.has(city)) continue

    visited.add(city)
    const queue = [city]

    while (queue.length > 0) {
      const current = queue.pop()!

      //visit all cities relationship to current city
      for (let nextCity = 0; nextCity < n; nextCity++) {
        if (isConnected[current][nextCity] === 0 && !visited.has(nextCity)) {
          visited.add(nextCity)
          queue.push(nextCity)
        }
      }
    }
  }
  return provinces
}


const isConnected = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]
const isConnected2 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

console.log(findCircleNum(isConnected))

{

  check(`dfs case1 ${JSON.stringify(isConnected)}`, findCircleNum(isConnected), 2)
  check(`dfs case2 ${JSON.stringify(isConnected2)}`, findCircleNum(isConnected2), 3)
  check(`bfs ${JSON.stringify(isConnected)}`, findCircleNum(isConnected), 2)
  check(`bfs ${JSON.stringify(isConnected2)}`, findCircleNum(isConnected2), 3)
}

export { }
