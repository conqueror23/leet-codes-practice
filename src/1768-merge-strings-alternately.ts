import { check } from "./utils/check"

function mergeAlternately(word1: string, word2: string): string {
    const A = word1.length
    const B = word2.length
    let a = 0
    let b = 0
    const result: string[] = []

    let word = 1
    while (a < A && b < B) {
        if (word === 1) {
            result.push(word1[a])
            a++
            word = 2
        } else {
            result.push(word2[b])
            b++
            word = 1
        }
    }
    while (a < A) {
        result.push(word1[a])
        a++
    }
    while (b < B) {
        result.push(word2[b])
        b++
    }
    return result.join("")
};


// ---- tests ----
{

  check("case1 same length", mergeAlternately("abc", "pqr"), "apbqcr")
  check("case2 word2 longer", mergeAlternately("ab", "pqrs"), "apbqrs")
  check("case3 word1 longer", mergeAlternately("abcd", "pq"), "apbqcd")
  check("case4 [abc, defgh]", mergeAlternately("abc", "defgh"), "adbecfgh")
}

// make this file a module so its declarations stay file-scoped
export {}
