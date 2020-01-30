/**构造函数本质：
 * 1. 使用Object.create 将obj 的__proto__ 指向为构造函数的原型
 * 2. 使用apply 方法 ,将构造函数内的 this 指向为 obj
 * 3. 在 newFunc 返回时，使用三目运算符决定返回结果
 */
function Person(name){this.name = name}

function newFunc(...args){
  const constructor = args.shift()
  // console.log('constructor:'+constructor)
  const obj = Object.create(constructor.prototype)
  debugger
  const result = constructor.apply(obj,args)
  return (typeof result === 'object' && result !=null)?result:obj
}

var p = new newFunc(Person,'lucas')


/**
 * 如何优雅的继承
 * 原型链实现继承最关键的要点是：
 *  Child.prototype = new Parent()
 *   
 */
function inherit(Child,Parent){
  // 继承原型上的属性
  Child.prototype = Object.create(Parent.prototype)
  // 修复 constructor
  Child.prototype.constructor = Child
  // 存储超类
  Child.super = Parent
  // 静态属性继承
  if(Object.setPropertyOf){
    // setPropertyOf es6
    Object.setPrototypeOf(Child,Parent)
  }else if(Child.__proto__){
    // __proto__ es6 引入, 但是部分浏览器早已支持
    Child.__proto__ = Parent
  }else{
    // 兼容IE10 等陈旧浏览器
    // 将Parent 上的静态属性和方法拷贝一份到Child上，不会覆盖Child上的方法
    Child.__proto__ = Parent

    for(var k in Parent){
      if(Parent.hasOwnProperty(k) && !(k in Child)){
        Child[k] = Parent[k]
      }
    }
  }
}
/**
 * 上述静态属性存在一个问题： 在陈旧浏览器中，属性和方法的继承我们是静态拷贝的，继承完后续父类的改动不会自动同步到子类。这是不同于
 * 正常面向对象思想的。 但是这种组合式继承，已经相对完美。
 */

