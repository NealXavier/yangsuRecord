/*
 * index.js : webpack 入门起点文件
   
  1.  directive：
    开发环境： webpack ./src/index.js -o ./build/built.js --mode=development
    生产环境： webpack ./src/index.js -o ./build/built.js --mode=production ，变成压缩版代码
  2. conclusion:
    2.1 webpack 能处理 js/json,不能处理 css/img 等其他资源
    2.2 生产环境比开发环境多一个压缩代码
    2.3 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化
 */
import data from './index.json'

// Error: You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.
import style from './index.css' 


console.log(data)

function add(x,y){
  return x + y 
}

console.log(add(1,2))
