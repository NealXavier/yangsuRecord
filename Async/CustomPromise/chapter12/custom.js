// step12: 优化then方法冗余优化
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
      onFufilled = ()=>this.value    
    }
    if(typeof onRejected !== "function"){
      onRejected = ()=>{throw new Error(this.value)} 
    }
    return new CusPromise((resolve,reject)=>{
      if(this.status === CusPromise.PENDING){
        this.callbacks.push({
          onFufilled:value=>{
            this.parse(onFufilled(value),resolve,reject)
          },
          onRejected:err=>{
            this.parse(onRejected(err),resolve,reject)
          }
        })
      }
      if(this.status === CusPromise.FUFILLED){
        setTimeout(() => {
          this.parse(onFufilled(this.value),resolve,reject)
        }, 0)
      }
      if(this.status === CusPromise.REJECTED){
        setTimeout(() => {
          this.parse(onRejected(this.value),resolve,reject)
        }, 0)
      }
    })
  }
  parse(result,resolve,reject){
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