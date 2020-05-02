// javascript  移动页面元素
/**
 * 要求： 从原点出发, 左移动20px, then 上移动 50px,then 左移动30px
 */
/**
 * @param direction 方向 ,left or top
 * @param distance 距离
 * @param callback 回调
 */
const target = document.querySelectorAll('#man')[0]
// 将选中的元素变成指定定位
target.style.cssText = `
  position: absolute;
  left:0px;
  top:0px;
`
const walk = (direction,distance,callback) => {
  setTimeout(()=>{
    let currentLeft = parseInt(target.style.left,10) // 取整
    let currentTop = parseInt(target.style.top,10) // 取整
    
    const shouldFinish = (direction === 'left' && currentLeft === -distance) || (direction === 'top' && currentTop === -distance)

    if(shouldFinish){
      // 任务执行结束,执行下一个回调
      callback && callback()
    }else{
      if(direction === 'left'){
        currentLeft -- 
        target.style.left = `${currentLeft}px`
      }else if(direction === 'top'){
        currentTop --
        target.style.top = `${currentTop}px`
      }
      walk(direction,distance,callback)
    }
  },20)
}


walk('left',20,()=>{
  walk('top',50,()=>{
    walk('left',30,Function.prototype)
  })
})


// 将上列问题采用Promise解决问题
const target = document.querySelectorAll('#s_btn_wr')[0]
target.style.cssText = `
  position: absolute;
  left:0px;
  top:0px;
`
const walk = (direction,distance) => 
  new Promise((resolve,reject)=>{
    const innerWalk = () => {
      setTimeout(() =>{
        let currentLeft = parseInt(target.style.left,10)
        let currentTop = parseInt(target.style.top,10)

        const shouldFinish = (direction === 'left' && currentLeft === -distance) || 
                              (direction === 'top' && currentTop === -distance)
        if(shouldFinish){
          // 任务执行结束
          resolve()
        }else{
          if(direction === 'left'){
            currentLeft -- 
            target.style.left = `${currentLeft}px`
          }else if(direction === 'top'){
            currentTop -- 
            target.style.top = `${currentTop}px`
          }
          innerWalk()
        }
      },20)
    }
    innerWalk()
  })

walk('left',20)
.then(()=>walk('top',50))
.then(()=>walk('left',30))


/**
 * aysnc/await 方案
 */
const target = document.querySelectorAll('#s_btn_wr')[0]
target.style.cssText = `
  position: absolute;
  left:0px;
  top:0px;
`

const walk = (direction,distance) =>{
  new Promise((resolve,reject)=>{
    const innerWalk = () =>{
      setTimeout(()=>{
        let currentLeft = parseInt(target.style.left,10)
        let currentTop = parseInt(target.style.top,10)

        const shouldFinish = (direction === 'left' && currentLeft === -distance) ||
                              (direction === 'top' && currentTop === -distance)

        if(shouldFinish){
          // 任务执行结束
          resolve()
        }else{
          if(direction === 'left'){
            currentLeft -- 
            target.style.left = `${currentLeft}px`
          }else if(direction === 'top'){
            currentTop -- 
            target.style.top = `${currentTop}px`
          }
          innerWalk()
        }
      },20)
    }
    innerWalk()
  })
}

const task = async function(){
  await walk('left',20)
  await walk('top',50)
  await walk('left',30)
}

// 只需要直接执行 task() 即可


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



 // 请求图片预加载
 // 假设预先有urlIds数组, 数组的每一项都可以按照规则拼接成一个完整的图片地址。根据这个数组，依次请求图片的方法
 const loadImg = urlId =>{
   const url = `https://www.image.com/${urlId}`
   return new Promise((resolve,reject)=>{
     const img = new Image()
     // 图片成功加载时进行resolve,失败时reject
     img.onerror = function(){
       reject(urlId)
     }
     img.onload = function(){
       resolve(urlId)
     }
     img.src = url
   })
 }

// 依次请求图片
const urlIds = [1,2,3,4,5]
urlIds.reduce((prevPromise,urlId)=>{
  return prevPromise.then(()=> loadImg(urlId))
},Promise.resolve())

// 也可以用async/await实现
const loadImgOneByOne = async()=>{
  for(i of urlIds){
    await loadImg(i)
  }
}
loadImgOneByOne()


// 如果想要提高效率，一次性发出，该如何做呢？
const urlIds = [1,2,3,4,5]
const promiseArray = urlIds.map(urlId => loadImg(urlId))

Promise.all(promiseArray)
.then(()=>{
  console.log('finish load all')
})
.catch(()=>{
  console.log('promise all catch')
})

// further: 我们希望控制最大并发数为3，最多3个请求一起发出，剩下2个一起发出，这就需要我们实现一个loadByLimit方法,
// 实现可以考虑使用 Promise.race API
const loadByLimit = (urlIds,loadImg,limit) =>{
  const urlIdsCopy = [...urlIds]
  if(urlIdsCopy.length <=limit){
    // 如果数组长度小于并发数,直接全部请求
    const promiseArray = urlIds.map(urlId =>loadImg(urlId))
    return Promise.all(promiseArray)
  }
  // 注意splice方法会改变urlIdsCopy数组
  const promiseArray = urlIdsCopy.splice(0,limit).map(urlId => loadImg(urlId))

  urlIdsCopy.reduce((prevPromise,urlId)=>{
    prevPromise
    .then(()=> Promise.race(promiseArray))
    .catch(error => {console.log(error)})
    .then(resolvedId=>{
      // 将resolvedId剔除出promiseArray数组
      let resolvedIdPosition = promiseArray.findIndex(id => resolvedId === id)
      promiseArray.splice(resolvedIdPosition,1)
      promiseArray.push(loadImg(urlId))
    })
  } ,Promise.resolve())
  .then(()=>Promise.all(promiseArray))
}