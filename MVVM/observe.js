/**
 * 响应式框架基本原理
 *  - 收集视图依赖了哪些数据
 *  - 感知被依赖数据的变化
 *  - 数据变化时，自动"通知"了需要更新的视图，并进行更新
 */
/**
 * 也就是：
 *  - 依赖收集
 *  - 数据劫持/数据代理
 *  - 发布订阅模式
 */
// 数据劫持与代理，通过Object.defineProperty 实现。这个方法可以定义数据的 getter 和 setter 
// example 1 :
let data = {
  stage : 'zhihu',
  course : {
    title: '前端开发进阶',
    author: 'xavier',
    pulishTime: '2018年5月'
  }
}

Object.keys(data).forEach(key => {
  let currentValue = data[key]
  
  Object.defineProperty(data,key,{
    enumerable: true,
    configurable: false,
    get(){
      console.log(`getting ${key} value now, getting value is `,currentValue)
      return currentValue
    },
    set(newValue){
      currentValue = newValue
      console.log(`setting ${key} value now,setting value is `,currentValue)
    }
  })
})

data.course // getting course value now, getting value is {title: '前端开发进阶',author: 'xavier',pulishTime: '2018年5月'}

data.course = '前端进阶2' // getting course value now, getting value is 前端进阶2

data.course.title = '前端进阶2' // getting course value now, getting value is {title: '前端开发进阶',author: 'xavier',pulishTime: '2018年5月'}


/**
 * 出现这个问题的原因是因为我们的实现代码只进行了一层 Object.defineProperty ,或者说只对data 的第一层属性进行了Object.defineProperty 
 * 对于嵌套的引用类型数据结构：data.course, 我们同样应该进行拦截
 * */ 
// 为了达到深层次拦截，将 Object.defineProperty的逻辑抽象为 observer函数，该用递归实现
// example2 :
let data = {
  stage : 'zhihu',
  course : {
    title: '前端开发进阶',
    author: 'xavier',
    pulishTime: '2018年5月'
  }
}
const observe = data =>{
  if(!data || typeof data !== 'object'){
    return
  }
  Object.keys(data).forEach(key=>{
    let currentValue = data[key]
    observe(currentValue)

    Object.defineProperty(data,key,{
      enumerable:true,
      configurable:false,
      get(){
        console.log(`getting ${key} value now,getting value is :`,currentValue)
      },set(newValue){
        currentValue = newValue
        console.log(`setting ${key} value now,setting value is `,currentValue)
      }
    })
  })
}

/**
 * example3 : 添加数组变化
 */
let data = {
  stage: 'zhihu',
  course: {
    title : '前端开发进阶',
    author:['lucas','xavier'],
    publishTime:'2018年5月'
  }
}

const observe = data =>{
  if(!data || typeof data !== 'object'){
    return 
  }
  Object.keys(data).forEach(key=>{
    let currentValue = data[key]
    observe(currentValue)
    Object.defineProperty(data,key,{
      enumerable:true,
      configurable:false,
      get(){
        console.log(`getting ${key} value now,getting value is :`,currentValue)
        return currentValue
      },
      set(newValue){
        currentValue = newValue
        console.log(`setting ${key} value now, setting value is`,currentValue)
      }
    })
  })
}

observe(data)

data.course.author.push('curry')  // 

/**
 *  我们只监听到data.course 以及 data.course.author 的读取, 而数组 push 行为并没有被拦截。
 *  这是因为 Array.prototype上挂载的方法并不能触发 data.course.author 属性值的 setter ,由于
 *  这并不属于做赋值操作, 而是push API 调用操作。然而对于框架实现来说，这显然是不满足要求的，
 *  当数组变化时我们应该也有所感知。
 */

 // 实现逻辑如下：
 const arrExtend = Object.create(Array.prototype)
 const arrMethods = ['push','pop','shift','unshift','sort','reverse']
 arrMethods.forEach(method=>{
   const oldMethod = Array.prototype[method]
   const newMethod = function(...args){
     oldMethod.apply(this,args)
     console.log(`${method}方法被执行了`)
   }
   arrExtend[method] = newMethod
 })

 // 核心逻辑在于调用原生方法，oldMethod.apply(this,args),除此之外可以在调用oldMethod.apply(this,args)前后加入
 // 我们需要的任何逻辑。实例代码中加入一行 console.log 。使用时；
 Array.prototype = Object.assign(Array.prototype,arrExtend)
 
 
 // 再执行 
 data.course.author.push('curry') // push 方法被执行了

 // 以上已经基本符合需求了,注意在这里在使用Proxy进行代理时，并没有对getter 进行代理，因此上述代码的输出结果并没不像
 // 之前使用 Object.property那样也会有 getting value 输出

