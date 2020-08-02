// step6: Promise的pending状态下的异常捕获
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
      this.callbacks.map(callback=>{
        callback.onFufilled(this.value)
      })
    }
  }
  reject(value){
    if(this.status === CusPromise.PENDING){
      this.status = CusPromise.REJECTED
      this.value = value
      this.callbacks.map(callback=>{
        callback.onRejected(this.value)
      })
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
        onFufilled:value=>{     // 解决1: 分别给onFufilled 和 onReject 加上try..catch捕获
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

