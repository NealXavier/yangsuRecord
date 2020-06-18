import main from '../css/main.css'

function add(...args){
  return args.reduce((prev,next)=>prev+next,0)
}
console.log(add(1,2,3,4))

console.log(mul(3*4))
