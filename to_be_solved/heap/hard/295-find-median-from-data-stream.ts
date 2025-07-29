/**
 * 295. Find Median from Data Stream - Hard
 * 
 * The median is the middle value in an ordered integer list. If the size of the list is even, 
 * there is no middle value and the median is the mean of the two middle values.
 * 
 * Implement the MedianFinder class:
 * - MedianFinder() initializes the MedianFinder object.
 * - void addNum(int num) adds the integer num from the data stream to the data structure.
 * - double findMedian() returns the median of all elements so far.
 */

class MedianFinder {
    private maxHeap: MaxHeap; // For smaller half of numbers
    private minHeap: MinHeap; // For larger half of numbers
    
    constructor() {
        // Advanced: Two heaps approach for O(log n) insertion and O(1) median
        this.maxHeap = new MaxHeap(); // Left half (smaller values)
        this.minHeap = new MinHeap(); // Right half (larger values)
    }
    
    addNum(num: number): void {
        // Add to appropriate heap
        if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
            this.maxHeap.add(num);
        } else {
            this.minHeap.add(num);
        }
        
        // Balance heaps - ensure sizes differ by at most 1
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.add(this.maxHeap.extract());
        } else if (this.minHeap.size() > this.maxHeap.size() + 1) {
            this.maxHeap.add(this.minHeap.extract());
        }
    }
    
    findMedian(): number {
        if (this.maxHeap.size() === this.minHeap.size()) {
            // Even number of elements
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        } else if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.peek();
        } else {
            return this.minHeap.peek();
        }
    }
}

// Advanced heap implementations
class MaxHeap {
    private heap: number[] = [];
    
    add(val: number): void {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }
    
    extract(): number {
        if (this.heap.length === 0) throw new Error("Heap is empty");
        if (this.heap.length === 1) return this.heap.pop()!;
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0);
        return max;
    }
    
    peek(): number {
        if (this.heap.length === 0) throw new Error("Heap is empty");
        return this.heap[0];
    }
    
    size(): number {
        return this.heap.length;
    }
    
    isEmpty(): boolean {
        return this.heap.length === 0;
    }
    
    private heapifyUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] <= this.heap[parentIndex]) break;
            
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    private heapifyDown(index: number): void {
        while (true) {
            let largest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && this.heap[leftChild] > this.heap[largest]) {
                largest = leftChild;
            }
            
            if (rightChild < this.heap.length && this.heap[rightChild] > this.heap[largest]) {
                largest = rightChild;
            }
            
            if (largest === index) break;
            
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

class MinHeap {
    private heap: number[] = [];
    
    add(val: number): void {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }
    
    extract(): number {
        if (this.heap.length === 0) throw new Error("Heap is empty");
        if (this.heap.length === 1) return this.heap.pop()!;
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0);
        return min;
    }
    
    peek(): number {
        if (this.heap.length === 0) throw new Error("Heap is empty");
        return this.heap[0];
    }
    
    size(): number {
        return this.heap.length;
    }
    
    isEmpty(): boolean {
        return this.heap.length === 0;
    }
    
    private heapifyUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) break;
            
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    private heapifyDown(index: number): void {
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }
            
            if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }
            
            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

// Alternative: Sorted array approach (less efficient but simpler)
class MedianFinderArray {
    private nums: number[] = [];
    
