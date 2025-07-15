// LeetCode 295: Find Median from Data Stream (Hard)
// The median is the middle value in an ordered integer list. Design a data structure that supports adding integer to a data structure and finding the median of all elements.

class MedianFinder {
    private maxHeap: number[]; // for smaller half
    private minHeap: number[]; // for larger half

    constructor() {
        this.maxHeap = [];
        this.minHeap = [];
    }

    addNum(num: number): void {
        // Add to max heap (smaller half)
        this.maxHeap.push(num);
        this.maxHeap.sort((a, b) => b - a);

        // Balance: move largest from maxHeap to minHeap
        if (this.maxHeap.length > 0) {
            this.minHeap.push(this.maxHeap.shift()!);
            this.minHeap.sort((a, b) => a - b);
        }

        // Balance sizes: maxHeap should have at most one more element than minHeap
        if (this.minHeap.length > this.maxHeap.length) {
            this.maxHeap.push(this.minHeap.shift()!);
            this.maxHeap.sort((a, b) => b - a);
        }
    }

    findMedian(): number {
        if (this.maxHeap.length > this.minHeap.length) {
            return this.maxHeap[0];
        }
        return (this.maxHeap[0] + this.minHeap[0]) / 2;
    }
}

// Test case
const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
console.log(medianFinder.findMedian()); // 1.5
medianFinder.addNum(3);
console.log(medianFinder.findMedian()); // 2.0