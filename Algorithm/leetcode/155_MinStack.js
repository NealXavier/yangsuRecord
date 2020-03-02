// 获得最小栈
// 本质上就是一个栈正常存储, 一个栈存最小值,将每次遍历的最小的栈的值压到栈顶

var MinStack = function(){
  this.st = []  // 普通栈
  this.min_st = []  // 最小栈
}
MinStack.prototype.top = function(){
  return this.st.length !==0 && this.st[this.st.length - 1]
}
MinStack.prototype.pop = function(){
  var top = this.st.length !==0 && this.st.pop()
  if(top === this.min_st[this.min_st.length - 1]) this.min_st.pop()
}
MinStack.prototype.getMin = function(){
  return this.min_st[this.min_st.length - 1]
}
MinStack.prototype.push = function(x){
  this.st.push(x)
  if(this.min_st.length === 0 || x <= this.st[this.st.length - 1]) this.min_st.push(x)
}

