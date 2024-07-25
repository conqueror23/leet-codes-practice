function mergeAlternately(word1: string, word2: string): string {
    let A = word1.length
    let B = word2.length
    let a = 0
    let b = 0
    const result:string[] =[]

    let word =1
    while(a<A && b<B){
        if(word ===1){
            result.push(word1[a])
            a++
            word=2
        }else{
            result.push(word2[b])
            b++
            word=1
        }
    }
    while(a<A){
        result.push(word1[a])
        a++
    }
    while(b<B){
        result.push(word2[b])
        b++
    }
    return result.join("")
};


console.log("adbecfgh ==","adbecfgh"===mergeAlternately("abc","defgh"))
