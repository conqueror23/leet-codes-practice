import { check } from "../utils/check";

function merge(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [];

  for (const [start, end] of intervals) {
    const last = merged[merged.length - 1];

    if (!last || start > last[1]) {
      // No overlap
      merged.push([start, end]);
    } else {
      // Overlap: extend the previous interval if necessary
      last[1] = Math.max(last[1], end);
    }
  }

  return merged;
};

function mergeOpt(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  const result: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      result.push(current);
    }
  }

  return result;
}

function mergeNoSort(intervals: number[][]): number[][] {
  const MAX = 10_000;
  const maxEndAtStart = new Array<number>(MAX + 1).fill(-1);

  // Keep the furthest end for each start coordinate
  for (const [start, end] of intervals) {
    maxEndAtStart[start] = Math.max(maxEndAtStart[start], end);
  }

  const result: number[][] = [];
  let currentStart = -1;
  let currentEnd = -1;

  for (let start = 0; start <= MAX; start++) {
    const end = maxEndAtStart[start];

    if (end === -1) continue;

    if (currentStart === -1) {
      //initiate temp saving
      currentStart = start;
      currentEnd = end;
    } else if (start <= currentEnd) {
      //extend if you could
      currentEnd = Math.max(currentEnd, end);
    } else {
      //stop extends but adding final results
      result.push([currentStart, currentEnd]);
      currentStart = start;
      currentEnd = end;
    }
  }

  //to handle the last items in the temp memory
  if (currentStart !== -1) {
    result.push([currentStart, currentEnd]);
  }

  return result;
}

const intervals1 = [[1, 3], [2, 6], [8, 10], [7, 8], [15, 18]]
const res1 = [[1, 6], [7, 10], [15, 18]]


{
  check(`${intervals1} -res ${res1}`, mergeNoSort(intervals1), res1)
}

export { }
