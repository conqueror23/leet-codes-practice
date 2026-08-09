

// works but less efficient
class TimeMapFailed {
  private cache = new Map<string, { value: string, timestamp: number }[]>()
  set(key: string, value: string, timestamp: number): void {
    const existingRecord = this.cache.get(key)
    if (!existingRecord) {
      this.cache.set(key, [{ value, timestamp }])
    } else {
      this.cache.set(key, [...existingRecord, { value, timestamp }])
    }
  }

  get(key: string, timestamp: number): string {
    try {
      const allRecords = this.cache.get(key)
      if (allRecords) {
        const orderedRecords = allRecords
          .sort((a, b) => a.timestamp - b.timestamp)
        const filterRes = orderedRecords.filter(({ timestamp: preTime }) => preTime <= timestamp)

        const final = filterRes.pop()!
        return final.value
      }
      return ""
    } catch (e) {
      console.log('error', e)
      return ""
    }
  }
}

class TimeMap {
  private cache = new Map<string, [number, string][]>()
  set(key: string, value: string, timestamp: number): void {
    const entries = this.cache.get(key);
    if (entries) {
      entries.push([timestamp, value]);
    } else {
      this.cache.set(key, [[timestamp, value]]);
    }
  }

  get(key: string, timestamp: number): string {
    const entries = this.cache.get(key)
    if (!entries) return ""
    let left = 0
    let right = entries.length - 1
    let results = ""
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2)
      const [midTimeStamp, midValue] = entries[mid]
      if (midTimeStamp <= timestamp) {
        results = midValue
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return results
  }
}

{
  const records = [
    { key: "a", value: "test", timestamp: 1 },
    { key: "a", value: "test1", timestamp: 2 },
    { key: "a", value: "test2", timestamp: 3 },
    { key: "a", value: "test3", timestamp: 4 },
  ]

  const timeMap = new TimeMap()
  const rec1 = records[0]
  records.forEach(rec => {
    const { key, value, timestamp } = rec
    timeMap.set(key, value, timestamp)
  });

  const res = timeMap.get(rec1.key, 3)
  console.log('res', res)
}
export { }

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
