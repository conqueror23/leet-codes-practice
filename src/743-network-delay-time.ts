import { check } from "./utils/check"


/**
  *You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.
We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

  */


class MinHeap {
  heap: [number, number][] = [];

  push(item: [number, number]) {
    this.heap.push(item);
    this.bubbleUp();
  }

  pop(): [number, number] | undefined {
    if (this.heap.length === 0) return undefined;

    const min = this.heap[0];
    const end = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }

    return min;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.heap[parent][0] <= this.heap[index][0]) break;

      [this.heap[parent], this.heap[index]] =
        [this.heap[index], this.heap[parent]];

      index = parent;
    }
  }

  bubbleDown() {
    let index = 0;

    while (true) {
      let smallest = index;

      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (
        left < this.heap.length &&
        this.heap[left][0] < this.heap[smallest][0]
      ) {
        smallest = left;
      }

      if (
        right < this.heap.length &&
        this.heap[right][0] < this.heap[smallest][0]
      ) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] =
        [this.heap[smallest], this.heap[index]];

      index = smallest;
    }
  }
}

function networkDelayTime(
  times: number[][],
  n: number,
  k: number
): number {

  const graph = new Map<number, [number, number][]>();

  for (const [u, v, w] of times) {
    if (!graph.has(u)) {
      graph.set(u, []);
    }
    graph.get(u)!.push([v, w]);
  }

  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;

  const heap = new MinHeap();
  heap.push([0, k]);

  while (heap.size()) {

    const [currDist, node] = heap.pop()!;

    if (currDist > dist[node]) continue;

    for (const [next, weight] of graph.get(node) ?? []) {

      const newDist = currDist + weight;

      if (newDist < dist[next]) {

        dist[next] = newDist;

        heap.push([newDist, next]);
      }
    }
  }

  let answer = 0;

  for (let i = 1; i <= n; i++) {

    if (dist[i] === Infinity) {
      return -1;
    }

    answer = Math.max(answer, dist[i]);
  }

  return answer;
}

const times = [[2, 1, 1], [2, 3, 1], [3, 4, 1]]
const n = 4
const k = 2
const res = 2



{
  check(`n ${n} - K ${k} - res${res}`, networkDelayTime(times, n, k), res)
}

export { }
