/**
 * 揭秘虚拟dom：
 *  虚拟dom就是用数据结构表示dom结构，它并没有真实append到dom上，因此称之为“虚拟” 
 * 
 *  而且，操作数据结构是指改变对象（虚拟DOM），这个过程比修改真实dom快很多。但虚拟dom也最终是要挂碍到浏览器
 *  上成为真实dom节点，因此使用虚拟dom并不能使得操作dom的数量减少，但能够精确地获取最小的，最必要的操作dom的集合
 */
// 直观上我们看这样一段 dom结构：
/**
 * - chapter 1
 * - chapter 2
 * - chapter 3
 */
/**
 * 如果用JavaScript 来表示，我们采用对象结构：
 */
const chapterListVirtualDom = {
  tagName: 'ul',
  attributes :{
    id: 'chapterList',
  },
  children:[
    {tagName:'li',attributes:{class:'chapter'},children:['chapter1']},
    {tagName:'li',attributes:{class:'chapter'},children:['chapter2']},
    {tagName:'li',attributes:{class:'chapter'},children:['chapter3']}
  ]
}

/**
 * 很好理解：tagName 表示虚拟 DOM 对应的真实 DOM 标签类型；attributes 是一个对象，表示真实 DOM 节点上所有的属性；
 * children 对应真实 DOM 的 childNodes，其中 childNodes 每一项又是类似的结构。我们来实现一个虚拟 DOM 生成类，用于生产虚拟 DOM： 
 */
class Element {
  constructor(tagName, attributes = {}, children = []) {
    this.tagName = tagName
    this.attributes = attributes
    this.children = children
  }
}

function element(tagName, attributes, children) {
  return new Element(tagName, attributes, children)
}

