/**
 * 解析器Compile 实现步骤:
 * 
 * 1.解析模板指令，并替换模板数据，初始化象相应的订阅器 
 * 2.将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器
 * 

 /*
 * 为了解析模板，首先需要获取到dom元素，然后对含有dom元素上含有指令的节点进行处理
 * 因此这个环节需要对dom操作比较频繁，所有可以先建一个fragment片段，将需要解析的dom
 * 节点存入fragment片段里再进行处理：
 * 
 */
 function nodeToFragment(el){
   var fragment = document.createDocumentFragment()
   var child = el.firstChild
   while(child){
     // 将dom元素一入fragment中
     fragment.appendChild(child)
     child = el.firstChild
   }
   return fragment
 }
 

 /**
  * 接下来遍历各个节点，对含有相关指令的节点进行特殊处理，这里
  * 先处理最简单的情况，只对带有"{{}}"这种形式的指令进行处理，
  */

  function compileElement(el){
    var childNodes = el.childNodes
    var self = this
    Array.prototype.slice.call(childNodes).forEach(function(nodes){
      var reg = /\{\{(.*)\}\}/
      var text = node.textContent

      // 判断是否符合这种形式 {{}}的指令
      if(self.isTextNode(node) && reg.test(text)){
        self.compileText(node,reg.exec(text)[1])
      }
      if(node.childNodes && node.childNodes.length){
        self.compileElement(node) // 继续遍历子节点
      }
    })
  }
  function compileText(node,exp){
    var self = this
    var initText = this.vm[exp]
    updateText(node.initText) // 将初始化的数据初始化到视图中
    new Watcher(this.vm,exp,function(value){ // 生成订阅器并绑定更新函数
      self.updateText(node,value)
    })
  }
  function updateText(node,value){
    node.textContent = typeof value === 'undefined'?'':value
  }

  /**
   * 获取到最外层节点后，调用compileElement函数，对所有子节点进行判断，
   * 如果节点是文本节点且匹配 {{}} 这种形式指令的节点就开始进行编译处理，
   * 编译处理首先需要初始化视图数据，对应上面所说的步骤1，接下去需要生成一个
   * 并绑定更新函数的订阅器，对应上面所说的步骤2.这样就完成指令的解析，初始化，
   * 编译三个过程，一个解析器Compile也就可以正常的工作了。为了将解析器Compile
   * 与监听器Observer和订阅器 Watcher 关联起来，我们需要再修改一下类SelfVue函数：
   */



  /**
   * =========================================
   */

   /**
    * 到这里，一个数据双向绑定功能已经基本完成了，接下来就是需要完善更多指令的解析编译，
    * 在哪里进行更多指令的处理呢？答案很明显，只要在上文说的compileElement函数加上
    * 对其他指令节点进行判断，然后遍历其所有属性，看是否有匹配的指令的属性，
    * 如果有的话，就对其进行解析编译。这里再添加一个v-model指令和时间指令的解析编译
    */
   function compile (node) {
    var nodeAttrs = node.attributes;
    var self = this;
    Array.prototype.forEach.call(nodeAttrs, function(attr) {
        var attrName = attr.name;
        if (self.isDirective(attrName)) {
            var exp = attr.value;
            var dir = attrName.substring(2);
            if (self.isEventDirective(dir)) {  // 事件指令
                self.compileEvent(node, self.vm, exp, dir);
            } else {  // v-model 指令
                self.compileModel(node, self.vm, exp, dir);
            }
            node.removeAttribute(attrName);
        }
    });
  }
  // 上面的compile函数是挂载Compile原型上的，它首先遍历所有节点属性，
  // 然后再判断属性是否是指令属性，如果是的话再区分是哪种指令，再进行相应的处理，

  
