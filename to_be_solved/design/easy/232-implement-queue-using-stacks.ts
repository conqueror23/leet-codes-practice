// LeetCode 232: Implement Queue using Stacks (Easy)
// Implement a first in first out (FIFO) queue using only two stacks.

class MyQueue {
    private stack1: number[];
    private stack2: number[];

    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }

    push(x: number): void {
        this.stack1.push(x);
    }

    pop(): number {
        this.peek();
        return this.stack2.pop()!;
    }

    peek(): number {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop()!);
            }
        }
        return this.stack2[this.stack2.length - 1];
    }

    empty(): boolean {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}

// Test case
const myQueue = new MyQueue();
myQueue.push(1);
myQueue.push(2);
console.log(myQueue.peek()); // 1
console.log(myQueue.pop()); // 1
console.log(myQueue.empty()); // false