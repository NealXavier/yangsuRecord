/**
 * 有关 async/await 的基础内容
 * 
 * 1. async 声明的函数, 其返回值必定是promise 对象, 如果没有显式返回promise 对象, 也会用 Promise.resolve() 对结果进行包装,
 *    保证返回值为 promise 类型
 * 2. await 会先执行其右侧表达逻辑(从右向左执行),并让出主线程,跳出async 函数,而去继续执行async函数外的同步代码
 * 
 * 3. 如果await 右侧白鸥大事逻辑是个promise ,让出主线程，继续执行 async 函数外的同步代码, 等待同步任务结束后, 且该promise 被resolve 时,
 *          继续await 后面的逻辑
 * 4. 如果await 右侧表达式逻辑不是 promise 类型,那么依然异步处理, 将其理解包装为 promise, async函数之外的同步代码执行完毕之后,会回到async
 *    函数内部, 继续执行 await 之后的逻辑。
 */
async function async1(){
  console.log('async1 start') // step4: 直接打印同步代码
  await async2()              // step5: 遇见await ,首先执行其右侧逻辑, 并在这里中断 async1 函数
  console.log('async1 end')   // step11: 再次回到async1 函数, await 中断之后，打印代码 async1 end
}

async function async2(){      
  console.log('async2')       // step6： 直接打印同步代码 async2,并返回一个 resolve 值为 undefined的 promise
}

console.log('script start')   // step1: 直接打印同步代码 script start

setTimeout(function(){    
  console.log('setTimeout')   // step13: 开始执行宏任务,输出setTimeout
},0)

async1()                      // step3: 执行 async1

// step7: 执行async1 中断, 继续执行到这里
new Promise(function(resolve){   
  console.log('promise1') // step8: 打印同步 promise1 resolve
  resolve()
}).then(function(){       // step9: 将then 逻辑放到微任务当中
  console.log('promise2') // step12: 开始执行微任务, 输出 promise2
})

console.log('script end')   // step10: 打印同步代码 script end ,并回到async1 函数中继续执行

/**
   * script start
    async1 start
    async2
    promise1
    script end
    promise2
    async1 end
    setTimeout
 */