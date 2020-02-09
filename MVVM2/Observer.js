/**
 * 
 */
function defineReactive(data,key,val){
  observe(val) // 递归遍历所有子属性
  
  var dep = new Dep()

  Object.defineProperty(data,key,{
    enumerable:true,
    configurable:false,
    get:function(){
      return val
    },
    set:function(newVal){
      val = newVal
      console.log('属性'+ key + '已经被监听了,现在值为:'+newVal.toString())
      
      dep.notify() // 如果数据变化，通知所有订阅者
    }
  })  
}
Dep.target = null


function observe(data){
  if(!data || typeof data !== 'object'){}
  Object.keys(data).forEach(function(key){
    defineReactive(data,key,data[key])
  })
}

/**
 * 从代码上看，将订阅器Dep添加一个订阅者设计在getter里面。
 * 这是为了让Watcher初始化触发，因此需要判断是否要添加订阅者，
 * 至于具体设计方案，下文会详细说明的。在setter函数里面，如果数据变化，
 * 就会去通知所有订阅者，订阅者们就会去执行对应的更新的函数。到此为止，
 * 一个比较完整Obsever 已经实现。
 */

function Dep(){
  this.subs = []
}
Dep.prototype = {
  addSub:function(sub){
    this.subs.push(sub)
  },
  notify:function(){
    this.subs.forEach(function(sub){
      sub.update()
    })
  }
}


var library = {
  book :{
    name: ''
  },
  book2:''
}

observe(library)
library.book.name = 'vue权威指南' // 属性name已经被监听了，现在值为：“vue权威指南”
library.book2  // 属性book2已经被监听了
