---
    title:css 常用技巧
---

## 1、文字的水平居中
将一段文字置于容器的水平中点，只要设置text-align即可
```
    text-align:center;
```

## 2、容器的水平居中
先为该容器设置一个明确宽度，然后将margin的水平值设为auto即可
```
    div#container {
        width:760px;
        margin:0 auto;
    }
```

## 3、文字的垂直居中(不明白)
单行文字的垂直居中，只要将行高与容器高设为相等即可

比如，容器中有一行数字
```
    <div id = "container">123456</div>
```
然后css这样写；
```
    div#container {height:35px;line-height:35px;}
```

## 4、容器的垂直居中
比如，有一大一小两个容器，请问如何将小容器垂直居中
```
    <div id="big">
        <div id="small"></div>
    </div>
```
首先，将大容器的定位为relative
```
    div#big {
        position:relative;
        height:480px;
    }
```
然后，将小容器定位为absolute,再将它的左上角沿y轴下移50%，最后将它margin-top上移本身高度的50%即可。
```
    div#small {
        position: absolute;
        top: 50%;
        height: 240px;
        margin-top: -120px;
    }
    
```
使用同样的思路，也可以做出水平居中的效果

## 5、图片宽度的自适应
如何使得较大的图片，能够自动适应小容器的宽度？css可以这样写：
```
    img {max-width:100%;}
```

## 6、3D按钮
要使按钮具有3D效果，只要将它的左上部边框设为浅色，右下部边框设为深色即可。
```
    div#button {
        background:#888;
        border:1px solid;
        border-color: #999 #777 #777 #999;
    }
```

## 7、font属性的快捷写法
font快捷写法的格式为：
```
    body {font:font-style font-variant font-weight font-size line-height font-family}
```

