import { check } from "../utils/check";

function TreeConstructor(strArr) {


  return strArr;
}


const input = ["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)"]
const output = true;

{
  check(`${input} - ${output}`, TreeConstructor(input), output)
}

export { }
