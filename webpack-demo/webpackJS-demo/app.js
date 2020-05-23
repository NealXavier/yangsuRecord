// es module 方式
import sum from './sum'

// commonJS
let minus = require('./minus')

console.log('sum(23,24):',sum(23,24))
console.log('minus(23,24):',minus(23,24))

// requireJS(AMD)
require(['./muti'],function(muti){
  console.log('muti(2,3):',muti(2,3))
})

