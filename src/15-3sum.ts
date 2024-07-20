function threeSum(nums: number[]): number[][] {
  const result=new Map<string,number[]>()
  const sortedNums = nums.sort((a,b)=>a-b)
  let start =0
  let end = sortedNums.length-1
  let mid =start+1

  while(start<end){
    while(mid<end){
      if(sortedNums[start]+sortedNums[mid]+sortedNums[end]>0){
        end--
        continue
      }
      if(sortedNums[start]+sortedNums[mid]+sortedNums[end]<0){
        mid++
         continue
       }
       const key = `${sortedNums[start]}${sortedNums[mid]}${sortedNums[end]}`
       result.set(key,[sortedNums[start],sortedNums[mid],sortedNums[end]])
       end--
       continue
     }
     start++
     mid=start+1
     end = sortedNums.length-1
   }

  return [...result.values()]
};



//should ignore duplicate result

const testCase1 = [1,2,3,0,-2,-3,-1]
const testCase2 = [0,1,1]
const testCase3 = [0,0,0]
const testCase4 = [-1,0,1,2,-1,-4]
const testCase5 = [3,0,-2,-1,1,2]

// [-2,-1,0,1,2,3]


// const res1 = threeSum(testCase1)
// console.log("testCase1",res1)
//
// const res3 = threeSum(testCase3)
// console.log("testCase3",res3)

const res4 = threeSum(testCase4)
console.log("testCase4",res4)

// const res5 = threeSum(testCase5)
// console.log("testCase5",res5)
