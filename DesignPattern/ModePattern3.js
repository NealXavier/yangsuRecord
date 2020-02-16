/**
 * 责任链模式(需要重点学习)：
 *  一个请求从一端进入，并从一个职责根据需求，流转进入另一个对象，直到找到合适的处理程序
 * 
 * 解决场景：
 *    1. 解决 else if
 *    2. AOP 
 * // 使用注意事项：
 *    1 - 需要在链尾添加一个保底的接受者节点来处理这种即将离开的请求
 *  * 2 - 可能在某一次的请求传递过程中，大部分节点并没有起到实质性的作用，
 *        它们的作用仅仅是让in个球传递下去，从性能方面考虑，我们要避免过长的职责带来的性能损耗
 *
 * 
 */
/**
 * - orderType 表示订单类型（定金）。code = 1:500元定金用户;code = 2:200元定金用户; code = 3 普通用户
 * - pay  表示用户是否支付定金
 * - stock 表示用户普通用户购买的手机库存数量,已经支付过500元或者200元定金的用户不受此限制
 */
 // 菜鸟写法
var order = function(orderType,pay,stock){
  if(orderType === 1){
    if(pay === true){
      console.log('500元定金预约,得到100元优惠券')
    }else{
      // 可复用
      if(stock > 0){
        console.log('普通购买,无优惠券')
      }else{
        console.log('手机库存不足')
      }
    }
  }else if(orderType === 2){
    if(pay === true){
      console.log('200元定金预约,得到50元优惠券')
    }else{
      // 可复用
      if(stock > 0){
        console.log('普通购买,无优惠券')
      }else{
        console.log('手机库存不足')
      }
    }
  }
  // 保底 === else 
  else if(orderType === 3){
    // 可复用
    if(stock > 0){
      console.log('普通购买,无优惠券')
    }else{
      console.log('手机库存不足')
    }
  }
}


// 责任链重构代码
var order500 = function(orderType,pay,stock){
  if(orderType === 1 && pay === true){
      console.log('500元定金预约，得到100元优惠券')
  }else{
      return 'nextSuccessor' // 不知道下个节点是谁，反正把请求往后面传递
  }
}

var order200 = function(orderType,pay,stock){
  if(orderType === 2 && pay === true){
      console.log('200元定金预约,得到50元优惠券')
  }else{
      return 'nextSuccessor'
  }
}

var orderNormal = function(orderType,pay,stock){
  if(stock > 0 ){
     console.log('普通购买,无优惠券')
  }else{
      console.log('手机库存不足')
  }
}

var Chain = function(fn){
  this.fn = fn
  this.successor = null  // 原来可以不传参
}

Chain.prototype.setNextSuccessor = function(successor){
  return this.successor = successor
}
Chain.prototype.passRequest = function(){
  var ret = this.fn.apply(this,arguments)
  if(ret === 'nextSuccessor'){
      return this.successor && this.successor.passRequest(this.successor,arguments)
  }
  return ret  
}

var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1,true,500);



Function.prototype.after = function(fn){
 var self = this
 return function(){
     debugger
     var ret = self.apply(this,arguments)
     if(ret === 'nextSuccessor'){
         return fn.apply(this,arguments)
     }
     return ret
 }
}

var order = order500.after(order500).after(orderNormal)
order(1,true,500)