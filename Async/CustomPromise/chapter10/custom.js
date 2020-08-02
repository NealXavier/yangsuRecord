// step10: then的穿透传递
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
      // onFufilled = function(){}     // 解决1： 这是因为不提供onFufilled 只好自定义函数,没有返回值，所以默认返回undefined
      onFufilled = ()=>this.value      // 返回this.value就行
    }
    if(typeof onRejected !== "function"){   
      // onRejected = ()=>this.value     // 对于失败的结果, 我们应该抛出 throw this.value 而不是直接 返回 this.value
      onRejected = ()=>{throw new Error(this.value)} 
    }
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