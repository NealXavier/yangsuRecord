这里我们将从以下五大方面进行比较：

- 数据绑定
- 组件化和数据流
- 数据状态管理
- 渲染和更新
- 社区



### 数据绑定

vue在数据绑定上，采取了双向绑定策略，依靠Object.defineProperty(Vue3.0迁移到Proxy)以及监听DOM事件实现。简单来说，数据改变，依赖对数据进行拦截 / 代理；视图改变，依赖DOM时间（如onInput,onChange等）。Vue实例中的data和模板展现是一条线，无论被谁修改，另一方也会发生变动。

需要区分清楚的是：双向绑定和单向数据流并没有直接关联，双向绑定是指数据和视图之间的绑定关系，而单向数据流是指组件之间数据的传递。

React 并没有数据和视图之间的双向绑定，它的策略是“局部刷新”。当数据发生变化时，直接重新渲染组件，以得到最新的视图。这种“无脑”刷新的做法看似粗暴，但是换来的简单直观，并且 React 本身在性能上也提供了一定保障。



### 组件化和数据流

Vue 中组件不像 React 组件，它不是完全以组件功能和 UI 为维度划分的，而 Vue 组件本质是一个 Vue 实例。每个 Vue 实例在创建时都需要经过：设置数据监听、编译模版、应用模版到 DOM，在更新时根据数据变化更新 DOM 的过程。在这个过程中，类似 React 也提供了生命周期方法。

Vue 组件间通信或者说组件间数据流如同 React，也是单向的。数据流向也很类似：props 实现父组件向下传递数据，events 实现子组件向上发送消息给父组件，React 中是基于 props 的回调实现子组件向父组件传递数据（Vue 也支持）。

### 数据状态管理

对于较为复杂的数据状态，Redux 是 React 应用最常用的解决方案。这里需要说明的是：Redux 和视图无关，它只是提供了数据管理的流程，因此 Vue 使用 Redux 也是完全没有问题的。

当然，vue中常用的是vuex，其借鉴了Redux，也有具有和Redux相同的store概念，组件不允许直接修改store state，而是需要dispatch action来通知store的改变。但是这个过程不同于Redux的函数式思想，vuex改变store的方法支持提交一个mutation。mutation类似于事件发布订阅系统；每个mutation都有一个字符串来表示时间类型（type）和一个回调函数（handler）以进行对应的修改。

另外一个区别是，在vuex中，store是被直接注入到组件实例中的，因此用起来更加方便。而Redux需要connect方法，把props和dispatch注入给组件。

**造成这些不同的本质原因是：**

- Redux提倡不可变性，而Vuex的数据是可变的，Redux中reducer每次都会生成新的state以替代旧的state，而Vuex是直接修改。
- Redux在监测数据变化时，是通过前比较浅比较的方式比较差异的，而Vuex其实和Vue的原理一样，是通过遍历数据的getter/setter来比较。

### 渲染和更新

React 和 Redux 倡导不可变性，更新需要维持不可变原则；而 Vue 对数据进行了拦截/代理，因此它不要求不可变性，而允许开发者修改数据，以引起响应式更新。

React 更像 MVC 或者 MVVM 模式中的 view 层，但是搭配 Redux 等，它也是一个完整的 MVVM 类库。Vue 直接是一个典型 MVVM 模式的体现，虽然它一直标榜自己也只是 View 层，但是毫无疑问它本身包含了对数据的操作。比如，Vue 文档中经常会使用 VM（ViewModel 简称），这个变量名表示 Vue 实例，其命名让人想到 MVVM，这是 MVVM 模式的体现。

React 所有组件的渲染都依靠灵活而强大的 JSX。JSX 并不是一种模版语言，而是 JavaScript 表达式和函数调用的语法糖。在编译之后，JSX 被转化为普通的 JavaScript 对象，用来表示虚拟 DOM。

Vue templates 是典型的模版，这相比于 JSX，表达更加自然。在底层实现上，Vue 模版被编译成 DOM 渲染函数，结合响应系统，进行数据依赖的收集。Vue的渲染的过程如下：

- new Vue，进行实例化
- 挂在$mount方法，通过自定义Render方法，template，el等生成Render函数，准备渲染内容
- 通过Watcher 进行依赖收集
- 当数据发生变化时，Render函数执行生成VNode对象
- 通过patch方法，对比新旧VNode对象，通过DOM diff算法，添加，修改，删除真正的dom元素



关于更新性能问题，简单来说，在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。当然我们可以使用 PureComponent，或是手动实现 shouldComponentUpdate 方法，来规避不必要的渲染。但是这个实现过程要知悉数据状态结构，也需要一定的额外负担。

在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，因此系统能精确知晓哪个组件需要被重渲染。从理论上看，Vue 的渲染更新机制更加细粒度，也更加精确。



### 社区

...