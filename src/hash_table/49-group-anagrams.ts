import { check } from "../utils/check";

function groupAnagrams(strs: string[]): string[][] {
  const itemMap = new Map<string, string[]>()

  for (const item of strs) {
    const items = item.split("").sort().join("")
    if (itemMap.has(items)) {
      itemMap.get(items)!.push(item)
      continue
    }
    itemMap.set(items, [item])
  }

  return [...itemMap.values()].sort((a, b) => a.length - b.length)
};

function groupAnagramsOpt(strs: string[]): string[][] {
  const groups = new Map<string, string[]>()

  for (const word of strs) {
    const frequency = new Array<number>(26).fill(0)

    for (const char of word) {
      const index = char.charCodeAt(0) - 97 // 'a' = 97
      frequency[index]++
    }

    // Separators prevent ambiguous keys:
    // [1, 11] and [11, 1] must produce different keys.
    const key = frequency.join("#")
    const group = groups.get(key)

    console.log("gropu", groups)
    console.log("gropu", group)

    if (group) {
      group.push(word)
    } else {
      groups.set(key, [word])
    }
  }

  return Array.from(groups.values())
}


const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

const res = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]

{
  check(`${strs}-- ${res}`, groupAnagramsOpt(strs), res)
}

export { }
