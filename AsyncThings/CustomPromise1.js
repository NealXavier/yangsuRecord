// 回调模式
wx.request({
  url: 'test.php',
  data:{
    x:'',
    y:''
  },
  header:{
    'content-type':'application/json' // 默认值
  },
  sucess(res){
    console.log(res.data)
  }
})

// promisify 
const wxRequest = (url,data = {},method = 'GET') => 
  new Promise((resolve,reject)=>{
    wx.request({
      url,
      data,
      method,
      header:{
        // 通用化 header 设置
      },
      success: function(res){
        const code = res.statusCode
        if(code !== 200){
          reject({erro:'request fail',code})
          return 
        }
        resolve(res.data)
      },
      fail:function(res){
        reject({error:'request fail'})
      }
    })
  })


  /**
   * conclusion 1:
   *   Promise 构造函数返回一个 promise 对象实例,这个返回的 promise 对象具有一个 then 方法。
   *   then 方法中，调用者可以定义两个参数，分别是onfulfilled 和 onrejected ，它们都是函数类型。
   *   其中 onfulfilled 通过参数，可以获取promise对象 resolved的值，onrejected获得 promise对象 rejected的值。 
   *   通过这个值，我们来处理异步完成后的逻辑。 
   */
  function Promise(executor){

  }
  Promise.prototype.then = function(onfulfilled,onrejected){

  }

  /**
   * conclusion 2:
        我们在使用new 关键字调用Promise 构造函数时, 在合适的时机(往往在异步结束时)，调用executor的参数 resolve 方法,
        并将 resolved 的值作为 resolve 函数参数执行，这个值便可以后续在 then 方法第一个函数参数(onfulfilled)中拿到;
        同理，在出现错误时，调用executor的参数reject 方法，并将错误信息作为reject函数参数执行，这个错误信息可以在后续的then
        方法第二个函数参数(onreject)中拿到。

        因此,在实现Promise 时, 应该有两个值，分别存储resolved 的值， 以及 reject的值(当然,因为Promise 状态的唯一性,不可能同时出现
        resolved 的值和reject的值，因此也可以用一个变量来存储)；同时也需要存在一个状态，这个状态就是promise实例的状态
        (pending,fulfilled,rejected)；同时还要提供resolve 方法以及reject方法，这两个方法需要作为executor的参数提供给开发者使用；
   */

  function Promise(executor){
    this.status = 'pending'
    this.value = value
    this.reason = reason

    const resolve = value =>{
      this.value = value
    }
    const reject = reason =>{
      this.reason = reason
    }
    executor(resolve,reject)
  }

  Promise.prototype.then = function(onfulfilled = Function.prototype,onrejected = Function.prototype){
    onfulfilled(this.value)
    onrejected(this.reason)
  }

  /**
   * conclusion 3:
   *   promise 实例状态只能从pending改变为fulfilled ,或者从 pending改变为rejected。
   *   状态一旦变更完毕,就不可再改变或者逆转。也就是说，如果一旦变到fullfilled,就不能再rejected。
   *   一旦变到rejected,就不能fulfilled
   */
  function Promise(executor){
    this.status = 'pending'
    this.value = null
    this.reason = null
    
    const resolve = value =>{
      if(this.status === 'pending'){
        this.value = value
        this.status = 'fullfilled'
      }
    }

    const reject = reason =>{
      if(this.status === 'pending'){
        this.reason = reason
        this.reason = reason
      }
    }

    executor(resolve,reject)
  }

  Promise.prototype.then = function(onfulfilled,onrejected){
    onfulfilled = typeof onfulfilled === 'function'?onfulfilled:data => data
    onrejected = typeof onrejected === 'function'?onrejected:error =>{throw error}
  }



  /**
   * conclusion 4: 异步完善
   *    let promsie = new Promie((resolve,reject)=>{
   *        setTimeout(()=>{
   *            resolve('data')
   *        },2000)
   *    })
   *    当上述代码实例化一个promise 的构造函数时，我们是在setTimeout逻辑里面才调用 resolve，也就是说，2s之后，
   *    才会调用resolve 方法, 也才会去更改 promise实例状态。而结合我们的实现，返回实现代码,then方法中的onfulfilled
   *    执行是同步的，它在执行时候 this.status 仍然是 pending（为什么还是pending参考之前宏任务和微任务，setTimeout和
   *    then之间会先执行then），并没有做到2s之后再执行 onfulfilled。
   *    
   *    因此，需要在【合适】的时间采取调用onfulfilled方法，这个合适的时间应该是开发者调用 resolve 的时刻。那么我们先在
   *    状态(status) 为pending 时，把开发者传进来的onfulfilled 方法村进来，在 resolve 方法中再去执行即可。
   */
  function Promise(executor){
    this.status = 'pending'
    this.value = null
    this.reason = null
    this.onFulfilledFunc = Function.prototype
    this.onrejectedFunc = Function.prototype

    const resolve = value =>{
      if(this.status === 'pending'){
        this.value = value
        this.status = 'fulfilled'
        this.onFulfilledFunc(this.value)
      }
    }
    
    const reject = reason =>{
      if(this.status === 'pending'){
        this.reason = reason
        this.status = 'rejected'
        this.onRejectedFunc(this.reason)
      }
    }
    executor(resolve,reject)
  }

  Promise.prototype.then = function(onfulfilled,onrejected){
    onfulfilled = typeof onfulfilled === 'function'?onfulfilled:data =>data
    onrejected = typeof onrejected === 'function'?onrejected:error=>{throw error}

    if(this.status === 'fulfilled'){
      onfulfilled(this.value)
    }
    if(this.status === 'rejected'){
      onrejected(this.reason)
    }
    if(this.status === 'pending'){
      this.onFulfilledFunc = onfulfilled
      this.onRejectedFunc = onrejected
    }
  }

  /**
   * let promise = new Promise((resolve,reject)=>{
   *    resolve('data')
   * })
   * promise.then(data=>{
   *    console.log(data)
   * })
   * console.log(1)
   * 
   * 如果按照顺序，输出1再输出data。
   * 但是目前的代码会输出data再输出1.
   * 
   * conclusion 5:
   *    需要将resolve和reject的执行，放到任务队列中。这里先将此放到setTimeout里，
   *    保证异步执行（这样的做法并不严谨，为了保证Promise属于microtasks，很多Promise的实现库用了MutationObserver来模仿nextTick）
   * 
   *  
   */
  function Promise(executor){
    this.status = 'pending'
    this.value = null
    this.reason = null
    this.onFulfilledFunc = Function.prototype
    this.onRejectedFunc = Function.prototype

    const resolve = value =>{
      if(value instanceof Promise){
        return value.then(resolve,reject)
      }
      setTimeout(()=>{
        if(this.status === 'pending'){
          this.value = value
          this.status = 'fulfilled'
          this.onFulfilledFunc(this.value)
        }
      })
    }   
    const reject = reason =>{
      setTimeout(()=>{
        if(this.status === 'pending'){
          this.reason = reason
          this.status = status
          this.onRejectedFunc(this.reason)
        }
      })
    }
    executor(resolve,reject)
  }
  
  Promise.prototype.then = function(onfulfilled,onrejected){
    onfulfilled = typeof onfulfilled === 'function'?onfulfilled:data =>data
    onrejected = typeof onrejected === 'function'?onrejected:error=>{throw error}
    if(this.status === 'fulfilled'){
      onfulfilled(this.value)
    }
    if(this.status === 'rejected'){
      onrejected(this.reason)
    }
    if(this.status === 'pending'){
      this.onFulfilledFunc = onfulfilled
      this.onRejectedFunc = onrejected
    }
  }


  /**
   * 比如：当我们在promise 实例状态变更之前，添加多个then 方法:
   *  let promise = new Promise((resolve,reject)=>{
   *    setTimeout(()=>{
   *      resolve('data') 
   *    },2000)
   *  })
   *  promise.then(data=>{
   *      console.log(`1:${data}`)
   *  })
   *  promise.then(data=>{
   *    console.log(`2:${data}`) 
   * })
   * 应该输出： 1:data 2:data
   * 实际只会输出 2: data,这是因为第二个then方法中的onFulfilledFunc会覆盖第一个then方法中的onFulfilledFunc。
   * 
   * conclusion 6: 异步完善
   *    只需要将所有then方法中的onFulfilledFunc存储为一个数组onFulfilledArray,在resolve时，依次执行即可。
   *    对于onRejectedFunc同理，改动后的实现为：  
   */
  function Promise(executor){
    this.status = 'pending'
    this.value = value
    this.onFulfilledArray = []
    this.onRejectedArray = []

    const resolve = value =>{
      if(value instanceof Promise){
        return value.then(resolve,reject)
      }
      setTimeout(()=>{
        if(this.status === 'pending'){
          this.value =value
          this.status = 'fulfilled'
          this.onFulfilledArray .forEach(func =>{
            func(value)
          })
        }
      })
    }
    const reject = reason =>{
      setTimeout(()=>{
        if(this.status === 'pending'){
          this.reason = reason
          this.status = 'rejected'
          this.onRejectedArray.forEach(func=>{
            func(reason)
          })
        }
      })
    }
    executor(resolve,reject)
  }

  Promise.prototype.then = function(onfulfilled,onrejected){
    onfulfilled = typeof onfulfilled === 'function'?onfulfilled:data=>data
    onrejected = typeof onrejected === 'function'?onrejected:error =>{throw error}

    if(this.status === 'fulfilled'){
      onfulfilled(this.value)
    }
    if(this.status === 'rejected'){
      onrejected(this.reason)
    }
    if(this.status === 'pending'){
      this.onFulfilledArray.push(onfulfilled)
      this.onRejectedArray.push(onrejected)
    }
    // 另外一个细节，在构造函数中如果出错，将会自动触发promise 实例状态为rejected,我们用 try..catch 块对 executor进行包裹
    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }

  /**
   * conclusion : 
   *  - Promise 状态具有凝固性，也就是说，如果一旦变到fullfilled,就不能再rejected。一旦变到rejected,就不能fulfilled
   *  - Promise 错误处理 （实例化错误处理）
   *  - Promise 实例添加多个then处理（数组处理）
   */