function fib(n:number):any{
  if(n <=2){
    return 1
  }else{
    return fib(n-1) + fib(n-2)
  }
}

console.log(fib(100000))
