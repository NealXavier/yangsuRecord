// step14: 手写Promise.resolve和reject静态方法
class CusPromise{
  static PENDING = 'pending'
  static FUFILLED = 'fufilled'
  static REJECTED = 'rejected'
  static resolve(value){
    return new CusPromise((resolve,reject)=>{
      if(value instanceof CusPromise){
        value.then(resolve,reject)
      }else{
        resolve(value)
      }
    })
  }
  static reject(value){
    return new CusPromise((resolve,reject)=>{
      reject(value) 
    })
  }
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
      onFufilled = ()=>this.value    
    }
    if(typeof onRejected !== "function"){
      onRejected = ()=>{throw new Error(this.value)} 
    }
    let promise = new CusPromise((resolve,reject)=>{
      if(this.status === CusPromise.PENDING){
        this.callbacks.push({
          onFufilled:value=>{
            this.parse(promise,onFufilled(value),resolve,reject)
          },
          onRejected:err=>{
            this.parse(promise,onRejected(err),resolve,reject)
          }
        })
      }
      if(this.status === CusPromise.FUFILLED){
        setTimeout(() => {
          this.parse(promise,onFufilled(this.value),resolve,reject)
        }, 0)
      }
      if(this.status === CusPromise.REJECTED){
        setTimeout(() => {
          this.parse(promise,onRejected(this.value),resolve,reject)
        }, 0)
      }
    })
    return promise
  }
  // 解决1： 将返回的promise作为参数，和result进行比较，看是否相同
  parse(promise,result,resolve,reject){
    if(promise === result){ 
      throw new TypeError('禁止套娃')
    }
    try {
      if(result instanceof CusPromise){
        result.then(resolve,reject)
      }else{
        resolve(result)
      }
    } catch (error) {
      reject(err)
    }
  }
}