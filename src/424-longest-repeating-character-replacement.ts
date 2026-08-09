import { check } from "./utils/check"

//target longest repetting character
function characterReplacement(s: string, k: number): number {
  const frequency = new Array<number>(26).fill(0);

  let left = 0;
  let maxFrequency = 0; // Highest character frequency seen in the window
  let maxLength = 0;    // Final answer

  for (let right = 0; right < s.length; right++) {
    const rightIndex = s.charCodeAt(right) - 65;
    frequency[rightIndex]++;

    maxFrequency = Math.max(
      maxFrequency,
      frequency[rightIndex]
    );

    // Minority characters are the ones we must replace.
    while (right - left + 1 - maxFrequency > k) {
      const leftIndex = s.charCodeAt(left) - 65;
      frequency[leftIndex]--;
      left++;
    }

    maxLength = Math.max(
      maxLength,
      right - left + 1
    );
  }

  return maxLength;
};

function characterReplacementOpt(s: string, k: number): number {
  const frequency = new Array<number>(26).fill(0);
  const getIndex = (index: number): number => s.charCodeAt(index) - 65

  let left = 0;
  let maxFreq = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const rightIndex = getIndex(right)
    frequency[rightIndex]++;

    maxFreq = Math.max(maxFreq, frequency[rightIndex]);

    while (right - left + 1 - maxFreq > k) {
      const leftIndex = getIndex(left)
      frequency[leftIndex]--;
      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}

function characterReplacementOpt1(s: string, k: number): number {
  const frequency = new Array<number>(26).fill(0);

  let left = 0;
  let maxFrequency = 0; // Highest character frequency seen in the window
  let maxLength = 0;    // Final answer

  for (let right = 0; right < s.length; right++) {
    const rightIndex = s.charCodeAt(right) - 65;

    frequency[rightIndex]++;
    maxFrequency = Math.max(
      maxFrequency,
      frequency[rightIndex]
    );

    // Minority characters are the ones we must replace.
    while (right - left + 1 - maxFrequency > k) {
      const leftIndex = s.charCodeAt(left) - 65;
      frequency[leftIndex]--;
      left++;
    }

    maxLength = Math.max(
      maxLength,
      right - left + 1
    );
  }

  return maxLength;
}

const s1 = "ABAB", k1 = 2
const res1 = 4

const s2 = "AABABBA", k2 = 1
const res2 = 4

{
  // check(`case 1`, characterReplacement(s1, k1), res1)


  // check(`case 2`, characterReplacement(s2, k2), res2)

  check(`case 2`, characterReplacementOpt(s2, k2), res2)
}
export { }
