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
 urlIdsCopy.reduce((prevPromise,urlId)=>
   prevPromise
   .then(()=>Promise.race(promiseArray))
   .catch(error => {console.log(error)})
   .then(resolvedId =>{
     // 将resolvedId剔除出promiseArray数组
     let resolvedIdPosition = promiseArray.findIndex(id => resolvedId === id)
     promiseArray.splice(resolvedIdPosition,1)
     promiseArray.push(loadImg(urlId))
   })
 , Promise.resolve())
 .then(()=>Promise.all(promiseArray))
}