// 上述虚拟 DOM 就可以这样生成：
const chapterListVirtualDom = element('ul', { id: 'list' }, [
    element('li', { class: 'chapter' }, ['chapter1']),
    element('li', { class: 'chapter' }, ['chapter2']),
    element('li', { class: 'chapter' }, ['chapter3'])
  ])

  /**
   * 我们继续完成虚拟 DOM 向真实 DOM 节点的生成。首先实现一个 setAttribute 方法，
   * 后续的代码都将使用 setAttribute 方法来对 DOM 节点进行属性设置。 
   */
  const setAttribute = (node, key, value) => {
    switch (key) {
      case 'style':
        node.style.cssText = value
        break
      case 'value':
        let tagName = node.tagName || ''
        tagName = tagName.toLowerCase()
        if (
          tagName === 'input' || tagName === 'textarea'
        ) {
          node.value = value
        } else {
          // 如果节点不是 input 或者 textarea, 则使用 setAttribute 去设置属性
          node.setAttribute(key, value)
        }
        break
      default:
        node.setAttribute(key, value)
        break
    }
  }

  /**
   * Element 类中加入 render 原型方法，该方法的目的是根据虚拟 DOM 生成真实 DOM 片段：
   */
  class Element {
    constructor(tagName, attributes = {}, children = []) {
      this.tagName = tagName
      this.attributes = attributes
      this.children = children
    }
 
    render () {
      let element = document.createElement(this.tagName)
      let attributes = this.attributes
 
       for (let key in attributes) {
          setAttribute(element, key, attributes[key])
       }
 
      let children = this.children
 
      children.forEach(child => {
        let childElement = child instanceof Element
          ? child.render() // 若 child 也是虚拟节点，递归进行
          : document.createTextNode(child)  // 若是字符串，直接创建文本节点
        element.appendChild(childElement)
      })
 
      return element
    }
  }
 
  function element (tagName, attributes, children) {
    return new Element(tagName, attributes, children)
  }
  
  /**
   * 实现也不困难，我们借助工具方法：setAttribute 进行属性的创建；
   * 对 children 每一项类型进行判断，如果是 Element 实例，进行递归调用 child 的 render 方法；
   * 直到遇见文本节点类型，进行内容渲染。
   * 
   * 有了真实的 DOM 节点片段，我们趁热打铁，将真实的 DOM 节点渲染到浏览器上，实现 renderDOM 方法：
   */
  // 执行代码：
   const renderDom = (element, target) => {
    target.appendChild(element)
  }
  const setAttribute = (node, key, value) => {
    switch (key) {
      case 'style':
        node.style.cssText = value
        break
      case 'value':
        let tagName = node.tagName || ''
        tagName = tagName.toLowerCase()
        if (
          tagName === 'input' || tagName === 'textarea'
        ) {
          node.value = value
        } else {
          // 如果节点不是 input 或者 textarea，则使用 setAttribute 去设置属性
          node.setAttribute(key, value)
        }
        break
      default:
        node.setAttribute(key, value)
        break
    }
  }
 
  class Element {
    constructor(tagName, attributes = {}, children = []) {
      this.tagName = tagName
      this.attributes = attributes
      this.children = children
    }
 
    render () {
      let element = document.createElement(this.tagName)
      let attributes = this.attributes
 
       for (let key in attributes) {
          setAttribute(element, key, attributes[key])
       }
 
      let children = this.children
 
      children.forEach(child => {
        let childElement = child instanceof Element
          ? child.render() // 若 child 也是虚拟节点，递归进行
          : document.createTextNode(child)  // 若是字符串，直接创建文本节点
        element.appendChild(childElement)
      })
 
      return element
    }
  }
 
  function element (tagName, attributes, children) {
    return new Element(tagName, attributes, children)
  }
 
  const renderDom = (element, target) => {
    target.appendChild(element)
  }
 
  const chapterListVirtualDom = element('ul', { id: 'list' }, [
    element('li', { class: 'chapter' }, ['chapter1']),
    element('li', { class: 'chapter' }, ['chapter2']),
    element('li', { class: 'chapter' }, ['chapter3'])
  ])
 
  const dom = chapterListVirtualDom.render()
 
  renderDom(dom, document.body)




  /**
   * 虚拟 dom diff
   * 
   * 有了上述基础，我们可以产出一份虚拟 DOM，并渲染在浏览器中。当用户在特定操作后，会产出新的一份虚拟 DOM，
   * 如何得出前后两份虚拟 DOM 的差异，并交给浏览器需要更新的结果呢？这就涉及到 DOM diff 的过程。
     直观上，因为虚拟 DOM 是个树形结构，所以我们需要对两份虚拟 DOM 进行递归比较，将变化存储在一个变量 patches 中：
   */
  const diff = (oldVirtualDom, newVirtualDom) => {
    let patches = {}

    // 递归树，比较后的结果放到 patches
    /**
     * walkToDiff 前两个参数是两个需要比较的虚拟 DOM 对象；
     *  第三个参数记录 nodeIndex，在删除节点时使用，初始为 0；第四个参数是一个闭包变量，记录 diff 结果：
    */
    walkToDiff(oldVirtualDom, newVirtualDom, 0, patches)

     // 返回 diff 结果
    return patches
 }


 let initialIndex = 0

 const walkToDiff = (oldVirtualDom, newVirtualDom, index, patches) => {
   let diffResult = []

   // 如果 newVirtualDom 不存在，说明该节点被移除，我们将 type 为 REMOVE 的对象推进 diffResult 变量，并记录 index
   if (!newVirtualDom) {
     diffResult.push({
       type: 'REMOVE',
       index
     })
   }
   // 如果新旧节点都是文本节点，是字符串
   else if (typeof oldVirtualDom === 'string' && typeof newVirtualDom === 'string') {
     // 比较文本是否相同，如果不同则记录新的结果
     if (oldVirtualDom !== newVirtualDom) {
       diffResult.push({
         type: 'MODIFY_TEXT',
         data: newVirtualDom,
         index
       })
     }
   }
   // 如果新旧节点类型相同
   else if (oldVirtualDom.tagName === newVirtualDom.tagName) {
     // 比较属性是否相同
     let diffAttributeResult = {}

     for (let key in oldVirtualDom) {
       if (oldVirtualDom[key] !== newVirtualDom[key]) {
         diffAttributeResult[key] = newVirtualDom[key]
       }
     }

     for (let key in newVirtualDom) {
       // 旧节点不存在的新属性
       if (!oldVirtualDom.hasOwnProperty(key)) {
           diffAttributeResult[key] = newVirtualDom[key]
       }
     }

     if (Object.keys(diffAttributeResult).length > 0) {
         diffResult.push({
           type: 'MODIFY_ATTRIBUTES',
           diffAttributeResult
         })
     }

     // 如果有子节点，遍历子节点
     oldVirtualDom.children.forEach((child, index) => {
       walkToDiff(child, newVirtualDom.children[index], ++initialIndex, patches)
     })
   }
   // else 说明节点类型不同，被直接替换了，我们直接将新的结果 push
   else {
     diffResult.push({
       type: 'REPLACE',
       newVirtualDom
     })
   }

   if (!oldVirtualDom) {
     diffResult.push({
       type: 'REPLACE',
       newVirtualDom
     })
   }

   if (diffResult.length) {
     patches[index] = diffResult
   }
 }

