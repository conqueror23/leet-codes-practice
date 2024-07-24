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

console.log('plus one',plusOne([9]))
