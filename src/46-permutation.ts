var permute = function(xs) {
      let ret = [];
    for (let i = 0; i < xs.length; i = i + 1) {
      let rest = permute(xs.slice(0, i).concat(xs.slice(i + 1)));
    //   console.log(rest)
      if(!rest.length) {
        ret.push([xs[i]])
      } else {
        for(let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]))
        //   console.log(ret)
        }
      }
    }
    return ret;
};
