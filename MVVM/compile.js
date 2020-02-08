  /**
   * example 5: 模板编译原理介绍：
   */

  // {{stage}}平台:{{course.title}}
  // {{course.title}}是{{course.author}} 发布的课程
  // 发布时间为{{course.publishTime}}

  let vm = new Vue({
    el:'#apps',
    data : {
      stage:'zhihu',
      course:{
        title:'前端开发进阶',
        author:'xavier',
        publishTime:'2018年5月'
      }
    }
  })
/**
 *  其中 模板变量使用了 {{}} 的表达方式模板变量。最终输出的html内容应该被合适的数据进行填充替换，因此还需要一步编译过程，
 *  该过程任何框架或类库中都是想通的，比如React中的JSX，也是编译为 React.createElement，并在生成虚拟DOM时进行数据填充
 */
 

 /**
  * example 6: 编译模版实现
  */
 /**
  * 原理很简单，就是使用正则 + 遍历，有时也需要一些算法知识，只需要对 #app 节点下而你容进行替换，通过正则识别出模板变量，
  * 获取对应的数据即可。 
  * 
  * 代码分析: 我们使用fragment 变量存储生成的真实html节点内容。通过replace方法对{{变量}}进行数据替换,
  * 同时{{变量}} 的表达只会出现在 nodeType === 3 的文本类型节点中，因此对于符合 node.nodeType === 3 && reg.test(textContent)
  * 条件的情况,进行数据获取和填充。我们借助字符串 replace 方法第二个参数进行一次性替换，此时对于形如 {{ data.course.title }} 的深层
  * 数据，通过 reduce 方法，获得正确的值。因为DOM结构可能是多层的，所以对存在子节点的节点，依然使用递归进行replace替换。
  */
 compile(document.querySelector('#app'),data)
 function compile(el,data){
   let fragment = document.createDocumentFragment()
   while(child = el.firstChild){
     fragment.appendChild(child)
   }
   // 对el里面的内容进行替换
   function replace(fragment){
     Array.from(fragment.childNodes).forEach(node=>{
       let textContent = node.textContent
       let reg = /\{\{(.*?)\}\}/g
       if(node.nodeType === 3 && reg.test(textContent)){
         const nodeTextContent = node.textContent
         const replaceText = ()=>{
           node.textContent = nodeTextContent.replace(reg,(matched,placeholder)=>{
             return placeholder.split('.').reduce((prev,key)=>{
               return prev[key]
             },data)
           })
         }
         replaceText()
       }
       // 如果还有子节点，继续递归 replace
       if(node.childNodes && node.childNodes.length){
         replace(node)
       }
     })
   }
  replace(fragment)
  el.appendChild(fragment)
  return el
 }


 /**
 * example 7: 
 *  上述实现单向的，数据变化引起了视图变化，
 *  那么如果页面中存在一个输入框，如何交互
 */
function replace(el,data){
  // mute ...
  if(Node.nodeType === 1){
    let attributesArray = node.attributes
    Array.from(attributesArray).forEach(attr=>{
      let attributeName = attr.name
      let attributeValue = attr.value
      if(name.includes('v-')){
        node.value = data[attributeValue]
      }
      node.addEventListener('input',e=>{
        let newVal = e.target.value
        data[attributeValue] = newVal
        // ...
        // 更改数据源，触发 setter
        // ...
      })
    })
  }
  if(node.childNodes && node.childNodes.length){
    replace(node)
  }
}