/**
 * example 4: 
 *  Object.defineProperty VS Proxy
 */
let data = {
  stage:'zhihu',
  course:{
    title:'前端开发进阶',
    author:['xavier'],
    publishTime:'2018年5月'
  }
}
const observe = data =>{
  if(!data || Object.prototype.toString.call(data) !== '[object Object]'){
    return
  }
  Object.keys(data).forEach(key =>{
    let currentValue = data[key]
    // 事实上，proxy 也可以对函数类型进行代理。这里只对承载数据类型的object 进行处理
    if(typeof currentValue === 'object'){
      observe(currentValue)
      data[key] = new Proxy(currentValue,{
        set(target,property,value,receiver){
          //因为数组的push会引起length属性的变化，所以push之后会触发两次 set 操作，我们只需要保留一次即可,property为length 时，忽略
          if(property !== 'length'){
            console.log(`setting ${key} value now,setting value is`,currentValue)
          }
          return Reflect.set(target,property,value,receiver)
        }
      })
    }else{
      Object.defineProperty(data,key,{
        enumerable:true,
        configurable:false,
        get(){
          console.log(`getting ${key} value now,getting value is:`,currentValue)
          return currentValue
        },
        set(newValue){
          currentValue = newValue
          console.log(`setting ${key} value now,setting value is`,currentValue)
        }
      })
    }
  })
}

// 注意这里在这里使用Proxy进行代理时，并没有对getter进行代理，
// 因此上述代码的输出结果并不像之前使用Object.defineProperty那样也会有getting value输出

 /**
  * 整体实现并不难理解，需要读者了解最基本的Proxy知识。简单总结一下：
  * 对于数据键值为基本类型的情况，我们使用Object.defineProperty;对于键值为对象类型的情况，
  * 继续递归调用 observe 方法，并通过 Proxy 返回的新对象对 data[key] 重新赋值，这个新值的getter和setter已经被添加了代理。
  * 
  * 了解了 Proxy 实现之后，我们对Proxy实现数据代理和 Object.defineProperty实现数据拦截进行对比，会发现：
  * - Object.defineProperty 不能监听数组的变化，需要进行数组方法的重写
  * - Object.defineProperty 必须遍历对象的每个属性，且对于嵌套结构需要深层遍历
  * - Proxy 的代理是针对整个对象的，而不是对象的某个属性，因此不同于Object.defineProperty 的必须遍历对象每个属性，
  *   Proxy只需要做一层代理就可以监听同级结构下的所有属性变化，当然对于深层结构，递归还是需要进行的
  * - Proxy 支持代理数组的变化
  * - Proxy 的第二个参数除了 set 和 get 以外，可以有13种拦截方法，比起 Object.defineProperty() 更加强大
  * - Proxy 性能将就底层持续优化，而 Object.defineProperty 已经不再是优化重点
  */

  /**
   * example 5: 模板编译原理介绍：
   */
  {{stage}}平台:{{course.title}}
  {{course.title}}是{{course.author}} 发布的课程
  发布时间为{{course.publishTime}}

  let vm = new Vue({
    el:'#apps',
    data : {
      stage:'zhihu',
      course:{
        title:'前端开发进阶',
        author:'xavier',
        publishTime:'2018年5月'
      }
    }
  })
/**
 *  其中 模板变量使用了 {{}} 的表达方式模板变量。最终输出的html内容应该被合适的数据进行填充替换，因此还需要一步编译过程，
 *  该过程任何框架或类库中都是想通的，比如React中的JSX，也是编译为 React.createElement，并在生成虚拟DOM时进行数据填充
 */
 

 /**
  * example 6; 编译模版实现
  */