function add(...args){
  return args.reduce((prev,next)=>prev+next,0)
}


import(/* webpackChunkName:'test' */'./test')
  .then(({mul,count})=>{
    // 文件加载成功
    // eslint-disable-next-line
    console.log('mul(3,4)'+ mul(3,4))
  })
  .catch(()=>{
    // eslint-disable-next-line
    console.log('文件加载失败~')
  })
