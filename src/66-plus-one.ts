function plusOne(digits: number[]): number[] {
    const dLength = digits.length
    let r = digits[dLength-1] ?? 0
    r= r+1
    let remains = digits.splice(0,dLength-1)
    if(r/10 >=1){
        remains = plusOne(remains)
        r = r%10
    }
    return [...remains,r]
};

// ---- tests ----
{
  const check = (name: string, actual: unknown, expected: unknown): void => {
    console.log(JSON.stringify(actual) === JSON.stringify(expected)
      ? `PASS ${name}`
      : `FAIL ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }

  check("case1 [1,2,3]", plusOne([1, 2, 3]), [1, 2, 4])
  check("case2 [9] carries", plusOne([9]), [1, 0])
  check("case3 [9,9] carries twice", plusOne([9, 9]), [1, 0, 0])
  check("case4 [4,3,2,1]", plusOne([4, 3, 2, 1]), [4, 3, 2, 2])
  check("case5 [1,9] carry in middle", plusOne([1, 9]), [2, 0])
}

// make this file a module so its declarations stay file-scoped
export {}
