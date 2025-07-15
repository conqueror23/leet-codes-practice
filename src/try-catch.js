const finalAlwaysRunFirst = (a) => {
  try {
    if (a > 0) return "OK"
    return 'Not OK'
  } catch(e) {
    console.log(e)
    return "Wrong"
  }
}

const res = finalAlwaysRunFirst(-1)

console.log(res)
