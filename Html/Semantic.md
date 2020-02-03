## 如何理解HTML语义化
### Html是什么？为什么？怎么做？
是什么？

```
根据结构化的内容，选择合适的标签。
```

为什么?

```
【合适的标签】是内容表达的高度概括，这样浏览器爬虫或者任何机器在读取html时，都能更好地理解，进而解析效率更高。这样带来的收益如下：
- 有利于SEO
- 开发维护体验更好
- 用户体验更好（如使用alt标签用于解释图片信息）
- 更好的accessibility, 方便任何设备解析（如盲人阅读器）
```

怎么做？

​	html标签为9大类别，每一种类别都包含有语义化的标签内容，

```
Head: html,head,title,base,link,meta,style,script,noscript
Section:body,article,nav,aside,section,header,footer,h1-h6,
		main,address
Grouping:p,hr,pre,blockquote,ol,ul,li,dl,dt,dd,figure,
		 figcaption,div
tables:table,caption,thead,tbody,tfoot,tr,th,td,col,colgroup
Forms: form,fieldset,legend,label,input,button,select,textarea,option
Interactive:details,summary,command,menu
Edits:del,ins
Embedded: img,iframe,embed,param,video,audio,source,canvas,area,map,track
Text-level: a ,em,strong,i,b,u,s,small,abbr,q,cite,dfn
```