    addNum(num: number): void {
        // Binary search insertion to maintain sorted order
        let left = 0;
        let right = this.nums.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (this.nums[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        this.nums.splice(left, 0, num);
    }
    
    findMedian(): number {
        const n = this.nums.length;
        if (n % 2 === 0) {
            return (this.nums[n / 2 - 1] + this.nums[n / 2]) / 2;
        } else {
            return this.nums[Math.floor(n / 2)];
        }
    }
}

// Advanced: Multiset-like approach with frequency counting
class MedianFinderFreq {
    private counts = new Map<number, number>();
    private nums: number[] = [];
    private totalCount = 0;
    private isSorted = true;
    
    addNum(num: number): void {
        this.counts.set(num, (this.counts.get(num) || 0) + 1);
        this.nums.push(num);
        this.totalCount++;
        this.isSorted = false;
    }
    
    findMedian(): number {
        if (!this.isSorted) {
            this.nums.sort((a, b) => a - b);
            this.isSorted = true;
        }
        
        if (this.totalCount % 2 === 0) {
            const mid1 = this.nums[this.totalCount / 2 - 1];
            const mid2 = this.nums[this.totalCount / 2];
            return (mid1 + mid2) / 2;
        } else {
            return this.nums[Math.floor(this.totalCount / 2)];
        }
    }
}

// Optimized: Balanced BST approach concept
class MedianFinderBST {
    private root: TreeNode | null = null;
    private count = 0;
    
    addNum(num: number): void {
        this.root = this.insert(this.root, num);
        this.count++;
    }
    
    findMedian(): number {
        if (this.count === 0) return 0;
        
        if (this.count % 2 === 1) {
            // Odd count - find middle element (0-indexed: count/2)
            return this.findKth(this.root!, Math.floor(this.count / 2));
        } else {
            // Even count - find two middle elements
            const mid1 = this.findKth(this.root!, this.count / 2 - 1);
            const mid2 = this.findKth(this.root!, this.count / 2);
            return (mid1 + mid2) / 2;
        }
    }
    
    private insert(node: TreeNode | null, val: number): TreeNode {
        if (!node) {
            return new TreeNode(val);
        }
        
        if (val <= node.val) {
            node.left = this.insert(node.left, val);
            node.leftCount++;
        } else {
            node.right = this.insert(node.right, val);
        }
        
        return node;
    }
    
    private findKth(node: TreeNode, k: number): number {
        const leftCount = node.leftCount;
        
        if (k < leftCount) {
            return this.findKth(node.left!, k);
        } else if (k === leftCount) {
            return node.val;
        } else {
            return this.findKth(node.right!, k - leftCount - 1);
        }
    }
}

class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    leftCount = 0; // Count of nodes in left subtree
    
    constructor(val: number) {
        this.val = val;
    }
}

// Test cases
console.log("=== 295. Find Median from Data Stream Tests ===");

function testMedianFinder() {
    const mf = new MedianFinder();
    
    console.log("Test 1: Basic operations");
    mf.addNum(1);
    mf.addNum(2);
    console.log("Median after [1,2]:", mf.findMedian()); // Expected: 1.5
    
    mf.addNum(3);
    console.log("Median after [1,2,3]:", mf.findMedian()); // Expected: 2
    
    console.log("\nTest 2: More operations");
    const mf2 = new MedianFinder();
    const nums = [6, 10, 2, 6, 5, 0, 6, 3, 1, 0, 0];
    const medians: number[] = [];
    
    for (const num of nums) {
        mf2.addNum(num);
        medians.push(mf2.findMedian());
    }
    
    console.log("Numbers:", nums);
    console.log("Medians:", medians);
    
    console.log("\nTest 3: Duplicates");
    const mf3 = new MedianFinder();
    [1, 1, 1, 1, 1].forEach(num => {
        mf3.addNum(num);
        console.log(`After adding ${num}: ${mf3.findMedian()}`);
    });
    
    console.log("\nTest 4: Large range");
    const mf4 = new MedianFinder();
    [-10000, 10000, -10000, 10000, 0].forEach(num => {
        mf4.addNum(num);
        console.log(`After adding ${num}: ${mf4.findMedian()}`);
    });
}

testMedianFinder();

// Performance comparison
console.log("\n=== Performance Comparison ===");

function performanceTest() {
    const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    console.log("Two heaps approach:");
    const mf1 = new MedianFinder();
    testData.forEach(num => {
        mf1.addNum(num);
        console.log(`  Add ${num}, median: ${mf1.findMedian()}`);
    });
    
    console.log("\nSorted array approach:");
    const mf2 = new MedianFinderArray();
    testData.forEach(num => {
        mf2.addNum(num);
        console.log(`  Add ${num}, median: ${mf2.findMedian()}`);
    });
}

performanceTest();

// Large scale test
console.log("\n=== Large Scale Test ===");
const largeMf = new MedianFinder();
const largeData = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));

largeData.slice(0, 10).forEach((num, i) => {
    largeMf.addNum(num);
    if (i < 5) console.log(`Step ${i + 1}: add ${num}, median = ${largeMf.findMedian()}`);
});

console.log("Successfully processed 1000 numbers");
console.log(`Final median: ${largeMf.findMedian()}`);