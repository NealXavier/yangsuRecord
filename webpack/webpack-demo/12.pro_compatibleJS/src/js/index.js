
const add = (a, b) => a+b


// 没有引入垫片,在IE环境下会提示promise未定义
// 使用 core-js 打包，直接减少了 3/4的体积
const promise = new Promise(resolve=>{
  setTimeout(()=>{
    console.log('定时器执行结束')
    resolve()
  },1000)
})

console.log(promise);
console.log(add(1,2));
