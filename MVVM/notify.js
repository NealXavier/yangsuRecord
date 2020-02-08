/**
 * example 8:
 *  简易发布/订阅模式，
 */
class Notify{
  constructor(){
    this.subscribers = []
  }
  add(handler){
    this.subscribers.push(handler)
  }
  emit(){
    this.subscribers.forEach(subscriber=>subscriber())
  }
}

// 使用：
let notify = new Notify()
notify.add(()=>{
  console.log('emit here')
})

notify.emit() // emit here
