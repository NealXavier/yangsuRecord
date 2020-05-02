    // Promise对象的原理：控制反转后的反转,把控制还给调用代码
    // 以下是伪代码：
    function foo(x){
      // 开始做点可能耗时的工作
      // 构造一个listener事件通知处理对象返回
      return listener
    }
    var evt = foo(42)
    evt.on("completion",()=>{
      // 可以进行下一步
    })
    evt.on("failure",err=>{// foo中出错了
    })


    /**
     * ====================================
     * Promise 状态凝固不可改变
     * ====================================
     */
    /**
     *  Promise有两种状态改变的方式,既可以从pending转变为fullfilled
     *  也可以从pending转变为rejected. 一旦状态改变,就凝固了,会一直
     *  保持这个状态,不会再发生变化。当状态发生改变,promise.then
     *  绑定的函数就会被调用.
     *  还有:Promise一旦新建就会立即执行,无法取消。这是缺点之一。
     * */
    var promise = new Promise((resolve,reject)=>{
      if(success()) resolve(data)
      else reject(err)
    })

    const sendRequest = function(url){
      return new Promise((resolve,reject)=>{
        const handler = ()=>{
          if(this.readyState !== 4) return ;
          if(this.status === 200) resolve(this.response)
          else reject(new Error(this.statusText))
        }
        const client = new XMLHttpRequest()
        client.open('GET',url)
        client.onreadystatechange = handler
        client.responseType = "json"
        client.setRequestHeader("Accept","application/json")
        client.send()
      })
    }

    /**
     * 相对比回调方式和Promise方式
     */
    request('test1.html', '', function(data1) {
      console.log('第一次请求成功, 这是返回的数据:', data1);
      request('test2.html', data1, function (data2) {
            console.log('第二次请求成功, 这是返回的数据:', data2);
            request('test3.html', data2, function (data3) {
                console.log('第三次请求成功, 这是返回的数据:', data3);
                //request... 继续请求
              }, function(error3) {
              console.log('第三次请求失败, 这是失败信息:', error3);
            });
          }, function(error2) {
          console.log('第二次请求失败, 这是失败信息:', error2);
        });
      }, function(error1) {
      console.log('第一次请求失败, 这是失败信息:', error1);
    });

    /**
     * 而如果是Promise的方式则会好看很多
     */
    sendRequest('test1.html', '').then(function(data1) {
      console.log('第一次请求成功, 这是返回的数据:', data1);
      return sendRequest('test2.html', data1);
    }).then(function(data2) {
      console.log('第二次请求成功, 这是返回的数据:', data2);
      return sendRequest('test3.html', data2);
    }).then(function(data3) {
      console.log('第三次请求成功, 这是返回的数据:', data3);
    }).catch(function(error) {
      //用catch捕捉前面的错误
      console.log('sorry, 请求失败了, 这是失败信息:', error);
    });

    /**
     * 一旦新建就会立即执行
     */
    var promise = new Promise((resolve,reject)=>{
      console.log('before resolve')
      resolve()
      console.log('after resolve')
    })

    promise.then(()=>{
      // 这个回调是在promise对象从pending变成resolve的瞬间执行的
      console.log('resolved')
    })

    console.log('outer')

    /**
     * output:
     * before resolved
      after resolved
      outer
      resolved
     */


    
    /**
     * catch() 使用
     * 但是Promise会吃掉抛错,
     * 这也是因为Promise对象状态已经改变就不会变化的坏处
     */
    var promise = new Promise((resolve,reject)=>{
      resolve()
      throw 'error'
    })
    promise.catch(e=>console.log(e)) // 不会被调用


    /**
     * 还有一点,如果没有使用catch方法指定处理错误的回调函数,
     * Promise对象抛出的错误不会传递到外层代码,即不会有任何反应
     * 例如下面一段代码,只有chrome会报错, safari和firefox都不会 
     */
    let promise = new Promise((resolve,reject)=>{
      resolve(x)
    })
    promise.then((data)=>console.log(data))


    /**
     * all() 的使用方法:
     * 接收p1,p2,p3,当他们都变成fullfilled的时候,P的状态才会变成
     * fullfilled,并将三个promise返回的结果。按照参数的顺序,
     * (并不是resolved返回的时间来看存入数组)
     */
    var p1 = new Promise((resolve,reject)=>{
      setTimeout(resolve,1000,"first")
    })
    var p2 = new Promise((resolve,reject)=>{
      setTimeout(resolve,2000,"second")
    })
    var p3 = new Promise((resolve,reject)=>{
      resolve('third')
    })

    Promise.all([
      p1,p2,p3
    ]).then((result)=>{
      console.log(result)
    })
    // ['first','second','third']
    // 而不是 ['third','first','second']

    /**
     * 并且这个是同时开始,并行执行,而不是顺序执行.
     */
    const promisefy = (delay)=>{
      return new Promise((resolve)=>{
        setTimeout(()=>{resolve(delay)},delay)
      })
    }
    var startDate = Date.now()
    Promise.all([
      promisefy(32),
      promisefy(64),
      promisefy(128)
    ]).then((res)=>{
      console.log(Date.now() - startDate)
    })
    /**
     * outpue:133ms,而不是各个promise加起来的值
     */


    /**
     * 总结：
     * 1.reject和catch区别
     * promise.then(onFullfilled,onRejected)
     * 在onFullfilled中异常的话,在onRejected中是捕获不到这个异常的
     * promise.then(onFullfilled).catch(onRejected)
     * .then中产生的异常能在.catch中捕获
     * 
     * 2.
     */
