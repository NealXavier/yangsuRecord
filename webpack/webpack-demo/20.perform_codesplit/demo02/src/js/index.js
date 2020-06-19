// import {mul} from './test.js'

import $ from 'jquery'

function add(...args){
  return args.reduce((prev,next)=>prev+next,0)
}

// disable-eslint-next-line
console.log(add(1,2,3,4))

// disable-eslint-next-line
// console.log(mul(3,4))
