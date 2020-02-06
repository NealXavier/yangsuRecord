典型的布局方案：

- 传统float浮动布局
- 相对单位布局
- 媒体查询
- 基于相对单位rem的flexible布局
- flex布局
- grid布局
- 借助JavaScript



传统float浮动布局已经在【第3-1课：前端面试离不开的面子工程】中有所体现（多栏自适应），这种实现方式比较传统，且能力较弱。

相对单位布局比较容易理解，梳理css中的相对单位有：

- em
- rem
- vh、vw、vmin、vmax
- %
- calc()

到底相对于谁，这也是考点，

```
em 相对于当前元素或当前元素继承来的字体的宽度，但是每个字母或汉字的宽度有可能是不一样的，那么一般来说，就是一个大写字母M 的宽度（事实上，规范中有一个 x-height概念，建议取X的高度，但并没有推荐绝对的计算执行标准，还需要看浏览器的实现，也有的地方采用O的高度）；一个非常容易出错的点在于：很多同学会认为em相对于父元素的字体大小，但是实际上取决于应用在什么css属性上。对于font-size来说，em相对于父元素的字体大小；line-height中，em却相对于自身字体的大小。

rem 相对于根节点(html)的字体大小，根节点一个大写字母M的宽度（同上）。

这两个单位在响应式布局中非常重要，我们后续在真丝线上适配案例中就能发现，以rem为核心，诞生了淘宝的flexible 响应式布局的方案。

vw 相对于视口宽度， 100vw 就相当于一个视口宽度

vh 同理，1vh 表示视口高度的 1/100 ,100vh 就是一个视口高度

vmin 相对于视口的宽度或高度中较小的那个，也就是1vw和1vh取最小（Math.min(1vw,1vh)）; vmax 相对于视口的宽度或高度中较大的那个，（Math.max(1vw,1vh)）。

% 的相对对象我们专门挑出来后续的环节中介绍

calc也是一个响应式布局神器，它使得css有了运算的能力；
width: calc(100vw - 80px);

除了相对单位以外，媒体查询（Media Query）以及flex,grid布局也都比较好理解。相关内容都容易找到，这里插播一下借助 JavaScript 实现响应式布局的案例，结合css变量，往往能简化很多问题：
p {
	height: var(--test-height)
}
function changPHeight(height){
	document.documentElement.style.setProperty('--test-height',`${height}px`)
}
```



### 面试题

```
如何实现自适应？如何做到响应式？
```

```
真实线上适配案例分析：
在进入分析前，我们先罗列一下其他关于响应式布局的概念：
- 屏幕分辨率
- 像素
- PPI（Pixel Per Inch）: 每英寸包括的像素数
- DPI（Dot Per Inch）: 每英寸包括的点数
- 设备独立像素
- 设备像素比（dpr）
- Meta Viewport

重点分析移动端页面的处理方案：
首先在meta标签设置
<meta name = 'viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover'>
禁用了用户缩放功能，使页面宽度和设备宽度对齐，一般这种操作也是移动端的响应式适配的标配。


我们在页面根节点HTML元素上，显式设置了 font-sizes:
并且进行试验，当改变浏览器大小时，html的font-size会动态变化。这样不难理解，采用rem作为相对单位的长宽数值，都会随着resize事件进行变化（因为html的font-size动态变化）。我们在其页面中，不难找到这样的代码：

```

```javascript
!function(e, t) {
    var n = t.documentElement,
        d = e.devicePixelRatio || 1;

    function i() {
        var e = n.clientWidth / 3.75;
        n.style.fontSize = e + "px"
    }
    if (function e() {
        t.body ? t.body.style.fontSize = "16px" :
        t.addEventListener('DOMContentLoaded',e)
      }(), i(), e.addEventListener("resize", i), e.addEventListener("pageshow", function(e) {
        e.persisted && i()
    }), 2 <= d) {
        var o = t.createElement("body"),
            a = t.createElement("div");
            a.style.border = ".5px solid transparent", o.appendChild(a), n.appendChild(o), 1 === a.offsetHeight && n.classList.add("hairlines"), n.removeChild(o)
          }
      }(window, document)
```

```
核心逻辑不难理解，这是一个IIFE,在DOMContentLoaded.clientWidth / 3.75
为什么这么计算？淘宝工程师是按照设计375px的视觉稿完成的。在375px视觉稿下，html的font-size 为100，那么如果宽度是75px的元素，就可以设置为0.75rem(100 * 0.75 = 75px);当设备宽度为414px时，我们想让上述元素的宽度等比例自适应到82.8px( 75 414 / 375) ，那么在css样式为0.74rem不变的前提下，想计算得到82.8px，只需要html font-size 变为:100.4px即可（110.4 * 0.75s = 82.8）。那么反向过来，这个110.4的计算公式就是：
document.documentElement.clientWidth / 3.75
```



