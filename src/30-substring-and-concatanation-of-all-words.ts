import { check as sharedCheck } from "./utils/check"

/***
You are given a string s and an array of strings words. All the strings of words are of the same length.
A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.
For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words.
Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.
*/

const findSubstring = (s: string, words: string[]): number[] => {
  const result: number[] = []
  if (words.length === 0 || s.length === 0) return result

  const wordLen = words[0].length

  // how many times each word is needed
  const need = new Map<string, number>()
  for (const word of words) {
    need.set(word, (need.get(word) ?? 0) + 1)
  }

  // slide a window of whole words, once per possible word alignment
  for (let offset = 0; offset < wordLen; offset++) {
    let left = offset
    let count = 0
    const window = new Map<string, number>()

    for (let right = offset; right + wordLen <= s.length; right += wordLen) {
      const word = s.slice(right, right + wordLen)

      if (!need.has(word)) {
        // word not usable at all — reset the window past it
        window.clear()
        count = 0
        left = right + wordLen
        continue
      }

      window.set(word, (window.get(word) ?? 0) + 1)
      count++

      // too many copies of this word — shrink from the left until balanced
      while (window.get(word)! > need.get(word)!) {
        const leftWord = s.slice(left, left + wordLen)
        window.set(leftWord, window.get(leftWord)! - 1)
        left += wordLen
        count--
      }

      if (count === words.length) {
        result.push(left)
        // slide one word forward to look for the next match
        const leftWord = s.slice(left, left + wordLen)
        window.set(leftWord, window.get(leftWord)! - 1)
        left += wordLen
        count--
      }
    }
  }

  return result
};

// ---- tests ----
{
  const normalize = (indices: number[]): number[] => [...indices].sort((a, b) => a - b)

  const check = (name: string, actual: number[], expected: number[]): void =>
    sharedCheck(name, normalize(actual), normalize(expected))

  check("case1 barfoothefoobarman", findSubstring("barfoothefoobarman", ["foo", "bar"]), [0, 9])
  check("case2 repeated word not available", findSubstring("wordgoodgoodgoodbestword", ["word", "good", "best", "word"]), [])
  check("case3 overlapping matches", findSubstring("barfoofoobarthefoobarman", ["bar", "foo", "the"]), [6, 9, 12])
  check("case4 duplicate words required", findSubstring("aaaaaa", ["aa", "aa"]), [0, 1, 2])
  check("case5 no match", findSubstring("abc", ["d"]), [])
}

// make this file a module so its declarations stay file-scoped
export {}
