/***
You are given a string s and an array of strings words. All the strings of words are of the same length.
A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.
For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words.
Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.
*/



const a = [0, 1 ,2 ,3]
const b = a.slice(0,1)
console.log(b)



const permutations=(selections:string[])=>{
  const results = new Set()

  for (var i = 0;i ++;i< selections.length-1){
    const concateSelection = selections 
    results.add(concateSelection)

  }

}

const findSubstring(s: string, words: string[]): number[]=> {
    
    
};
