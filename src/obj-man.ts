const userA = { "name": "bob", age: 123 }

const userB = Object.assign({ "name": 'test' }, userA)

const users = [userA, userB]

console.log(users)
