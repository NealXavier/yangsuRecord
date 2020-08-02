// step9: then方法新增Promise异常处理
class CusPromise{
  static PENDING = 'pending'
  static FUFILLED = 'fufilled'
  static REJECTED = 'rejected'
  constructor(executor){
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
    // 解决1： 将 onRejcted 全部改成 reject(err)
    return new CusPromise((resolve,reject)=>{
      if(this.status === CusPromise.PENDING){
        this.callbacks.push({
          onFufilled:value=>{    
            try {
              let result = onFufilled(value)   
              resolve(result)
            } catch (error) {
              reject(err)
            }
          },
          onRejected:err=>{
            try {
              let result = onRejected(err)
              resolve(result)
            } catch (error) {
              reject(error)
            }
          }
        })
      }
      if(this.status === CusPromise.FUFILLED){
        setTimeout(() => {   
          try {
            let result = onFufilled(this.value)   
            resolve(result)                       
          } catch (error) {
            reject(error)       
          }
        }, 0);
      }
      if(this.status === CusPromise.REJECTED){
        setTimeout(() => {  
          try {
              let result = onRejected(this.value)
              resolve(result)
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
    })
  }
}

