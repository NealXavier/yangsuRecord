Q1:arguments 是什么?

```
类数组对象，除了length属性和索引元素之外没有任何Array属性,并且是除了非箭头函数都可以用的局部变量。
```

Q2：arguments怎么转化为数组

```javascript
var args = Array.prototype.slice.call(arguments)
var args = [].slice.call(arguments)
consst args = Array.from(arguments)
const args = [...arguments]
```

Q3：关于arguments小试验

```javascript
console.log(typeof arguments)
function test(a){
    console.log(a,Object.prototype.toString.call(arguments))
    console.log(arguments[0],arguments[1])
    console.log(typeof arguments[0])
}
test(1)
/**
 * 1 "[object Arguments]"
 * 1 undefined
 * number
 */
```

Q4：关于arguments 和 ...arguments的不同用法

```
本质上没啥区别，都可以捕获到函数调用的所有参数，但是...arguments通常会和[...arguments]这样用。
所以和call,apply的搭配如下。
apply接收方式是:fn.apply(this,[...arguments]) // 接收数组，也可以是类数组对象
fn.apply(this,arguments)
call接收方式是:fn.call(this,arguments) // 接收arguments对象
```



