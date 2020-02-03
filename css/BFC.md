

##  解释一下BFC是什么？

​	  关于BFC是什么？mdn 这样解释的：

```
块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
```

说的很简单，但是没有参考意义，直到我读到了Lucas HC 的《》，他在里面是这么描述BFC的：

```
BFC 是Block Formatting Context 的简写，翻译为 块级格式上下文。它会创建一个特殊的区域，在这个区域中，只有block box 参与布局。而BFC的一套特点和规则就规定了在这个特殊的区域中如何尽心布局，如何进行定位，区域内元素的相互关系和相互作用。这个特殊的区域不受外界影响。

上面提到了block box 的概念，block box 是指 display属性为 block、list-item、table 的元素。

相应地，我们有inline block ，它是指 display 属性为inline,inline,inline-table 的元素。css3 规范中又加入了 run in box。
```

## 如何形成BFC

- 根元素或其他包含它的元素
- 浮动元素（元素的float不是none）
- 绝对定位元素（元素具有 position为absolute或fixed）
- 内联块（元素具有 display : inline-block）
- 表格单元格（元素具有 display: table-cell,html表格单元格默认属性）
- 表格标题（元素具有 display:table-caption, html表格标题默认属性）
- 具有overflow且值不是 visible 的块元素
- display:flow-root 的元素，这是唯一没有副作用的一种
- column-span: all 的元素

##  BFC决定了什么

我们上面谈到了BFC的一套规则，那么这些规则都有哪些呢？

- 内部的box将会独占宽度，且在垂直方向，一个接一个排列

- box垂直方向的间距由 margin 属性决定，但是同一个 BFC 的两个相邻box的margin 会出现边距折叠现象

- 每个box水平方向上左边缘，与BFC左边缘相对齐，即使存在浮动也是如此

- BFC 区域不会与浮动元素重叠，而是会依次排列

- BFC区域内是一个独立的渲染容器，容器内元素和BFC区域外元素不会形成任何干扰

- 浮动元素的高度也参与到BFC高度的计算当中

   

从中得出关键词，比如：边距折叠，清除浮动，自适应多栏布局。

## BFC 解决了什么问题

1. 父元素高度塌陷
2. 2.外边距折叠
3. 自适应多栏布局





