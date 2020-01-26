// 异步题目2： 红灯3s亮一次，绿灯1s亮一次，黄灯2s亮一次；如何让三个灯不断交替重复亮灯

function red(){
  console.log('red')
}

function green(){
  console.log('green')
}

function yellow(){
  console.log('yellow')
}

// 回调方案
const task = (timer,light,callback) => {
  setTimeout(() =>{
    if(light === 'red'){
      red()
    }else if(light === 'green'){
      green()
    }else if(light === 'yellow'){
      yellow()
    }
    callback()
  },timer)
}


// 但是这个只能完成红绿黄灯交替一次，那么需要递归来表示亮灯周期
task(3000,'red',()=>{
  task(1000,'green',()=>{
    task(2000,'yellow',Function.prototype)
  })
})

const step = ()=>{
  task(3000,'red',()=>{
    task(1000,'green',()=>{
      task(2000,'yellow',step)
    })
  })
} 


// 用promise 实现
const task = (timer,light) =>
  new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(light === 'red'){
        red()
      }else if(light === 'green'){
        green()
      }else if(light === 'yellow'){
        yellow()
      }
      resolve()
    },timer)
  })

const step = ()=> {
  task(3000,'red')
   .then(()=> task(1000,'green')) // 这个then里面的回调函数取决与 resolve有没有参数,如果有那就有参数
   .then(()=> task(2000,'yellow'))
   .then(step) // 循环调用 
}

step()

/**
 * 1. timer 计时器 , 
 * 2. task 方法返回值是一个Promise对象, resolve方法代表继续执行的内容
 * 3. Promise.prototype.then回调函数内的参数是和 resolve的参数对应的
 * 4. step 代表循环调用  
 */

/**
 * 如果使用aysnc/await调用;
 */

 const taskRunner = async ()=>{
   await task(3000,'red')
   await task(1000,'green')
   await task(2000,'yellow')
   taskRunner()
 }

 // 显然async/await 调用方法更加简洁
 taskRunner()
