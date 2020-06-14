/**
 * 加载配置文件
 * 使用CommonJS规范
 * 
 */
const {resolve} = require('path')

module.exports ={
  entry:'./src/index.js',
  
  output:{
    filename: 'built.js',
    path: resolve(__dirname,'build')
  },
  // loader 配置
  module:{
    rules:[
      {
        // match
        test:/\.css$/,
        use:[
          // use数组中loader执行顺讯： 从右到左，从下到上，依次执行
          // 创建style标签，将js中的样式资源插入，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          // less 转化为
          'less-loader'
        ]
      }
    ]
  },
  // plugins的配置
  plugins:[
    // 详细plugins的配置
  ],
  // 模式
  mode:'development'
}