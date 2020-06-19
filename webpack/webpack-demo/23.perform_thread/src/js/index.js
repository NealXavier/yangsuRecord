// import { mul } from './test'
import '../css/main.css'

function sum(...args){
  return args.reduce((prev,next)=>prev+next,0)
}

// 注册serviceworker
// 处理兼容性问题
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    debugger
    navigator.serviceWorker.register('./service-worker.js')
      .then(()=>{
        console.log('sw注册成功了~~')
      })
      .catch(()=>{
        console.log('sw注册失败~~')
      })
  })
}

