// step5 : Promise Peeding 状态处理
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
      // 解决1: 在resolve执行时执行
      this.value = value
      this.status = CusPromise.FUFILLED
      this.callbacks.map(callback=>{
        callback.onFufilled(this.value)
      })
    }
  }
  reject(value){
    // 解决1： 在reject执行时执行
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
    // 解决1: 给Promise状态为PENDING状态时的,把onFufilled和onReject保存起来
    if(this.status === CusPromise.PENDING){
      // console.log("走这里了");
      // debugger
      this.callbacks.push({
        onFufilled,
        onRejected
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
