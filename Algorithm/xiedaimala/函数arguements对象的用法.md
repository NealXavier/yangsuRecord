---
    title:函数arguements对象的用法
---

## 1、用法
只能在函数体内使用
```
    function f(){
        console.log(arguments[0]);
        console.log(arguments[1]);
        console.log(arguments[2]);
    }
```
## 2、使用场景
假如说有以下情况,定义了两个同名函数
```
    // 一个参数 one
    function operation(one){
        var sum = a;
        //打印sum
    }
    // 两个参数 one two
    function operation(one,two){
        var sum = one + two;
        // 打印sum
    }

    add(1)     // NaN
    add(1,2)   // 3
```
结果显而易见,后者会把前者覆盖。
**那么假设针对不同的参数个数需要有不同的处理方式应该怎么做呢？**
如果有argument对象就好很多了
```
    function operation(){
        // 对有一个参数的平方积
        if(arguments.length===1){
            // 用乘法
            console.log(arguments[0]*arguments[0]);
        }else if{
            // 对有两个参数的用加法
            console.log(arguments[0]+arguments[1]);
        }
    }
```
于是,通过控制arguments参数来让javascript实现函数重载的效果

