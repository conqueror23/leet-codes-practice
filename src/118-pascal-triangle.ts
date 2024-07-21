
function generate(numRows: number): number[][] {
  const refArray:number[][] = []

  for(var index =1; index<numRows+1;index++){
    const line = Array(index).fill(1)
    refArray.push(line)
  }

  if(numRows <2) return refArray

  for(var y =2;y<numRows;y++){
    const line = refArray[y]
    for(var x =0;x<line.length;x++){
        if(x === 0 || x === line.length-1) continue 
        refArray[y][x] = refArray[y-1][x-1]+refArray[y-1][x]
    }
  }


  return refArray
};




console.log("result",generate(5))
