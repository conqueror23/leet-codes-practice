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

function longestPalindromeOpt(s: string): string {
  if (s.length < 2) return s;

  // Sentinels unify odd and even palindromes.
  // Example: "abba" → "^#a#b#b#a#$"
  const transformed = `^#${s.split("").join("#")}#$`;
  const radius = new Array<number>(transformed.length).fill(0);

  let center = 0;
  let rightBoundary = 0;

  let bestCenter = 0;
  let bestRadius = 0;

  for (let i = 1; i < transformed.length - 1; i++) {
    const mirror = 2 * center - i;

    if (i < rightBoundary) {
      radius[i] = Math.min(
        rightBoundary - i,
        radius[mirror]
      );
    }

    // Expand only beyond the already-known region.
    while (
      transformed[i + radius[i] + 1] ===
      transformed[i - radius[i] - 1]
    ) {
      radius[i]++;
    }

    if (i + radius[i] > rightBoundary) {
      center = i;
      rightBoundary = i + radius[i];
    }

    if (radius[i] > bestRadius) {
      bestRadius = radius[i];
      bestCenter = i;
    }
  }

  const start = Math.floor((bestCenter - bestRadius) / 2);
  return s.slice(start, start + bestRadius);
}

const s1 = "babad"
const res1 = "bab"

{
  check(`case1 `, longestPalindrome(s1), res1)
}

export { }
