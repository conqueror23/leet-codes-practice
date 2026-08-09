import { check } from "../utils/check"

function findKthLargest(nums: number[], k: number): number {
  class MinHeap {
    private heap: number[] = []
    size() { return this.heap.length }
    peek() { return this.heap[0] }
    push(value: number) {
      this.heap.push(value)
      this.bubbleUp()
    }
    pop() {
      if (this.size() === 0) return undefined
      const min = this.heap[0]
      const last = this.heap.pop()!
      if (this.size() > 0) {
        this.heap[0] = last
        this.bubbleDown()
      }
      return min
    }
    private bubbleUp() {
      let index = this.size() - 1
      while (index > 0) {
        const parent = Math.floor((index - 1) / 2)
        if (this.heap[parent] <= this.heap[index]) break
        [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]]
        index = parent
      }
    }
    private bubbleDown() {
      let index = 0
      while (true) {
        let smallest = index
        const left = index * 2 + 1
        const right = index * 2 + 2
        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right
        if (smallest === index) break
        [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]]
        index = smallest
      }
    }
  }

  if (nums.length <= 0) return -1
  const minHeap = new MinHeap()

  for (const num of nums) {
    minHeap.push(num)

    if (minHeap.size() > k) {
      console.log('num', num)
      minHeap.pop()
    }
  }
  return minHeap.peek()!
}


const nums = [3, 2, 1, 5, 6, 4]
const k = 5
const res = 2

{
  check(`case 1 `, findKthLargest(nums, k), res)

}

export {

}
