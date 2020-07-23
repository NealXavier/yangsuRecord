class ParamError extends Error{
  constructor(msg){
    super(msg)
    this.name = 'ParamError' // 构造函数写法，我也不知道为啥
  }
}
class HttpError extends Error{
  constructor(msg){
    super(msg)
    this.name = 'HttpError' // 构造函数写法，我也不知道为啥
  }
}

function ajax(url){
  return new Promise((resolve,reject)=>{
    if(!/^http/.test(url)){
      throw new ParamError('url格式出现问题')
    }
    let xhr = new XMLHttpRequest()
    xhr.open('GET',url,true)
    xhr.send(null)
    xhr.onload = function(){
      if(this.status === 200){
        resolve(JSON.parse(this.response)) // 这里的this就是指代XMLHttpRequest对象
      }
      else if(this.status === 404){
        reject(new HttpError("获取不到用户")) 
        // throw new ParamError("url格式出现问题")  // 只能使用reject，不能使用throw是一个同步代码,
        // 而onload是一个异步方法,在异步的上下文里面,是无法捕获到的。
      }
    }
    xhr.onerror = function(){
      reject(new HttpError("程序异常"))
    }
  })
}