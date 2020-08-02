// step11: then方法返回Promise的处理
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
            try {
              let result = onFufilled(value)
              if(result instanceof CusPromise){
                result.then(resolve,reject) // 解决1: 如果是Promise对象,可以重复调用CusPromise对象的then方法，这里是递归的意思。
              }else{
                resolve(result)
              }
            } catch (error) {
              reject(err)
            }
          },
          onRejected:err=>{
            try {
              let result = onRejected(err)
              if(result instanceof CusPromise){
                result.then(resolve,reject) // 解决1:如果是Promise对象,可以重复调用CusPromise对象的then方法,这里是递归的意思。
              }else{
                resolve(result)
              }
            } catch (error) {
              reject(error)
            }
          }
        })
      }
      if(this.status === CusPromise.FUFILLED){
        setTimeout(() => {
          try {
            let result = onFufilled(this.value) // 最终总会得到result是普通对象的时候
            if(result instanceof CusPromise){
              result.then(resolve,reject) // 解决1:如果是Promise对象,可以重复调用CusPromise对象的then方法，这里是递归的意思。
            }else{
              resolve(result)
            }                         
          } catch (error) {
            reject(error)       
          }
        }, 0)
      }
      if(this.status === CusPromise.REJECTED){
        setTimeout(() => {
          try {
            let result = onRejected(this.value)
            if(result instanceof CusPromise){
              result.then(resolve,reject)
            }else{
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
    })
  }
}