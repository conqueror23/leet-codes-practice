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


const isConnected = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]
const isConnected2 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

console.log(findCircleNum(isConnected))

{

  check(`case1 ${JSON.stringify(isConnected)}`, findCircleNum(isConnected), 2)
  check(`case2  ${JSON.stringify(isConnected2)}`, findCircleNum(isConnected2), 3)
  // check("case3 [9,9] carries twice", findCircleNum([9, 9]), [1, 0, 0])
  // check("case4 [4,3,2,1]", findCircleNum([4, 3, 2, 1]), [4, 3, 2, 2])
  // check("case5 [1,9] carry in middle", findCircleNum([1, 9]), [2, 0])
}

export { }
