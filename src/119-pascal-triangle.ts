function getRow(rowIndex: number): number[] {
  let rowAbove:number[] =[]

  for(var y= 0;y<=rowIndex;y++){
    const line = Array(y+1).fill(1)
    for(var x =1;x<y;x++){
      line[x] = rowAbove[x-1]+rowAbove[x]
    }
    rowAbove = line
  }
  return rowAbove
};



console.log("getRow",getRow(3))