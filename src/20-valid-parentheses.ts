import { check } from "./utils/check"

function isValid(s: string): boolean {
  const dictMap = new Map([
    ['[', ']'],
    ['(', ')'],
    ['{', '}']
  ])

  const waitQue: string[] = []
  for (const i of s) {
    const keys = [...dictMap.keys()]
    if (keys.includes(i)) {
      waitQue.push(dictMap.get(i)!)
      continue
    }

    const last = waitQue.pop()
    if (last !== i) {
      return false
    }
    continue
  }
  return waitQue.length === 0
};

// ---- tests ----
{

  check("case1 {([])}", isValid("{([])}"), true)
  check("case2 {([)}", isValid("{([)}"), false)
  check("case3 {([}", isValid("{([}"), false)
  check("case4 ()[]{}", isValid("()[]{}"), true)
  check("case5 ([)]", isValid("([)]"), false)
  check("case6 lone open (", isValid("("), false)
  check("case7 lone close ]", isValid("]"), false)
}

// make this file a module so its declarations stay file-scoped
export {}
