function isValid(s: string): boolean {
    const dictMap = new Map([
        ['[',']'],
        ['(',')'],
        ['{','}']
    ])

    const waitQue:string[] = []
    for(const i of s){
        const keys = [...dictMap.keys()]
        if(keys.includes(i)){
            waitQue.push(dictMap.get(i)!)
            continue
        }

        const last = waitQue.pop()
        if(last !== i){
           return false 
        }
        continue
    }
    return waitQue.length ===0
};

const testCase1 = "{([])}"
const testCase2 = "{([)}"
const testCase3 = "{([}"

const validRes1 = isValid(testCase1)
const validRes2 = isValid(testCase2)
const validRes3 = isValid(testCase3)

console.log('case1',validRes1 === true)
console.log('case2',validRes2 === false)
console.log('case3',validRes3 === false)
