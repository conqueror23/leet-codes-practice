import { check } from "../utils/check";

function lengthOfLongestSubstring(s: string): number {
  let max = 0;
  let sub = []

  for (const char of s) {
    const posibleIndex = sub.indexOf(char)
    if (posibleIndex !== -1) {
      sub.splice(0, posibleIndex + 1)
    }

    sub.push(char)
    max = Math.max(max, sub.length)

  }
  return max;
}

function lengthOfLongestSubstringOpt(s: string): number {
  const lastSeen = new Map<string, number>();

  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (lastSeen.has(char)) {
      left = Math.max(left, lastSeen.get(char)! + 1);
    }

    lastSeen.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

const s = "abcabcbb"
const res = 3

const s1 = "bbbbb"
const res1 = 1


const s2 = "eea"
const res2 = 2


//travery back
const s3 = "1R1T7"
const res3 = 4

const s4 = 'afedacd'
const res4 = 5

'abbaacdefaghijbklmnaopq'
{
  // check(` s- ${s} res-${res}`, lengthOfLongestSubstring(s), res)
  //
  // check(` s- ${s1} res-${res1}`, lengthOfLongestSubstring(s1), res1)
  //
  // check(` s- ${s2} res-${res2}`, lengthOfLongestSubstring(s2), res2)

  // check(` s- ${s3} res-${res3}`, lengthOfLongestSubstring(s3), res3)

  check(` s- ${s4} res-${res4}`, lengthOfLongestSubstringOpt(s4), res4)
}

export { }
