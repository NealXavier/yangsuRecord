A

|-  a-1

|- a-2

B

|- b-1

|- b-2



其实，层叠上下文也基本上是有一些特定的CSS属性创建，一般有三种方法：

1.html中的根元素<html></html>本身就有层叠上下文，称为“根层叠上下文”。

2.普通元素设置position属性为非static值并设置z-index属性为具体数值，产生层叠上下文。

3.css中的新属性也可以产生层叠上下文







1. 父元素的display属性值为`flex|inline-flex`，子元素`z-index`属性值不为`auto`的时候，子元素为层叠上下文元素；
2. 元素的`opacity`属性值不是`1`；
3. 元素的`transform`属性值不是`none`；
4. 元素`mix-blend-mode属性值不是`normal`；
5. 元素的`filter`属性值不是`none`；
6. 元素的`isolation`属性值是`isolate`；
7. `will-change`指定的属性值为上面任意一个；
8. 元素的`-webkit-overflow-scrolling`属性值设置为`touch`。