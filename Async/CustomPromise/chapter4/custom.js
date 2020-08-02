// step4:then方法异常捕获和异步输出
class CusPromise{
  static PENDING = 'pending'
  static FUFILLED = 'fufilled'
  static REJECTED = 'rejected'
  constructor(executor){
    this.status = CusPromise.PENDING
    this.value = null
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
    }
  }
  reject(value){
    if(this.status === CusPromise.PENDING){
      this.status = CusPromise.REJECTED
      this.value = value
    }
  }
  then(onFufilled,onRejected){
    if(typeof onFufilled !== "function"){
      onFufilled = function(){}
    }
    if(typeof onRejected !== "function"){
      onRejected = function(){}
    }
    if(this.status === CusPromise.FUFILLED){
      setTimeout(() => {    // 解决2：使用setTimeout 建立宏任务，（这里有个细节注意，setTimeout需要放到tryCatch之外，不然报错不能在准确的行数）
        try {
          onFufilled(this.value)  // 解决1：使用try..catch 在onRejctd那里统一捕获
        } catch (error) {
          onRejected(error)
        }
      }, 0);
    }
    if(this.status === CusPromise.REJECTED){
      setTimeout(() => {  // 解决2：使用setTimeout 建立宏任务，
        try {
            onRejected(this.value)  // 解决1：使用try..catch 在onRejctd那里统一捕获
        } catch (error) {
          onRejected(error)
        }
      }, 0);
    }
  }
}
