## HTML5和CSS3其他面试问题整理

- link 和 @import的区别
- css3 新增选择符有哪些
- css如何定义权重规则
- 如何使用纯css创建一个三角形
- css3 如何写出一个旋转的立方体
- localStorage 和 cookies 的区别是什么
- 如何实现浏览器内多个标签页之间的通信
- 渐进增强和优雅降级概念区别是什么
- 如何实现css3动画

## css变量和主题切换优雅实现

css变量或者css自定义属性一直依赖是一个值得关注的方向。

### 什么是css变量

```css
// 实例
body {
    background: white;
    color: #555;
}
a, a:link {
    color: #639A67;
}

a:hover {
    color: #205D67;
}

// 如果我们借助css变量，定义：
:root {
    --bg: white;
    --text-color: #555;
    --link-color: #639A67;
    --link-hover: #205D67;
}

body {
    background: var(--bg);
    color: var(--text-color);
}

a, a:link {
	color: var(--link-color);
}

a:hover {
    color: var(--link-hover);
}

```



面试题：

```
如何维护大型项目的 z-index
```

```css
This is a test
对应的样式表为：
.test {
    color: red;
}
再经过编译构建之后，对应的html和css分别为：
This is a test
._style_test_309571057 {
    color: red;
}
通过命名规范的唯一性，达到了避免样式冲突的目的。
但是这样如何实现样式复用？因为生成了全局唯一的class名，那么如何实现样式复用呢？
从原理上看，全局唯一的class是在构建过程中，如果能给在构建过程进行标识，表示该class将被复用，就可以解决问题。依靠composes关键字实现。
样式表 style.css 文件中：
.common {
    color: red;
}
.test {
    composes: common;
    font-size: 18px;
}
```

