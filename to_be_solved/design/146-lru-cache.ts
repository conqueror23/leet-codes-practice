// LeetCode 146: LRU Cache
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

class LRUCache {
    private capacity: number;
    private cache: Map<number, number>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: number): number {
        if (this.cache.has(key)) {
            const value = this.cache.get(key)!;
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return -1;
    }

    put(key: number, value: number): void {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

// Test case
const lRUCache = new LRUCache(2);
lRUCache.put(1, 1);
lRUCache.put(2, 2);
console.log(lRUCache.get(1)); // 1
lRUCache.put(3, 3);
console.log(lRUCache.get(2)); // -1
lRUCache.put(4, 4);
console.log(lRUCache.get(1)); // -1
console.log(lRUCache.get(3)); // 3
console.log(lRUCache.get(4)); // 4