## Bootstrap 的栅格系统

.col-6 class 样式在源码里面可以简单归纳为：

```css
.col-6 {
  -webkit-box-flex: 0;
  -webkit-flex:0 0 50%;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}

.col-sm-3{
  -webkit-box-flex: 0;
  -webkit-flex:0 0 25%;
  -ms-flex: 0 0 25%;
  flex: 0 0 25%;
  max-width:25%;
}

但是col-6 和 col-sm-3 的样式属性是由冲突的，那么他们是如何做到和平共处交替发挥作用的呢？
事实上，
- 在屏幕宽度大于 576px 时候，会发现.col-sm-3并没有起作用，这时候起作用的是 .col-6 
我们发现 .col-sm-* 的样式声明全部在
@media(min-width:576px){...}
的媒体查询中，这就保证了576px宽度以上的屏幕，只有在媒体查询之外的.col-*样式声明发挥了作用。
- 在屏幕宽度小鱼576px时候，命中媒体查询，命中 .col-sm-3 的样式声明。
它的优先级一定大于.col-sm-3 的样式声明。它的优先级一定大于 .col-6 （媒体查询优先级高），这时候就保证了移动端的样式占上风。

再结合col-6 col-sm-3 的样式生命，我们可以简单总结一下： Bootstrap 主要是通过百分比宽度（max-width:50%;max-width:25%;），以及flex属性，再加上媒体查询，实现了栅格化布局主题。

```



## 横屏适配以及其他细节问题

```javascript
// 很多H5页面中，我们要区分横竖屏，所以需要监测在不同的场景下给定不同的样式。通常使用JavaScript 检查：
window.addEventListener('resize',()=>{
    if(window.oritentation === 180 || window.orientation === 0){
        console.log('竖屏')
    };
    if(window.orientation === 90 || window.orientation === -90){
        console.log('横屏')
    }
})
```

```css
// 同样可以使用纯css来实现不同场景下的布局：
@media screen and (orientation:portrait){
    /*竖屏样式代码*/
}
@media screen and (orientation:landscape){
    /*横屏样式代码*/
}
```

同时这里也有其他常见的响应式布局话题；

- 1px问题
- 适配iPhoneX 齐刘海
- 图片自适应



## 面试题：% 相对于谁

```
// 在之前的课程讲解了实现水平垂直居中的几种方式。其中absolute+transform 方案：
.wp {
	position: relative;
}
.box {
	position: absoulte;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
我们用到不止一处 %。事实上，上述代码中的%还真代表着不一样的计算规则。第一处 50% 是指 .wrap 相对定位元素宽度和高度的50%，而 transform中的 50% 是指自身元素的宽高的一半。

那么在css中，这个常见的 % 单位有着什么样的规则呢？
- position:absolute中的 %
对于设置绝对定位 position:absolute 的元素，我们可以使用 left,right 表示其偏移量，往上数第一个position属性的父元素为参照物元素，其中的%是相对于参照物的，left相对于参照物的width,top相对于这个参照物的 height。

- position:relative 中的 %
% 的数值是相对于自身的，left相对于自己的width，top相对于自己的height

- position: fixed 中的 %
% 的数值是相对于视口的，left相对于视口的width，top相对于视口的height

- margin 和 padding 的 %
margin和padding当中的%非常特殊，它是相对于父元素的宽度。没错，margin-top:30% ,相当于父元素宽度的 30%

- border-radius :50%  - background-size 的%
得到一个圆形，因此不难发现，这里的%也是相对于自身宽高的

-transform : translte 
transform 的 translate 属性 % 是相对于自身的宽高

- text-indent 的 1%
设置首行缩进，当使用%时，它是相对于父元素的width。

- font-size 的 %
相对于父元素的字体大小

- line-height 的 %
line-height 设置行高时，如果单位为%，则相对于该元素的font-size数值。
```



### 深入：flex布局和传统float布局性能对比

```
flex布局对性能的影响主要体现在哪方面？
```

首先性能问题一定是个一个相对概念。flex布局相对正常的block layout (non-float)性能开销一定更大。事实上，block layout 永远都是 single-pass算法进行布局，而flex布局却总会激发 multi-pass codepaths 算法布局。比如常用的flex-align：strech 通常都是 2-pass，这是无可争议且难以避免的短板，天生基因决定。