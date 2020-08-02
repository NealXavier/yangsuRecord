// step3:then方法基础构建
class CusPromise{
  static PENDING = 'pending'
  static FUFILLED = 'fufilled'
  static REJECTED = 'rejected'
  constructor(executor){
    this.status = CusPromise.PENDING
    this.value = null
    try {
      // 问题2: 进行异常捕获
      executor(this.resolve.bind(this),this.reject.bind(this))
    } catch (error) {
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
    // 解决2：判断如果onFufilled、onRejected 不为函数，则人为创建一个函数
    if(typeof onFufilled !== "function"){
      onFufilled = function(){}
    }
    if(typeof onRejected !== "function"){
      onRejected = function(){}
    }

    // 解决1：增加状态判断,确认状态完成了再执行相应方法
    if(this.status === CusPromise.FUFILLED){
      onFufilled(this.value)
    }
    // 解决1：增加状态判断,确认状态完成了再执行相应方法
    if(this.status === CusPromise.REJECTED){
      onRejected(this.value)
    }
  }
}
