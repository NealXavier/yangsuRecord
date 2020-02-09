function SelfVue(options){
  // this.data = data
  var self =this
  this.vm = this
  this.data = options
  /**
   * 绑定代理属性
   */
  Object.defineProperty(data).forEach(function(key){
    self.proxyKeys(key) // 绑定代理属性
  })
  
  observe(data)
  // el.innerHTML = this.data[exp] // 初始化模板数据的值
  // new Watcher(this,exp,function(value){
  //   el.innerHTML = value
  // })
  new compile(options,this.vm)
  
  options.mounted.call(this) // 所有事情处理好后执行 mounted 函数
  // return this
}

SelfVue.prototype = {
  proxyKeys:function(key){
    var self = this
    Object.defineProperty(this,key,{
      enumerable:false,
      configurable:true,
      get:function proxyGetter(){
        return self.data[key]
      },
      set:function proxySetter(newVal){
        self.data[key] = newVal
      }
    })
  }
}
