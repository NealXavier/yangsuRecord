// 引入
import '../css/iconfont.css';
import '../css/index.less';

import print from './print' 

print()

function add(x,y){return x+y}console.log('index js 被加载了。。。')()


// 如果开启HMR功能
if(module.hot){
  // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建
  // 重新执行的效果会打印：print被加载了~~~  print已经被加载了000
  // 但是index.js 这个模块没有改变，所以 index.js 被夹在不会重新打印
  module.hot.accept('./print.js',function(){
    print()
  })
}