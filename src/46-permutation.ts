// var permute = function(xs) {
//       let ret = [];
//     for (let i = 0; i < xs.length; i = i + 1) {
//       let rest = permute(xs.slice(0, i).concat(xs.slice(i + 1)));
//     //   console.log(rest)
//       if(!rest.length) {
//         ret.push([xs[i]])
//       } else {
//         for(let j = 0; j < rest.length; j = j + 1) {
//           ret.push([xs[i]].concat(rest[j]))
//         //   console.log(ret)
//         }
//       }
//     }
//     return ret;
// };

function permute(nums: number[]): number[][] {
  const result: number[][] = []

  for (let index = 0; index < nums.length; index++) {
    const slice1 = nums.slice(0, index)
    const slice2 = nums.slice(index + 1)
    const rest = permute(
      slice1.concat(slice2)
    )

    if (!rest.length) {
      result.push([nums[index]])
      continue
    }

    //subPermutation
    for (let j = 0; j < rest.length; j++) {
      result.push([nums[index]].concat(rest[j]))
    }
  }

  return result
};

// ---- tests ----
{
  const normalize = (perms: number[][]): number[][] =>
    [...perms].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))

  const check = (name: string, actual: number[][], expected: number[][]): void => {
    const a = JSON.stringify(normalize(actual))
    const e = JSON.stringify(normalize(expected))
    console.log(a === e ? `PASS ${name}` : `FAIL ${name}: expected ${e}, got ${a}`)
  }

  check("case1 [1,2,3]", permute([1, 2, 3]),
    [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]])
  check("case2 [0,1]", permute([0, 1]), [[0, 1], [1, 0]])
  check("case3 [1]", permute([1]), [[1]])
}

// make this file a module so its declarations stay file-scoped
export {}
