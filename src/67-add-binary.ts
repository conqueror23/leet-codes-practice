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

// ---- tests ----
{
  const check = (name: string, actual: string, expected: string): void => {
    console.log(actual === expected
      ? `PASS ${name}`
      : `FAIL ${name}: expected "${expected}", got "${actual}"`)
  }

  check("case1 11 + 1", addBinary("11", "1"), "100")
  check("case2 1010 + 1011", addBinary("1010", "1011"), "10101")
  check("case3 0 + 0", addBinary("0", "0"), "0")
  check("case4 1010 + 11", addBinary("1010", "11"), "1101")
  check("case5 100 + 110010", addBinary("100", "110010"), "110110")
}

// make this file a module so its declarations stay file-scoped
export {}
