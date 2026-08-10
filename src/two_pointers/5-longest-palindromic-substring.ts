import { check } from "../utils/check";

function longestPalindrome(s: string): string {
  if (s.length < 2) return s;

  let bestLeft = 0;
  let bestRight = 0;

  function expand(left: number, right: number): void {
    while (
      left >= 0 &&
      right < s.length &&
      s[left] === s[right]
    ) {
      left--;
      right++;
    }

    // The loop stops one position beyond the valid palindrome.
    left++;
    right--;

    if (right - left > bestRight - bestLeft) {
      bestLeft = left;
      bestRight = right;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // Odd-length palindrome
    expand(i, i + 1); // Even-length palindrome
  }

  return s.slice(bestLeft, bestRight + 1);
};

const s1 = "babad"
const res1 = "bab"

{
  check(`case1 `, longestPalindrome(s1), res1)
}

export { }
