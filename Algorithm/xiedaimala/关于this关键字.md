---
    title:this关键字
---

## this的指向
在 ES5 中，其实 this 的指向，始终坚持一个原理：this 永远指向最后调用它的那个对象
eg1:
```
        var name = "windowsName";
        function a() {
        var name = "Cherry";

        console.log(this.name);          // windowsName

        console.log("inner:" + this);    // inner: Window
    }
        a();
        console.log("outer:" + this)         // outer: Window
```

注意，这里我们没有使用严格模式，如果使用严格模式的话，全局对象就是 undefined，那么就会报错 Uncaught TypeError: Cannot read property 'name' of undefined。

eg2:
```
        var name = "windowsName";
        var a = {
        name: "Cherry",
        fn : function () {
            console.log(this.name);      // Cherry
        }
        }
        a.fn();
```

eg3:
```
    var name = "windowsName";
    var a = {
        name: "Cherry",
        fn : function () {
            console.log(this.name);      // Cherry
        }
    }
    window.a.fn();
```
虽然最后调用的a对象,所以指向的是a

eg4:
```
    var name = "windowsName";
    var a = {
        // name: "Cherry",
        fn : function () {
            console.log(this.name);      // undefined
        }
    }
    window.a.fn();
```
最后调用的是a对象,但是在a范围之内没有定义name,所以是undefined


接下来是比较坑的例子
eg5:
```
    var name = "windowsName";
    var a = {
        name : null,
        // name: "Cherry",
        fn : function () {
            console.log(this.name);      // windowsName
        }
    }

    var f = a.fn;
    f();
```
f=a.fn只是将function传给了f,真正调用的还是window,所以这里指向的是window

## 



