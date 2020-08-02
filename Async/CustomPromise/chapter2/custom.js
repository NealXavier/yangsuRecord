// step2:状态保护和异常捕获
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
    // 问题1，状态判断
    if(this.status === CusPromise.PENDING){
      this.value = value
      this.status = CusPromise.FUFILLED
    }
  }
  reject(reason){
    // 问题1，状态判断
    if(this.status === CusPromise.PENDING){
      this.status = CusPromise.REJECTED
      this.reason = reason
    }
  }
}
