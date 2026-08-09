import { check } from "../utils/check"

function minWindow(s: string, t: string): string {
  let window = ""
  let minSize = Infinity

  const required = new Map<string, number>();

  for (const char of t) {
    //hidden consideration, need to ensure quantity of the target
    required.set(char, (required.get(char) ?? 0) + 1);
  }

  const isAllIncluded = (subString: string) => {
    const available = new Map<string, number>();

    for (const char of subString) {
      available.set(char, (available.get(char) ?? 0) + 1);
    }

    for (const [char, requiredCount] of required) {
      if ((available.get(char) ?? 0) < requiredCount) {
        return false;
      }
    }

    return true;
  }

  for (let left = 0; left < s.length; left++) {
    for (let right = s.length; right > left; right--) {
      const subString = s.slice(left, right)
      if (isAllIncluded(subString)) {
        if (subString.length < minSize) {
          window = subString
          minSize = subString.length
        }
        continue
      }
    }
  }

  return window
};

function minWindowOpt(s: string, t: string): string {
  if (!t || s.length < t.length) return "";
  const need = new Map<string, number>();
  for (const char of t) need.set(char, (need.get(char) ?? 0) + 1);

  let missing = t.length;
  let left = 0;
  let bestStart = 0;
  let bestLength = Infinity;

  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    const requiredCount = need.get(rightChar) ?? 0;

    // This character satisfies one outstanding requirement.
    if (requiredCount > 0) missing--;
    need.set(rightChar, requiredCount - 1);

    // The current window contains all characters from t.
    while (missing === 0) {
      const windowLength = right - left + 1;

      if (windowLength < bestLength) {
        bestStart = left;
        bestLength = windowLength;
      }

      const leftChar = s[left];
      need.set(leftChar, (need.get(leftChar) ?? 0) + 1);

      // Removing this character makes the window invalid.
      if (need.get(leftChar)! > 0) missing++;

      left++;
    }
  }

  return bestLength === Infinity
    ? ""
    : s.slice(bestStart, bestStart + bestLength);
}

const s1 = "ADOBECODEBANC", t1 = "ABC"
const res1 = "BANC"

const s2 = "a", t2 = "a"
const res2 = "a"

const s3 = "a", t3 = "aa"
const res3 = ""


const s4 = "aa", t4 = "a"
const res4 = "a"
{
  // check(`case 1 `, minWindow(s1, t1), res1)

  check(`case 2 `, minWindow(s2, t2), res2)

  check(`case 3 `, minWindow(s3, t3), res3)

  check(`case 4 `, minWindow(s4, t4), res4)
}

export {

}
