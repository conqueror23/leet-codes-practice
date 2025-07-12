const finalAlwaysRunFirst = (a: number) => {
  try {
    if (a > 0)
      return "OK"

  } finally {
    return "Wrong"

  }
}

finalAlwaysRunFirst(-1)
