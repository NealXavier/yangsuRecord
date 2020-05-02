axios.interceptors.response.use(function (response) {
  let {config: {url, method, data}} = response
  data = JSON.parse(data||'{}')
  let row = {
    id: 1, name: 'JavaScript高级程序设计', number: 2
  }
  if(url === '/books/1' && method === 'get'){
    response.data = row
  }else if(url === '/books/1' && method === 'put'){
    response.data = Object.assign(row, data)
  }
  return response
})


// 转成模块化代码,将对象转成原型对象,复制原型方法
class Model{
  constructor(options){
    this.data = options.data || {}
    this.resource = options.resource
    this.baseUrl = options.baseUrl || '/'
  }
  // 获取
  fetch(id){
    return axios.get(this.baseUrl + this.resource + 's/'+id)
            .then(({data})=>{this.data = data})
  }
  // 更新
  update(newData){
    let id = this.data.id
    return axios.put(this.baseUrl + this.resource + 's/' + id,newData)
            .then(({data})=>{this.data  = data})
  }
  create(data){
    return axios.post(this.baseUrl + this.resource + 's',data)
            .then(({data})=>{this.data = data})
  }
  destroy(){
    let id = this.data.id
    return axios.delete(this.baseUrl + this.resource + 's/' + id)
            .then(()=>this.data = {})
  }
}


var model = new Model({
  resource:'book',
  data:{
    id:null,
    numbers:0,
    name:null
  }
})


class View {
  constructor({el,template}){
    this.el = el
    this.$el = $(this.el)
    this.template = template
  }
  render(data){
    let html = this.template
    for(let key in data){
      let value = data[key]
      html = html.replace(`__${key}__`,value)
    }
    this.$el.html(html)
  }
}


var view = new View({
  el:'#app',
  template:`
      <div>
      书名：《__name__》，
      数量：__number__
    </div>
    <div class="actions">
      <button id="increaseByOne">加1</button>
      <button id="decreaseByOne">减1</button>
      <button id="square">平方</button>
      <button id="cube">立方</button>
      <button id="reset">归零</button>
    </div>
  `,
})

class Controller {
  constructor({view,model,events,init,...rest}){
    this.view = view
    this.model = model
    this.events = events
    Object.assign(this,rest)
    this.bindEvents()
    this.view.render(this.model.data)
    init.apply(this,arguments)
  }
  // 事件委托
  bindEvents(){
    this.events.map((evt)=>{
      this.view.$el.on(evt.type,evt.el,this[evt.fn].bind(this))
    })
  }
}

var controller = new Controller({
  view:view,
  model:model,
  events: [
    { type: 'click', el: '#increaseByOne', fn: 'add' }, 
    { type: 'click', el: '#decreaseByOne', fn: 'minus' },
    { type: 'click', el: '#square', fn: 'square' },
    { type: 'click', el: '#cube', fn: 'cube' }, 
    { type: 'click', el: '#reset', fn: 'reset' }
  ],
  init(options){
    this.model.fetch(1).then(()=>{
          this.view.render(this.model.data)})
  },
  updateModel(newData){
    this.model.update(newData).then(()=>{
      this.view.render(this.model.data)
    })
  },
  add() {
    let newData = {number: this.model.data.number + 1}
    this.updateModel(newData)
  },
  minus() {
    // 注意这里有 bug
    this.model.data.number = this.model.data.number - 1
    this.updateModel(this.model.data)
  },
  square() {
    let newData = {number: Math.pow(this.model.data.number, 2)}
    this.updateModel(newData)
  },
  cube() {
    let newData = {number: Math.pow(this.model.data.number, 3)}
    this.updateModel(newData)
  },
  reset() {
    this.updateModel({number: 0})
  },
})