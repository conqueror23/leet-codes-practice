import { check } from "../utils/check";

function StringExpression(str: string): string {
  const digitMap: Record<string, string> = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  const wordMap: Record<string, string> = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
  };

  //manual add fullstop at the end
  const finalStr = str + "plus"

  // Split the string into tokens
  const tokens = finalStr.match(
    /zero|one|two|three|four|five|six|seven|eight|nine|plus|minus/g
  )!;

  let result = 0;
  let currentNumber = "";
  let operator = "+";

  for (const token of tokens) {
    if (token === "plus" || token === "minus") {
      const number = Number(currentNumber);
      if (operator === "+") {
        result += number;
      } else {
        result -= number;
      }

      currentNumber = "";
      operator = token === "plus" ? "+" : "-";
    } else {
      // digit
      currentNumber += digitMap[token];
    }
  }

  // Convert result back to words
  let answer = "";

  if (result < 0) {
    answer += "negative";
    result = Math.abs(result);
  }

  for (const digit of result.toString()) {
    answer += wordMap[digit];
  }

  return answer;

}


//46-22+10 =34
//foursix minus twotwo plus onezero
const input = "onezeropluseight"
const output = "oneeight"

const input1 = "foursixminustwotwoplusonezero"
const output1 = "threefour"


{
  // check(`${input} - ${output}`, StringExpression(input), output)

  check(`${input1} - ${output1}`, StringExpression(input1), output1)

}
export { }
