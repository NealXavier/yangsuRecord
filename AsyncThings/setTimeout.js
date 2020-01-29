// 宏任务 VS 微任务
console.log('starr here')
new Promise((resolve,reject) =>{
  console.log('first promise constructor')
  resolve()
})
.then(()=>{
  console.log('first promise then')
  return new Promise((resolve,reject)=>{
    console.log('second promise')
    resolve()
  })
})
.then(()=>{
  console.log('second promise then')
})
.then(()=>{
  console.log('another first promise then')
})
console.log('end here')

/**
 * starr here
  first promise constructor
  end here
  first promise then
  second promise
  second promise then
  another first promise then
 */



/**
 * 有哪些宏任务：
 *   - setTimeout
 *   - setInterval
 *   - I/O
 *   - 事件
 *   - postMessage
 *   - setImmediate (Node.js ,浏览器端该API已废弃)
 *   - UI渲染
 * 有哪些微任务
 *   - Promise.then
 *   - MutationObserver 
 *   - process.nextTick (Node.js) 
 */

 /**
  * 当代码中存在宏任务和微任务时，谁的优先级更高，先执行谁呢？ 请看代码
  * 
  */
 // 
 console.log('start here')

 const foo = () => (new Promise((resolve,reject) => {
    console.log('first promise construtor')
    let promise1 = new Promise((resolve,reject)=>{
      console.log('second promise constructor')

      setTimeout(()=>{
        console.log('setTimeout here')
        resolve()
      },0)
      resolve('promise1')
    })
    resolve('promise0')
    promise1.then(arg =>{
      console.log(arg)
    })
 }))
 foo().then(arg=>{
   console.log(arg)
 })

 console.log('end here')

//  start here
//  first promise construtor
//  second promise constructor
//  end here
//  promise1
//  promise0
//  setTimeout here

/**
 * 首先输入同步内容: start here ,执行foo 函数,同步输出 first promise construtor
 * 继续执行foo函数, 遇见promise1,执行promise1构造函数,同步输出second promise construtor ,以及 end here
 * 同时按照顺序: setTimeout回调进入任务队列(宏任务),promise1的完成处理函数(promise1.then(...)),进入任务队列(微任务),
 * 第一个(匿名)promise 的完成处理函数(23行)进入任务队列(微任务)
 * 
 * 虽然setTimeout回调率先进入任务队列，但是优先执行微任务，按照微任务顺序，先输出 promise1 (promise1 结果),
 * 再输出 promise0 (第一个匿名promise 结果)
 * 
 * 由上分析得知，每次主线程执行栈为空的时候，引擎会优先处理微任务队列，处理完微任务队列里的所有任务，再去处理宏任务。
 */