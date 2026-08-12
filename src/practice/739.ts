import { check } from "../utils/check"

function dailyTemperaturesB(temperatures: number[]): number[] {
  const answer = new Array(temperatures.length).fill(0);
  for (let i = 0; i < temperatures.length; i++) {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temperatures[i]) {
        answer[i] = j - i;
        break;
      }
    }
  }

  return answer;
}

function dailyTemperaturesSel(temperatures: number[]): number[] {

  const answer = new Array(temperatures.length).fill(0)

  const stack: number[] = []
  for (let current = 0; current < temperatures.length; current++) {
    while (
      stack.length > 0 &&
      temperatures[current] >> temperatures[stack[stack.length - 1]]
    ) {
      //indexeds diff
      const previousIndex = stack.pop()!
      answer[current] = current - previousIndex
    }

    stack.push(current)
  }
}


function dailyTemperaturesOpt(temperatures: number[]): number[] {
  const answer = new Array(temperatures.length).fill(0);
  const stack: number[] = [];

  for (let current = 0; current < temperatures.length; current++) {
    while (
      stack.length > 0 &&
      temperatures[current] > temperatures[stack[stack.length - 1]]
    ) {
      const previous = stack.pop()!;
      answer[previous] = current - previous;
    }

    stack.push(current);
  }

  return answer;
}


function dailyTemperatures(temperatures: number[]): number[] {
  let tempIndex = 1
  let pre = temperatures[0]
  const results: number[] = Array(temperatures.length).fill(0)
  for (
    let resultIndex = 0;
    resultIndex < temperatures.length;
    resultIndex++) {

    while (
      resultIndex === temperatures.length - 1 &&
      tempIndex < temperatures.length
    ) {
      if (temperatures[tempIndex] > pre) {
        console.log('tempIndex', resultIndex, tempIndex, temperatures[tempIndex], pre);
        results[resultIndex]++
        pre = temperatures[tempIndex]
        tempIndex++
      } else {
        tempIndex++
      }
    }
  }
  return results
};

const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

//                     |                    

const output1 = [1, 1, 4, 2, 1, 1, 0, 0]

{
  check(`case 1 `, dailyTemperaturesOpt(temperatures), output1)
}

export { }
