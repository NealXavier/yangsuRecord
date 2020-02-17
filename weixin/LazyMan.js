// 实现一个 LazyMan，按照以下方式调用时，得到相关输出：

// LazyMan("Hank")
// Hi! This is Hank!
 
// LazyMan("Hank").sleep(10).eat("dinner")
// Hi! This is Hank!
// 等待10 秒..
// Wake up after 10
// Eat dinner~
 
// LazyMan("Hank").eat("dinner").eat("supper")
// Hi This is Hank!
// Eat dinner~
// Eat supper~
 
// LazyMan("Hank").sleepFirst(5).eat("supper")
// 等待 5 秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

/**
 * 考察知识：
 *  面向对象思想与设计，包括类的使用等
    对象方法链式调用的理解和设计
    小部分设计模式的设计
    因为存在“重复逻辑”，考察代码的解耦和抽象能力
    逻辑的清晰程度以及其他编程思维
 */
/**
 * 设计思路：
 *    1 - 用一个class来"装"这些方法
 *    2 - 为了保证链式调用，一定要在方法名后面 return this
 *    3 - next() ，taskArray 执行之前先保证所有的任务都进入一个全局数组里面
 *    4 - 
 */

// 常规思路
class LazyManGenerator {
  constructor(name) {
    this.taskArray = []

    // 初始化时任务
    const task = () => {
      console.log(`Hi! This is ${name}`)
      // 执行完初始化时任务后，继续执行下一个任务
      this.next()
    }

    // 将初始化任务放入任务队列中
    this.taskArray.push(task)

    setTimeout(() => {
      this.next()
    }, 0)
  }

  next() {
    // 取出下一个任务并执行
    const task = this.taskArray.shift()
    task && task()
  }

  sleep(time) {
    this.sleepTask(time, false)
    // return this 保持链式调用
    return this
  }

  sleepFirst(time) {
    this.sleepTask(time, true)
    return this
  }

  sleepTask(time, prior) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }

    if (prior) {
      this.taskArray.unshift(task) // 将 task 移动至队首
    } else {
      this.taskArray.push(task)
    }
  }

  eat(name) {
    const task = () => {
      console.log(`Eat ${name}`)
      this.next()
    }

    this.taskArray.push(task)
    return this
  }
}

function LazyMan(name) {
  return new LazyManGenerator(name)
}

LazyMan("Hank").sleepFirst(5).eat("supper")

// 简单分析一下：

// LazyMan 方法返回一个 LazyManGenerator 构造函数的实例
// 在 LazyManGenerator constructor 当中，我们维护了 taskArray 用来存储任务，同时将初始化任务放到 taskArray 当中
// 还是在 LazyManGenerator constructor 中，将任务的逐个执行即 next 调用放在 setTimeout 中，这样就能够保证在开始执行任务时，taskArray 数组已经填满了任务
// 我们来看看 next 方法，取出 taskArray 数组中的首项，进行执行
// eat 方法将 eat task 放到 taskArray 数组中，注意 eat task 方法需要调用 this.next() 显式调用“下一个任务”；同时返回 this，完成链式调用
// sleep 和 sleepFirst 都调用了 sleepTask，不同在于第二个参数：sleepTask 第二个参数表示是否优先执行，如果 prior 为 true，则使用 unshift 将任务插到 taskArray 开头