// 我们最后将所有代码放在一起：

const setAttribute = (node, key, value) => {
   switch (key) {
     case 'style':
       node.style.cssText = value
       break
     case 'value':
       let tagName = node.tagName || ''
       tagName = tagName.toLowerCase()
       if (
         tagName === 'input' || tagName === 'textarea'
       ) {
         node.value = value
       } else {
         // 如果节点不是 input 或者 textarea，则使用 setAttribute 去设置属性
         node.setAttribute(key, value)
       }
       break
     default:
       node.setAttribute(key, value)
       break
   }
 }

 class Element {
   constructor(tagName, attributes = {}, children = []) {
     this.tagName = tagName
     this.attributes = attributes
     this.children = children
   }

   render () {
     let element = document.createElement(this.tagName)
     let attributes = this.attributes

      for (let key in attributes) {
         setAttribute(element, key, attributes[key])
      }

     let children = this.children

     children.forEach(child => {
       let childElement = child instanceof Element
         ? child.render() // 若 child 也是虚拟节点，递归进行
         : document.createTextNode(child)  // 若是字符串，直接创建文本节点
       element.appendChild(childElement)
     })

     return element
   }
 }

 function element (tagName, attributes, children) {
   return new Element(tagName, attributes, children)
 }

 const renderDom = (element, target) => {
   target.appendChild(element)
 }

 const diff = (oldVirtualDom, newVirtualDom) => {
   let patches = {}

   // 递归树 比较后的结果放到 patches
   walkToDiff(oldVirtualDom, newVirtualDom, 0, patches)

   return patches
 }

 let initialIndex = 0

 const walkToDiff = (oldVirtualDom, newVirtualDom, index, patches) => {
   let diffResult = []

   // 如果 newVirtualDom 不存在，说明该节点被移除，我们将 type 为 REMOVE 的对象推进 diffResult 变量，并记录 index
   if (!newVirtualDom) {
     diffResult.push({
       type: 'REMOVE',
       index
     })
   }
   // 如果新旧节点都是文本节点，是字符串
   else if (typeof oldVirtualDom === 'string' && typeof newVirtualDom === 'string') {
     // 比较文本是否相同，如果不同则记录新的结果
     if (oldVirtualDom !== newVirtualDom) {
       diffResult.push({
         type: 'MODIFY_TEXT',
         data: newVirtualDom,
         index
       })
     }
   }
   // 如果新旧节点类型相同
   else if (oldVirtualDom.tagName === newVirtualDom.tagName) {
     // 比较属性是否相同
     let diffAttributeResult = {}

     for (let key in oldVirtualDom) {
       if (oldVirtualDom[key] !== newVirtualDom[key]) {
         diffAttributeResult[key] = newVirtualDom[key]
       }
     }

     for (let key in newVirtualDom) {
       // 旧节点不存在的新属性
       if (!oldVirtualDom.hasOwnProperty(key)) {
           diffAttributeResult[key] = newVirtualDom[key]
       }
     }

     if (Object.keys(diffAttributeResult).length > 0) {
         diffResult.push({
           type: 'MODIFY_ATTRIBUTES',
           diffAttributeResult
         })
     }

     // 如果有子节点，遍历子节点
     oldVirtualDom.children.forEach((child, index) => {
       walkToDiff(child, newVirtualDom.children[index], ++initialIndex, patches)
     })
   }
   // else 说明节点类型不同，被直接替换了，我们直接将新的结果 push
   else {
     diffResult.push({
       type: 'REPLACE',
       newVirtualDom
     })
   }

   if (!oldVirtualDom) {
     diffResult.push({
       type: 'REPLACE',
       newVirtualDom
     })
   }

   if (diffResult.length) {
     patches[index] = diffResult
   }
 }

