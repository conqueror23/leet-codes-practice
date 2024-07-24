//s1
// function addBinary(a: string, b: string): string {
//   const aNumber =parseInt(a,2)
//   const bNumber =parseInt(b,2)
//
//   const result = aNumber+bNumber
//   return result.toString(2)
// };

//s2
function addBinary(a: string, b: string): string {
let result: string = "";

  let carry = 0;
  for(let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
    const num1 = parseInt(a[i] ?? "0");
    const num2 = parseInt(b[j] ?? "0");
    const sum = num1 + num2 + carry;
    
    carry = sum > 1 ? 1 : 0;
    result = (sum % 2 === 1 ? "1" : "0") + result;
  }

  return carry ? "1" + result : result;};

// console.log('expected 100 -',addBinary('1','11'))
// console.log('expected 1101 -',addBinary('1010','11'))

// console.log('expected 110110 -',addBinary('100','110010'))
// console.log('expected 0 -',addBinary('0','0'))

console.log('expected 0 -',addBinary('1010','1011'))

// console.log('expected 0 -',addBinary('100','110010'))
