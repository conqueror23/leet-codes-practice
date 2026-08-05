import { check } from "./utils/check";

/**
  *
  *Given meeting intervals, return the minimum number of rooms required.
Key idea: track simultaneous meetings
Sort all start times and end times separately. Process meetings chronologically:
If the next meeting starts before the earliest meeting ends, allocate another room.
Otherwise, that meeting has ended, so its room can be reused.
When start === end, reuse the room.
  *
  */

function minMeetingRooms(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  const starts = intervals.map(([start]) => start).sort((a, b) => a - b);
  const ends = intervals.map(([, end]) => end).sort((a, b) => a - b);

  let startIndex = 0;
  let endIndex = 0;
  let roomsInUse = 0;
  let maxRooms = 0;

  while (startIndex < intervals.length) {
    if (starts[startIndex] < ends[endIndex]) {
      // A meeting starts before the earliest active meeting ends.
      roomsInUse++;
      maxRooms = Math.max(maxRooms, roomsInUse);
      startIndex++;
    } else {
      // The earliest meeting ended; its room can be reused.
      roomsInUse--;
      endIndex++;
    }
  }

  return maxRooms;
}
function minMeetingRoomsRaw(intervals: number[][]): number {
  if (intervals.length === 0) return 0;
  let maxTime = 0;

  for (const [, end] of intervals) {
    maxTime = Math.max(maxTime, end);
  }

  const timeline = new Int32Array(maxTime + 1);

  for (const [start, end] of intervals) {
    timeline[start]++; // room becomes occupied
    timeline[end]--;   // room becomes available
  }

  let roomsInUse = 0;
  let maxRooms = 0;

  console.log("timeline", timeline)
  for (const change of timeline) {
    roomsInUse += change;
    maxRooms = Math.max(maxRooms, roomsInUse);
  }
  return maxRooms;
}

const intervals1 = [[0, 30], [5, 10], [15, 20]]
const output1 = 2

{
  check(`case 1 `, minMeetingRoomsRaw(intervals1), output1)

}

export { }
