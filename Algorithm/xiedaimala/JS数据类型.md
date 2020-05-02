---
    title: JS数据类型
---
 
## undefined和null的区别
**null** 是一个表示"空"的对象,转为数值时为 0;
**undefined** 是一个表示"此处无定义"的原始值,转为数值为NaN

## 布尔类型
转换规则除了下面6个值被转为 false ,其他值都视为 true
- undefined
- null
- false
- 0 
- NaN
- ""或 ''

## 数值类型
NaN 表示 "非数字",主要出现在将字符串解析成数字出错的场合。
```
    5 - 'x'  // NaN
```
另外,一些数学函数的运算结果会出现 NaN
```
    Math.acos(2); // NaN
    Math.log(-1); // NaN
    Math.sqrt(-1); // NaN
    0/0 ;          // NaN

```
NaN 不是一种数据类型,它的数据类型依然属于 Number
typeof NaN   // 'number'

NaN 不等于任何值,包括它本身
NaN === NaN  // false

## 对象类型
最重要的数据类型

- 键名

对象上所有的键名都是字符串


- 对象引用
如果不同变量名指向同一个对象,那么它们都是这个对象的引用,也就是说指向同一个内存地址。修改其中一个变量,会影响到其他所有变量
```
    var o1 = {};
    var o2 = o1;

    o1.a = 1;
    o2.a  // 1

    o2.b = 2;
    o1.b  // 2
```
**但是,如果取消某一变量对于原对象的引用,不会影响到另外一个变量**

比如说:
```
    var o1 = {};
    var o2 = o1;

    o1 = 1;
    o2  // {}
```

但是这种引用只局限于对象,如果两个变量指向同一个原始类型的值。那么,变量这时都是值的拷贝

比如说:
```
    var x = 1;
    var y = x;

    x = 2;
    y // 1
```

- 取值

请注意,如果使用方括号运算符,键名必须放在引号里面,否则会被当作变量处理
```
    var foo = 'bar';
    var obj = {
        foo : 1,
        bar : 2
    };
    obj.foo // 1
    obj[foo]  // 2        foo => "bar" => 2
```

- 属性赋值
```
    var obj = {};
    obj.foo = 'hello';
    obj['bar'] = 'world';
```

- 属性的查看
查看一个对象所有属性,可以使用 Object.keys 方法
```
    var obj  = {
        key1 : 1,
        key2 : 2
    };

    Object.keys(obj);  // ['key1','key2']

```

- 属性的删除:delete 命令

delete 用于删除对象的属性,删除成功后返回true

```
    var obj = {p:1};
    Object.keys(obj);  // ["p"]

    delete obj.p       // true
    obj.p              // undefined
    Object.keys(obj)   // []
```

PS: 删除一个不存在的属性, delete 不报错,而且返回 true

- 属性是否存在: in 运算符

in 运算符用于检查对象是否包含某个属性(注意：检查的是键名,不是键值)

```
    var obj = {p:1};
    'p' in obj; // true
    'toString' in obj // true
```
**in** 不能识别哪些属性是对象的,哪些属性是继承的

这时可以使用对象的 hasOwnProperty 方法判断一下,是否位对象自身的属性

```
    var obj =  {};
    if('toString' in obj){
        console.log(obj.hasOwnProperty('toString')) // false
    }
```

- 遍历: for.. in 循环
```
    var obj = {a:1,b:2,c:3};

    for(var i in obj) {
         // 键名
         // 键值
    }
    PS: 
    - 遍历出来的对象可遍历(enumerable)的属性,会跳过不可遍历的属性(？？可遍历对象？？))
    - 不仅遍历对象自身的属性,还遍历继承的属性
    因此应该在遍历的过程中加入:hasOwnProperty方法
    for(var key in obj){
        if(obj.hasOwnProperty(key)) {
            console.log(key) ; // 得到自身的属性(不包含继承的属性)
        }
    }
```

- with 语句
```
    var obj  = {
        p1 : 1 ,
        p2 : 2
    }
    with(obj){
        p1 = 4,
        p2 = 5
    }
    obj.p1   // 4 
    obj.p2   // 5


```
好处:在对象赋值上避免了反复写 obj.p1 ,obj,p2,...
坏处:(1)with(obj){...}  只能给obj 已经赋值过的属性赋值(例如p1,p2)
(2) 当with(obj){console.log(x)} 由于无法判断x是obj的属性还是全局变量。所以排错和模块化的时候很麻烦。建议不要使用


## 数组
1、关于length属性
(1)** 该属性是一个动态的值，等于键名中的最大整数加上1 ** 
```
    var arr = ['a','b'];
    arr.length  = 2;
    
    arr[2] = 'c'
    arr.length  // 3

    arr[9] = 'd';
    arr.length // 10

    arr[3] ... arr[8]  // 都是undefined
```
(2)length属性是可写。如果人为设置一个小于当前成员个数的值，该数组的成员
会自动减少到length设置的值
```
    var arr = ['a','b','c'];
    arr.length  // 3
    arr.length = 2;
    arr // ['a','b']

    // 也可以通过
    arr.length = 0 ; //数组清空

    // 设置不合法的值时,会报错
    [].length = -1 // 负值、RangeError
    [].length = Math.pow(2,32);  // >=2的32次方
    [].length = 'abc'; // 设置字符串、RangeError

```
(3)数组本质是对象,所以可以为数组添加属性,但是不影响length属性
```
    var a = [];
    a['p'] = 'abc';
    a.length = 0;

    a[2.1] = 'abc';
    a.length // 0

    上面代码将数组的key设置为字符串和小数,结果都不影响。因为,length属性的值就是等于最大的数字键+1,而这个数组没有整数键,所以length属性保持为0
```

ps：如果键名超过范围的数值,该键名为自动转为字符串
```
    var arr = [];
    arr[-1] = 'a';
    arr[Math.pow(2,32)] = 'b';

    arr.length // 0
    arr[-1]    // "a"
    arr[4294967296]  // 'b'
```

(4) 数组空位不影响length属性
```
    var a = [1,,3];
    a.length    // 3
    a[1];  // 1  空位是可以读取的
    如果是最后面有逗号,并不会产生空位
    var a = [1,2,3,];
    a.length   // 3
```
ps:使用delete 命令删除了数组,这个位置就形成了空位,但是并不影响length属性。也就是说,length属性不过滤空位。所以length属性进行数组遍历一定要非常小心







## 关于Js的灵异事件
```
    typeof null    // object
    typeof function   // function   本来没有function这种数据类型
```

