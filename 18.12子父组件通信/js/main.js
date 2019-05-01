Vue.component('balance',{
  template:'#balance',
  data: function(){
    return {
       show:false
    }
  },
  methods:{
    show_balance:function(){
      if(!this.show){
        this.show = true
      }else{
        this.show = !this.show;
      }
    },
  }
});

Vue.component('show',{
  template:'#show',
  methods:{
    on_click:function(){
      this.$emit('show-balance',{a:1});
    }
  }
});

var vm = new Vue({
  el:'#app',
});



/**
 * 学到什么：
 * 1 关于vue文件的引入应该是在body标签的最后
 *  不然会出现 can't find element '#app'
 * 2 vue文件必须在自定义文件之前
 *  不然会出现 can't find element '#app'
 * 3 自定义组件:全局方式应该是：
 *    Vue.component 而不是 Vue.components
 * 4 自定义事件名应该写成kecab写法也就是 show-balance 
 *    中间以 '-' 减号结束,方法名以 snake方式定义 :show_balance
 * 5 $emit 方法用于触发父组件, 相当于 jq里面的trigger
 * 
 * 6   data: function(){
    return {
       show:false
    }
  }
  7.一个组件的 data 选项必须是一个函数，
  因此每个实例可以维护一份被返回对象的独立的拷贝
  8. 如果是一个组件里面包含很多个同级组件，例如组件的内容如下：
    <button></button>
    <div v-if="show">....</div>
    这个时候一定要在外层给他们包裹一个div
    <div>
      <button></button>
      <div v-if="show">....</div>
    </div>

  9. v-if 指令的写法应该是： <div v-if="show"></div>
  */


 

 
