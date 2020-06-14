const {resolve}  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
    ]
  },
  plugins:[
    // 默认创建一个空的html，引入打包输出的所有资源（js/css）
    // 需求：需要有结构的html文件
    new HtmlWebpackPlugin({
      // 复制 index.html文件, 并自动引入打包输出的所有资源
      template : "./src/index.html"
    })

  ],
  mode:'development'
}