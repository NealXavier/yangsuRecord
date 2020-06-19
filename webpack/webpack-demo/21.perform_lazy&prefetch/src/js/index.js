console.log('index.js 加载了。。')

var btn = document.getElementById("btn")

btn.onclick = ()=>{
  // previously: 一定是使用代码分割功能
  // 懒加载：当文件需要时才加载~,缺点是：当请求的文件体积太大时会页面会卡死
  import(/*webpackChunkName:'test',webpackPrefetch:true*/'./test')
    .then(({mul,count})=>{
       console.log('加载成功~')
       console.log('mul(2,5)',mul(2,5))
    }).catch(e=>{
      console.log('加载失败了。')
    })
}