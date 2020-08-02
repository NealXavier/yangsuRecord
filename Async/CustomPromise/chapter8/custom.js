// step8: 实现Promise链式操作
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
    // 解决1: 将then 的结果变成 一个Promise
    return new CusPromise((resolve,reject)=>{
      if(this.status === CusPromise.PENDING){
        this.callbacks.push({
          onFufilled:value=>{    
            try {
              let result = onFufilled(value)    // 解决4：给PENDING状态的Promise对象也接收结果，并且返回resolve状态的Promise
              resolve(result)
            } catch (error) {
              onRejected(err)
            }
          },
          onRejected:err=>{
            try {
              let result = onRejected(err)
              resolve(result)
            } catch (error) {
              onRejected(error)
            }
          }
        })
      }
      if(this.status === CusPromise.FUFILLED){
        setTimeout(() => {   
          try {
            let result = onFufilled(this.value)   // 解决2：将回调函数的结果给一个result接收， 返回一个“解决”的Promise
            resolve(result)                       
          } catch (error) {
            onRejected(error)
          }
        }, 0);
      }
      if(this.status === CusPromise.REJECTED){
        setTimeout(() => {  
          try {
              let result = onRejected(this.value)  // 解决3：给onReject也加上返回"解决"状态的Promise
              resolve(result)
          } catch (error) {
            onRejected(error)
          }
        }, 0);
      }
    })
  }
}

