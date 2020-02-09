/**
 * 监听器Obsever是在get函数执行了添加订阅者Watcher的操作的，
 * 所以我们只要在订阅者Watcher初始化的时候触发对应的get函数
 * 去执行添加订阅者操作即可。那要如何触发get函数，只要获取对应
 * 的属性值就可以触发了，核心原因就在于我们使用了
 * Object.defineProperty进行数据监听。这里还有一个细节点需要
 * 处理，我们只要在订阅者Watcher 初始化的时候才需要订阅者，所以
 * 需要做一个判断操作，因此可以在订阅器上做一个手脚：在Dep.target
 * 上缓存下订阅者，添加成功后再将其去掉就可以了。
 * 订阅者实现如下：
 */
function Watcher(wm,exp,cb){
  this.cb = cb
  this.vm = vm
  this.exp = exp
  this.value = this.get() // 将自己添加到订阅器的操作
}

Watcher.prototype = {
  update: function(){
    var value = this.vm.data(this.exp)
    var oldVal = this.value
    if(value !== oldVal){
      this.value = value
      this.cb.call(this.vm,value,oldVal)
    }
  },
  get:function(){
    Dep.target = this // 缓存自己
    var value = this.vm.data[this.exp] // 强制执行obsever的get函数
    Dep.target = null // 释放自己
    return value
  }
}

