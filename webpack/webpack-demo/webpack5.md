JS模块化

```javascript
COMMONjs // 后端
一个文件为一个模块
通过 module.exports 暴露模块接口
通过 require 引入模块
同步执行
const eventEmitter = require('events').EventEmitter
const mixin = require('merge-descritors')
const ptoto = require('./application')

exports = module.exports = createApplication;


AMD(Async Module Definition)/CMD/UMD // 前端模仿后端
使用define 定义模块 ，
使用require加载模块,
RequireJS 
依赖前置，提前执行
define(["a","b","c"],function(a,b,c){
    // 等于在最前面申明并初始化了最要用到的所有模块
    if(false){
        // 即便压根儿没用到某个模块b，但b还是提前执行了。
        b.foo()
    }
})



CMD (Common Module Definition)
一个文件为一个模块
使用define 定义模块 ，
使用require加载模块,
SeaJS
尽可能的懒执行

// 所有模块都通过 define 来定义
define(function(require,exports,module){
    // 通过 require 引入依赖
    var $ = require('jquery')
    var Spinning = require('./spinning')
    
    // 通过 exports 对外提供接口
    exports.doSomething = ...
    
    // 或者通过 module.exports 提供整个接口
    module.exports = ...
})

UMD(Universal Module Definition)
通用解决方案
三个步骤
	判断是否支持AMD
    判断是否支持CommonJS
    如果都没有 使用全局变量
(function(root,factory){
     if(typeof define === 'function' && define.amd){
		 // AMD. Register as an anoymous module
         define([],factory)
     }else if(typeof exports === 'object'){
         // Node. Does not work with strict CommonJS,but
         // only CommonJS-like environments that support 
         // module.exports, like node
     }else{
         // Browser globals (root is window)
         root.returnExport = factory();
     }
})(this,function(){
        // just return a value to define the module export
        // this example returns an object,but the module
        // can return a function as the exported value
        return {}
    })


ES6 MODULE(ESM) // es6 javascript
import theDefault,{name1,named2} from 'src/myklib';
// 上面一句等于下面两句
import theDefault from 'src/myLib';
import {named1,named2} from 'src/mylib';
    
// Renaming : import named1 as myNamed1
// 重命名，方便自己使用
import {named1 as myNamed1,named2 } from 'src/lib'
    
// Importing the module as an object
// 可以用 myLib 调用所有暴露出来的方法
import * as myLib from 'src/myLib'
    
// 只加载模块，不使用方法
import 'src/myLib';
    

```

## 01.Webpack 简介

### Webpack 概述

静态模块打包器。

在Webpack 看来，前端的所有资源文件（js/json/css/img/less/...）都会作为模块处理。它根据模块的依赖关系进行静态分析，打包生成对应的静态资源（bundle）。

```
我的理解：
**入口文件：打包起点，**

打包原理：以入口文件作为起点，当中引入各个模块(import xxx )形成trunk（代码块），再根据文件不同（例如.less->.css，es6Js->浏览器能看懂的js），打包成功之后输出文件是bundle。
```



## 02 Webpack五个核心概念：

### Entry

### Output

### Loader

翻译官，

### Plugins

更复杂的功能由Plugins完成，

### Mode





### Webpack 的功能进化







### code split 代码分割

```javascript
配置方式：
module.exports = {
    // 单入口
    optimization:{
        splitChunks : {
            chunks:'all'
        }
    }
}
弹幕：传统MVC项目用不上，现在单页面开发都cli工具生成，深度集成webpack,也不需要自己配置。基本上用不太到。
```



### 懒加载

懒加载的前提是代码分割。



webpack 性能优化

1. 开发环境性能优化

1.1 优化带包构建速度

- HMR

```
css - style-loader
js - 
html xx
```

1.2 优化代码调试

- source-map：一种提供源代码到构建后代映射技术（如果构建后代吗出错了，通过映射可以追踪源代码错误）

```
有很多配置，
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

其中分为开发环境和生产环境
```



2. 生产环境性能优化

2.1 优化打包构建速度

* oneOf
* babel缓存（针对js）

- 多进程打包

- dll 

打包第三方库，但是要引用时再用plugin插件

- external

和dll差别不大，主要是引用时用的是cdn。

2.2 优化代码运行的性能

- 缓存（has-chunkhas-contentnhash）：强制缓存的同时，改动之后还不影响到未改动的。（面试题）

chunkhash用于js，

contenthash用于css

- tree-shaking（树摇）

去掉引用库上面没有用到的东西

**使用production、esModule。**

使用sideEffect可以避免被删。

- code split

单入口：

```
optimization
```



多入口：

```

```



- 懒加载/预加载

懒加载：触发动作才加载

预加载：其他资源加载完才偷偷加载，但是兼容性不好

- PWA

 帮助离线情况也可以访问，

- 





我的问题：

什么叫单入口，多入口。





## 生产环境模式

### 目的

能让代码优化上线运行的环境

css转js会让js变得很大，创建style标签会出现闪屏

代码压缩

兼容性问题

所以需要变快（压缩），平稳运行（兼容）



