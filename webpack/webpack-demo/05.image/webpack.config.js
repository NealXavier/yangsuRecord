const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output:{
    filename:'bulit.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        // 处理图片类型
        // 但是默认处理不了 html引入的图片
        test:/\.(png|jpg|gif|jpeg)$/,
        loader:'url-loader',
        options:{
          // 图片 < 8kb,就会被base64处理
          // 优点：减少请求数量
          // 缺点： base64 图片体积会更大一些(文件请求速度更慢)
          limit: 8 * 1024,
          // 问题：因为url-loader 默认使用es6模块化解析，而html-loader 引入图片是commonjs
          // 所以解析时会有问题: 编译后的index.html 会在img标签的src属性出现'[object Module]'
          // 但是我在实践时并没有出现,应该是在新版做了兼容
          // 解决：关闭url-loader 的es6模块化,使用commonjs 解析
          esModule:false,
          // 给图片进行重命名
          name:'[hash:10].[ext]'
        }
      },
      {
        test:/\.html$/,
        loader:'html-loader'
      }
    ]
  },
  plugins:[
    // new HtmlWebpackPlugin({
    //   template:'./src/index.html'
    // })
    new HtmlWebpackPlugin({
      // 复制 index.html文件, 并自动引入打包输出的所有资源
      template : "./src/index.html"
    })
  ],
  mode:'development'
}