// 我们对 diff 进行测试：

const chapterListVirtualDom = element('ul', { id: 'list' }, [
   element('li', { class: 'chapter' }, ['chapter1']),
   element('li', { class: 'chapter' }, ['chapter2']),
   element('li', { class: 'chapter' }, ['chapter3'])
 ])

 const chapterListVirtualDom1 = element('ul', { id: 'list2' }, [
   element('li', { class: 'chapter2' }, ['chapter4']),
   element('li', { class: 'chapter2' }, ['chapter5']),
   element('li', { class: 'chapter2' }, ['chapter6'])
 ])

 diff(chapterListVirtualDom, chapterListVirtualDom1)
 



/**
 * 最小化差异应用
 * 
 * 大功告成之前，我们来看看都做了哪些事情：通过 Element class 生成了虚拟 DOM，
 * 通过 diff 方法对任意两个虚拟 DOM 进行比对，得到差异。
 * 那么这个差异如何更新到现有的 DOM 节点中呢？看上去需要一个 patch 方法来完成：
 */
const patch = (node, patches) => {
  let walker = { index: 0 }
  walk(node, walker, patches)
}

/**
 * patch 方法接受一个真实的 DOM 节点，它是现有的浏览器中需要进行更新的 DOM 节点，
 * 同时接受一个最小化差异集合，该集合对接 diff 方法返回的结果。在 patch 方法内部，我们调用了 walk 函数：
 */
const walk = (node, walker, patches) => {
  let currentPatch = patches[walker.index]

  let childNodes = node.childNodes

  childNodes.forEach(child => {
    walker.index++
    walk(child, walker, patches)
  })

  if (currentPatch) {
    doPatch(node, currentPatch)
  }
}
// walk 进行自身递归，对于当前节点的差异调用 doPatch 方法进行更新：
const doPatch = (node, patches) => {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'MODIFY_ATTRIBUTES':
        const attributes = patch.diffAttributeResult.attributes
        for (let key in attributes) {
            if (node.nodeType !== 1) return
            const value = attributes[key]
            if (value) {
              setAttribute(node, key, value)
            } else {
              node.removeAttribute(key)
            }
        }
        break
      case 'MODIFY_TEXT':
        node.textContent = patch.data
        break
      case 'REPLACE':
        let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newNode, node)
        break
      case 'REMOVE':
        node.parentNode.removeChild(node)
        break
      default:
        break
    }
  })
}

// doPatch 对四种类型的 diff 进行处理，最终进行测试：
  var element = chapterListVirtualDom.render()
  renderDom(element, document.body)

  const patches = diff(chapterListVirtualDom, chapterListVirtualDom1)

  patch(element, patches)

// 全部代码放在一起：
const setAttribute = (node, key, value) => {
  switch (key) {
    case 'style':
      node.style.cssText = value
      break
    case 'value':
      let tagName = node.tagName || ''
      tagName = tagName.toLowerCase()
      if (
        tagName === 'input' || tagName === 'textarea'
      ) {
        node.value = value
      } else {
        // 如果节点不是 input 或者 textarea, 则使用 setAttribute 去设置属性
        node.setAttribute(key, value)
      }
      break
    default:
      node.setAttribute(key, value)
      break
  }
}

class Element {
  constructor(tagName, attributes = {}, children = []) {
    this.tagName = tagName
    this.attributes = attributes
    this.children = children
  }

  render () {
    let element = document.createElement(this.tagName)
    let attributes = this.attributes

     for (let key in attributes) {
        setAttribute(element, key, attributes[key])
     }

    let children = this.children

    children.forEach(child => {
      let childElement = child instanceof Element
        ? child.render() // 若 child 也是虚拟节点，递归进行
        : document.createTextNode(child)  // 若是字符串，直接创建文本节点
      element.appendChild(childElement)
    })

    return element
  }
}

function element (tagName, attributes, children) {
  return new Element(tagName, attributes, children)
}

const renderDom = (element, target) => {
  target.appendChild(element)
}

const diff = (oldVirtualDom, newVirtualDom) => {
  let patches = {}

  // 递归树 比较后的结果放到 patches
  walkToDiff(oldVirtualDom, newVirtualDom, 0, patches)

  return patches
}

