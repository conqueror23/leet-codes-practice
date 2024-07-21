function countBits(n: number): number[] {
  const result:number[] =[]
  for(var c=0;c<=n;c++){
    const cBin = c.toString(2)
    const bit = cBin.split("").reduce((acc,c)=>acc+Number(c),0)

    result.push(bit)
  }
  return result
};


// console.log('5',countBits(9))
//




  

for(var c=0;c<4;c++){
  console.log(c)
}

  console.log('outside',c)
