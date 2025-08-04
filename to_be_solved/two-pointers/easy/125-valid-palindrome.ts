/**
 * 125. Valid Palindrome - Easy
 *
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters
 * and removing all non-alphanumeric characters, it reads the same forward and backward.
 *
 * Given a string s, return true if it is a palindrome, or false otherwise.
 */

function isPalindrome(s: string): boolean {
  // Advanced: Two pointers with inline character validation
  // Time: O(n), Space: O(1)

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters from left
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }

    // Skip non-alphanumeric characters from right
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // Compare characters (case-insensitive)
    if (toLowerCase(s[left]) !== toLowerCase(s[right])) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

// Helper functions for character validation
function isAlphanumeric(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) || // 0-9
    (code >= 65 && code <= 90) || // A-Z
    (code >= 97 && code <= 122)
  ); // a-z
}

function toLowerCase(char: string): string {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    // A-Z
    return String.fromCharCode(code + 32);
  }
  return char;
}

// Alternative: Preprocessing approach
function isPalindromePreprocess(s: string ): boolean {
  // Clean the string first
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Optimized: Single pass with character code comparison
function isPalindromeOptimized(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    const leftChar = s[left];
    const rightChar = s[right];

    // Get normalized character codes
    const leftCode = getNormalizedCode(leftChar);
    const rightCode = getNormalizedCode(rightChar);

    // Skip if left character is not alphanumeric
    if (leftCode === -1) {
      left++;
      continue;
    }

    // Skip if right character is not alphanumeric
    if (rightCode === -1) {
      right--;
      continue;
    }

    // Compare normalized codes
    if (leftCode !== rightCode) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function getNormalizedCode(char: string): number {
  const code = char.charCodeAt(0);

  if (code >= 48 && code <= 57) {
    // 0-9
    return code;
  } else if (code >= 65 && code <= 90) {
    // A-Z
    return code + 32; // Convert to lowercase
  } else if (code >= 97 && code <= 122) {
    // a-z
    return code;
  }

  return -1; // Not alphanumeric
}

// Recursive approach
function isPalindromeRecursive(s: string): boolean {
  function helper(left: number, right: number): boolean {
    if (left >= right) return true;

    // Skip non-alphanumeric from left
    if (!isAlphanumeric(s[left])) {
      return helper(left + 1, right);
    }

    // Skip non-alphanumeric from right
    if (!isAlphanumeric(s[right])) {
      return helper(left, right - 1);
    }

    // Compare current characters
    if (toLowerCase(s[left]) !== toLowerCase(s[right])) {
      return false;
    }

    return helper(left + 1, right - 1);
  }

  return helper(0, s.length - 1);
}

// Bit manipulation approach for alphanumeric check
function isPalindromeBitwise(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Use bitwise operations for character validation
    while (left < right && !isAlphanumericBitwise(s[left])) {
      left++;
    }

    while (left < right && !isAlphanumericBitwise(s[right])) {
      right--;
    }

    // Normalize and compare using bitwise operations
    const leftNorm = normalizeCharBitwise(s[left]);
    const rightNorm = normalizeCharBitwise(s[right]);

    if (leftNorm !== rightNorm) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphanumericBitwise(char: string): boolean {
  const code = char.charCodeAt(0);
  // Use bitwise operations to check ranges
  return (
    (((code - 48) & 0xf0) === 0 && code - 48 <= 9) || // 0-9
    (((code - 65) & 0xe0) === 0 && code - 65 <= 25) || // A-Z
    (((code - 97) & 0xe0) === 0 && code - 97 <= 25)
  ); // a-z
}

function normalizeCharBitwise(char: string): number {
  const code = char.charCodeAt(0);
  // Convert to lowercase using bitwise OR
  return code | 0x20; // Sets bit 5 to make uppercase -> lowercase
}

// Array-based approach
function isPalindromeArray(s: string): boolean {
  const chars: string[] = [];

  // Extract only alphanumeric characters in lowercase
  for (const char of s) {
    if (isAlphanumeric(char)) {
      chars.push(toLowerCase(char));
    }
  }

  // Check palindrome using two pointers on array
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    if (chars[left] !== chars[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Unicode-aware version
function isPalindromeUnicode(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric Unicode characters
    while (left < right && !isAlphanumericUnicode(s[left])) {
      left++;
    }

    while (left < right && !isAlphanumericUnicode(s[right])) {
      right--;
    }

    // Unicode-aware case-insensitive comparison
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphanumericUnicode(char: string): boolean {
  return /[a-zA-Z0-9]/.test(char);
}

// Test cases
console.log("=== 125. Valid Palindrome Tests ===");
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true
console.log(isPalindrome("a.")); // Expected: true
console.log(isPalindrome("ab")); // Expected: false

// Edge cases
console.log(isPalindrome("")); // Expected: true
console.log(isPalindrome("a")); // Expected: true
console.log(isPalindrome("Aa")); // Expected: true
console.log(isPalindrome("abA")); // Expected: false
console.log(isPalindrome("0P")); // Expected: false

// Complex cases
console.log(isPalindrome("Was it a car or a cat I saw?")); // Expected: true
console.log(isPalindrome("Madam, I'm Adam")); // Expected: true
console.log(isPalindrome("Never odd or even")); // Expected: true
console.log(isPalindrome("No 'x' in Nixon")); // Expected: true
console.log(isPalindrome("Mr. Owl ate my metal worm")); // Expected: true

// Numeric cases
console.log(isPalindrome("A1B2b1a")); // Expected: true
console.log(isPalindrome("1A2")); // Expected: false
console.log(isPalindrome("121")); // Expected: true
console.log(isPalindrome("12321")); // Expected: true

// Performance comparison
console.log("\n=== Performance Comparison ===");
const testCases = [
  "A man, a plan, a canal: Panama",
  "race a car",
  " ",
  "a.",
  "Was it a car or a cat I saw?",
  "Madam, I'm Adam",
  "A1B2b1a",
];

console.log("Two pointers (inline):");
testCases.forEach((test) => console.log(`  "${test}": ${isPalindrome(test)}`));

console.log("Preprocessing:");
testCases.forEach((test) =>
  console.log(`  "${test}": ${isPalindromePreprocess(test)}`),
);

console.log("Optimized:");
testCases.forEach((test) =>
  console.log(`  "${test}": ${isPalindromeOptimized(test)}`),
);

// Large test case
const largePalindrome = "a".repeat(1000) + "b".repeat(1000) + "a".repeat(1000);
console.log(`\nLarge palindrome test: ${isPalindrome(largePalindrome)}`); // Expected: true

const largeNonPalindrome =
  "a".repeat(1000) + "b".repeat(1000) + "c".repeat(1000);
console.log(`Large non-palindrome test: ${isPalindrome(largeNonPalindrome)}`); // Expected: false
