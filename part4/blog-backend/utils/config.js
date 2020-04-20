require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

console.log(MONGODB_URI)

module.exports = {
  PORT,
  MONGODB_URI,
}
