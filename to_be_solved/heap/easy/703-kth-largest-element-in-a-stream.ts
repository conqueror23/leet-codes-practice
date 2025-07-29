// LeetCode 703: Kth Largest Element in a Stream (Easy)
// Design a class to find the kth largest element in a stream.

class KthLargest {
    private k: number;
    heap: number[];

    constructor(k: number, nums: number[]) {
        this.k = k;
        this.heap = nums.sort((a, b) => a - b);
        while (this.heap.length > k) {
            this.heap.shift();
        }
    }

    add(val: number): number {
        this.heap.push(val);
        this.heap.sort((a, b) => a - b);
        
        if (this.heap.length > this.k) {
            this.heap.shift();
        }
        
        return this.heap[0];
    }
}

// Test case
const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthLargest.add(3),kthLargest.heap); // 4
console.log(kthLargest.add(5),kthLargest.heap); // 5
console.log(kthLargest.add(10),kthLargest.heap); // 5
