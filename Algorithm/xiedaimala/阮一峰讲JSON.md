---
    title: 阮一峰讲JSON
---

## 1、JSON出现的目的
取代XML格式繁琐笨重的一种数据交换的文本格式

## 2、JSON语法特点
"参考"javasctipt 的语法,只是对某些数据类型做了一些改造

## 3、JSON语法格式
- 复合类型只能是 **数组或对象**,不能是函数,正则表达式对象,日期对象

- 原始类型的值只有4种：**字符串、数组(必须以十进制表示)、布尔值和 null** (不能使用NaN,Infinity,-Infinity和undefined)

- 字符串必须是 **双引号**,不能是单引号

- 对象的 **键名**必须放在 **双引号**里面

- 数组或对象最后一个成员的后面,不能加逗号

## 4、合法的JSON实例和不合法的JSON实例
合法的:
```
    ["one","two","threee"]
    {"one":1,"two":2,"three":3}
    {"name":["张三","李四"]}
    [{"name":"张三"},{"name":"李四"}]

```
不合法的:
```
    {name:"张三",age:24}  // 属性必须使用双引号
    [32,64,128,0xFFF]   // 不能使用十六进制值
    {"name":"张三","age":undefined}  // 不能使用undefined
    {"name":"张三",
    "birthday":new Date(),
    "getName":function(){
            return this.name; 
        }
    }  // 属性值不能使用函数和日期对象
```

## JSON 常见的两个方法
### stringify()
将一个值转化成JSON字符串,请注意是JSON字符串,所以还和一般的字符串还有一些不同
- 把字符串从单引号变双引号
```
    JSON.stringify('false') // "\"false\""
```
不仅仅用双引号将'false'用双引号包裹起来,还把false的单引号转成双引号

- 自动过滤掉不属于JSON数据类型
假如说对象的属性是 undefined,函数或XML对象就会被过滤
```
    var obj = {
        a : underfined,
        b : function(){}
    };
    JSON.stringify(obj) // "{}"
```
因为underfined和function都会被自动过滤掉,所以只剩下"{}"

假如是数组成员出现undefined,函数或XML对象,就会被转换为null,
比如：
```
    var arr = [undefined,function(){}];
    JSON.stringify(arr);  // "[null,null]"

```
其他加参的方法同样大同小异就不细说

### parse()
```
    JSON.parse('{}') // {}
    JSON.parse('true') // true
    JSON.parse('"foo"') // "foo"

```

如果传入的字符串不是有效的JSON格式呢?
```
    JSON.parse("'string'"); // 
    // SyntaxError: Unexpected token ILLEGAL
```
因为双引号字符串里面包含单引号这是不符合JSON字符串规定的

##  说说自己学习JSON时候吃力的地方
Q1:JSON和Javascript之间有什么关系吗？
A1:没什么关系,JSON只是参考了JS表现数据类型的一些方法,也正因为如此,让我在学习的过程中总是把JSON当作JS的一个子集去学习,其实JSON是可以单拎出来的一个知识,只不过因为外形上长的像JS数据类型而已。还有，JSON真的不是对象。那具体有哪些不像请参考 [JSON语法格式]

Q2:JSON是一种文本格式应该怎么理解？
A2: 格式,可以理解成字面上的语法。