let initialIndex = 0

const walkToDiff = (oldVirtualDom, newVirtualDom, index, patches) => {
  let diffResult = []

  // 如果 newVirtualDom 不存在，说明该节点被移除，我们将 type 为 REMOVE 的对象推进 diffResult 变量，并记录 index
  if (!newVirtualDom) {
    diffResult.push({
      type: 'REMOVE',
      index
    })
  }
  // 如果新旧节点都是文本节点，是字符串
  else if (typeof oldVirtualDom === 'string' && typeof newVirtualDom === 'string') {
    // 比较文本是否相同，如果不同则记录新的结果
    if (oldVirtualDom !== newVirtualDom) {
      diffResult.push({
        type: 'MODIFY_TEXT',
        data: newVirtualDom,
        index
      })
    }
  }
  // 如果新旧节点类型相同
  else if (oldVirtualDom.tagName === newVirtualDom.tagName) {
    // 比较属性是否相同
    let diffAttributeResult = {}

    for (let key in oldVirtualDom) {
      if (oldVirtualDom[key] !== newVirtualDom[key]) {
        diffAttributeResult[key] = newVirtualDom[key]
      }
    }

    for (let key in newVirtualDom) {
      // 旧节点不存在的新属性
      if (!oldVirtualDom.hasOwnProperty(key)) {
          diffAttributeResult[key] = newVirtualDom[key]
      }
    }

    if (Object.keys(diffAttributeResult).length > 0) {
        diffResult.push({
          type: 'MODIFY_ATTRIBUTES',
          diffAttributeResult
        })
    }

    // 如果有子节点，遍历子节点
    oldVirtualDom.children.forEach((child, index) => {
      walkToDiff(child, newVirtualDom.children[index], ++initialIndex, patches)
    })
  }
  // else 说明节点类型不同，被直接替换了，我们直接将新的结果 push
  else {
    diffResult.push({
      type: 'REPLACE',
      newVirtualDom
    })
  }

  if (!oldVirtualDom) {
    diffResult.push({
      type: 'REPLACE',
      newVirtualDom
    })
  }

  if (diffResult.length) {
    patches[index] = diffResult
  }
}

const chapterListVirtualDom = element('ul', { id: 'list' }, [
  element('li', { class: 'chapter' }, ['chapter1']),
  element('li', { class: 'chapter' }, ['chapter2']),
  element('li', { class: 'chapter' }, ['chapter3'])
])

const chapterListVirtualDom1 = element('ul', { id: 'list2' }, [
  element('li', { class: 'chapter2' }, ['chapter4']),
  element('li', { class: 'chapter2' }, ['chapter5']),
  element('li', { class: 'chapter2' }, ['chapter6'])
])

const patch = (node, patches) => {
  let walker = { index: 0 }
  walk(node, walker, patches)
}

const walk = (node, walker, patches) => {
  let currentPatch = patches[walker.index]

  let childNodes = node.childNodes

  childNodes.forEach(child => {
    walker.index++
    walk(child, walker, patches)
  })

  if (currentPatch) {
    doPatch(node, currentPatch)
  }
}

const doPatch = (node, patches) => {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'MODIFY_ATTRIBUTES':
        const attributes = patch.diffAttributeResult.attributes
        for (let key in attributes) {
            if (node.nodeType !== 1) return
            const value = attributes[key]
            if (value) {
              setAttribute(node, key, value)
            } else {
              node.removeAttribute(key)
            }
        }
        break
      case 'MODIFY_TEXT':
        node.textContent = patch.data
        break
      case 'REPLACE':
        let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newNode, node)
        break
      case 'REMOVE':
        node.parentNode.removeChild(node)
        break
      default:
        break
    }
  })
}

//先执行：

var element = chapterListVirtualDom.render()
renderDom(element, document.body)

// 再执行：
const patches = diff(chapterListVirtualDom, chapterListVirtualDom1)

patch(element, patches)

/**
 * 生成结果符合预期。
 *  短短不到两百行代码，就实现了虚拟 DOM 思想的全部流程。当然其中还有一些优化手段，
 *  一些边界情况并没有进行特别处理，但是我们去翻看一些著名的虚拟 DOM 库：snabbdom、etch 等，
 *  其实现思想和上述教例完全一致。
 */
