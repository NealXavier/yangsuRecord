// step7: PENDING异步处理技巧
class CusPromise{
  static PENDING = 'pending'
  static FUFILLED = 'fufilled'
  static REJECTED = 'rejected'
  constructor(executor){
    debugger
    this.status = CusPromise.PENDING
    this.value = null
    this.callbacks = []
    try {
      executor(this.resolve.bind(this),this.reject.bind(this))
    } catch(error) {
      this.reject(error)
    }
  }
  resolve(value){
    if(this.status === CusPromise.PENDING){
      this.value = value
      this.status = CusPromise.FUFILLED 
      // 解决1： 给resolve 和 reject 加 定时器
      setTimeout(() => {
        this.callbacks.map(callback=>{
          callback.onFufilled(this.value)
        })
      }, 0);
    }
  }
  reject(value){
    if(this.status === CusPromise.PENDING){
      this.status = CusPromise.REJECTED
      this.value = value
      // 解决1: 给resolve和reject加定时器
      setTimeout(() => {
        this.callbacks.map(callback=>{
          callback.onRejected(this.value)
        })
      }, 0);
    }
  }
  then(onFufilled,onRejected){
    if(typeof onFufilled !== "function"){
      onFufilled = function(){}
    }
    if(typeof onRejected !== "function"){
      onRejected = function(){}
    }
    if(this.status === CusPromise.PENDING){
      this.callbacks.push({
        onFufilled:value=>{    
          try {
            onFufilled(value)
          } catch (error) {
            onRejected(err)
          }
        },
        onRejected:err=>{
          try {
            onRejected(err)
          } catch (error) {
            onRejected(error)
          }
        }
      })
    }

    if(this.status === CusPromise.FUFILLED){
      setTimeout(() => {   
        try {
          onFufilled(this.value)  
        } catch (error) {
          onRejected(error)
        }
      }, 0);
    }
    if(this.status === CusPromise.REJECTED){
      setTimeout(() => {  
        try {
            onRejected(this.value) 
        } catch (error) {
          onRejected(error)
        }
      }, 0);
    }
  }
}

