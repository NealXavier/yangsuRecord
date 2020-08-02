// step1:声明Promise并绑定this
class CusPromise{
  // 定义状态
  static PENDING = 'pending'
  static FUFILLED = 'fufilled'
  static REJECTED = 'rejected'
  constructor(executor){
    // 1、定义状态 2、定义值
    this.status = CusPromise.PENDING
    this.value = null
    // 需要在 resolve和 reject 调用手工绑定 CusPromise 对象
    executor(this.resolve.bind(this),this.reject.bind(this))
  }
  resolve(value){
    // console.log("this: ",this); // 1. undefined, 这里是严格意义上的window对象
    this.status = CusPromise.FUFILLED
    this.value = value
  }
  reject(reason){
    this.status = CusPromise.REJECTED
    this.reason = reason
  }
}
