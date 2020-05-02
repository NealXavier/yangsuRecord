##　JavaScript 类型及其判断

JavaScript 具有七种内置数据类型，它们分别是：

- null
- undefined
- boolean
- number
- string
- object （function , array , date）
- symbol

前面五种为基本类型，

对于这些类型的判断，我们常用的方法有：

- typeof 

```javascript
typeof undefined // "undefined"
typeof true // boolean

```

但是也有例外，

```javascript
typeof null		// object
```

来看下typeof对复杂类型时的判断表现

```javascript
const foo = () =>1
typeof foo // "function"

const foo = {}
typeof foo // "object"

const foo = []
typeof foo // "object"

const foo = new Date()
typeof foo // "object"

const foo = Symbol("foo")
typeof foo // "symbol"
```

conclusion:  **使用typeof可以准确判断出除 null 以外的基本类型，以及function类型，symbol类型；null 会被typeof 判断为object。**

- instanceof

**使用a instanceof B 判断的事：a是否为B的实例，即a的原型链上是否存在B构造函数**。因此如果我们使用：

```javascript
function Person(name){
    this.name = name
}
const p = new Person("lucas") // true
p instanceof Person	// true
```

这里p是Person构造出来的实例。同时，顺着p的原型链，也能找到Object构造函数：

```javascript
p.__proto__.__proto__ === Object.prototype 
```

```javascript
因此：

p instanceof Object	// true
```

另外另一个细节需要注意：

```javascript
5 instanceof Number	// false
new Number(5) instanceof Number // true
```

我们使用以下代码来模拟instanceof 原理：

```javascript
const instanceofMoock = (L,R)=>{
    if(typeof L !== 'object'){
        return false
    }
    while(true){
        if(L === null){
            // 已经遍历到最顶端
            return false
        }
        if(R.prototype === L.___proto__){
            return true
        }
        L = L.__proto__
    }
}
```



**使用constructor和Object.prototype.toString判断类型**

该方法是判断类型的万能方法，

```javascript
Object.prototype.toString.call(1)	// [object Number]
Object.prototype.toString.call('lucas') // [object String]
Object.prototype.toString.call(undefined)// [object Undefined]
Object.prototype.toString.call(true) // object Boolean
Object.prototype.toString.call({})  // object Object
Object.prototype.toString.call(function(){})// object Function
Object.prototype.toString.call(null) // object Null
Object.prototype.toString.call(Symbol('lucas'))// object Symbol
```



**JavaScript类型及其转换**

JavaScript是一种弱类型或者说动态语言。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。

```javascript
1 + '1' // 11
1 + true // 2
1 + false // 1
1 + undefined // NaN
'lucas' + true 	// lucastrue
```

**JavaScript 函数参数传递**

```javascript

```

**cannot read property of undefined 问题解决方案**

这里我们分析一个常见的JavaScript细节：cannot read property of undefined 是一个常见的错误，如果意外的得到一个空对象或者空值，这样恼人的问题在所难免。

考虑这样的一个数据结构：

```javascript
const obj = {
    users:[
        {
            title:'Foo',
            comments:['Good one!','Intersting..']
        },
        {
            title:'Bar',
            comments:['Ok']
        },
        {
            title:'Baz',
            comments:[]
        }
    ]
}
```

方案一：&& 短路运算符进行可访问嗅探

```javascript
obj.user &&
obj.user.posts &&
obj.user.posts[0] &&
obj.user.posts[0].comments
```

方案二： || 单元设置默认保底值

```javascript
(((obj.user || {}).posts||{})[0]||{}).comments
```

方案三：

```javascript
try{
    result = obj.user.posts[0].comments
}catch{result = null}
```

方案四：

```javascript
// 当然，我们可以自己编写代码判断
const get = (p,o) => p.reduce((xs,x) =>(xs && xs[x])?xs[x]:null,o)
// 有关于reduce的用法如下:
// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
console.log(get(['user','posts',0,'comments'],obj))
// 'Good one!','Intersting..'
console.log(get(['user','post',0,'comments'],obj)) // null
```

我们实现的方法中，接收两个参数，第一个参数表示获取值的路径(path)；另外一个参数表示目标对象。我们可以curry 化方法：

```javascript
const get = p => o=> p.reduce((xs,x)=>(xs && xs[x])?xs[x]:null,o)
const getUserComments = get(['user','posts',0,'comments'])
console.log(getUserComments(obj)) // ['Good one!','Intersting...']
console.log(getUserComments({user:{posts[]}}))
```

**TC39中有一个新的提案， obj?.user?.posts[0]?.comments**



**分析一道网红题目**

```javascript
a == 1 && a == 2 && a == 3 可能为true吗？
```

理性分析不可能，因此解题思路也需要从变量a的类型及（对象）转换（基本类型）上来考虑。

方案一：

```javascript
const a = {
    value : 1,
    toString: function(){
        return a.value++
    }
}
```

方案二：

```javascript
let value = 0
Object.defineProperty(window,'a',{
    get:function(){
        return ++value
    }
})
```

这里我们将a作为属性，挂载在window对象当中，重写其getter方法。

当然，以上两种方法并不唯一。