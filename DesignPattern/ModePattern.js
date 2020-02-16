/**
 * 
 * 单例模式：es6写法
 * 应用场景： 引用第三方库，全局唯一的对象或者状态管理或者全局唯一插件
 */
class Singleton{
  constructor(){
    if(!Singleton.instance){
      Singleton.instance = this
    }
    return Singleton.instance
  }
}

/**
 * 单例模式：closure 写法
 */
const getSingleInstance = (function(){
  // 在闭包环境下维护一个singleInstance这个变量
  var singleIntance
  return function(){
    if(singleIntance){
      return singleIntance 
    }
    return singleIntance = new Constructor()
  }
})()


/**
 * Builder 建造者模式
 * 精髓： 建造者的精髓在于“分步骤分情况构建一个复杂的对象”
 */
class Pizza {
  constructor(size, chesse = true, tomato = false, lettuce = false) {
  }
}

// 使用建造者模式
class Pizza {
  constructor(size) {
      this.size = size
  }
  addMushroom() {
      this.mushroom = true
      return this
  }
  addOliver() {
      this.oliver = true
      return this
  }
  addPoulet() {
      this.poulet = true
      return this
  }
  addChesse() {
      this.chesse = true
      return this
  }
  addTomato() {
      this.tomato = true
      return this
  }
  addLettuce() {
      this.lettuce = true
      return this
  }
  build() {
      return new Pizza(this)
  }
}

new Pizza(32)
    .addOliver()
    .addTomato()
    .build()


/**
 * 外观模式(和适配器模式相当):  
 *  对接口进行二次封装,隐藏其内部的复杂度。
 *  比如：跨浏览器兼容性的封装，
 *
 */
var addMyEvt = function(el,ev,fn){
  if(el.addEventListener){ // 存在DOM2级方法,则使用并传入事件类型、
                           // 事件处理程序函数和第3个参数false(表示冒泡阶段)
    el.addEventListener(ev,fn,false)
  }else if(el.attachEvent){
    el.attachEvent('on'+ev,fn) // 为兼容IE8以及更早的浏览器，注意时间必须加上“on”前缀
  }else{
    el['on' + ev] = fn  // 其他方法都无效，默认采用DOM0 级方法，使用方括号语法将属性名指定为事件处理程序
  }
}


