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
  const result:number[][]= []

  for(let index=0;index<nums.length;index++){
    const slice1 =nums.slice(0,index)
    const slice2 =nums.slice(index+1)
    const rest = permute(
      slice1.concat(slice2)
    )

    //why this index can be changed 
    console.log('=====index===',index)
    console.log("slice1",slice1)
    console.log("slice2",slice2)
    console.log("rest",rest)


    if(!rest.length){
      console.log("elemnts push lenth=0",[nums[index]])
      result.push([nums[index]])
      continue
    }

    //subPermutation
    for(let j =0;j<rest.length; j++){
      const linePush=   
        [nums[index]].concat(rest[j])
    console.log('-----j----',j)
    console.log("linePush",linePush)
      result.push(linePush)
    }
  }

  return result
};



const testCase1 = [1,2,3]

console.log('testCase1',permute(testCase1))
