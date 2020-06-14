const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        exclude:/\.(html|css|js)$/,
        loader:'file-loader',
        options:{
          name:'[hash:8].[ext]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development',
      // 开发服务器 devServer:用来自动化（自动化编译，自动打开浏览器，自动刷新浏览器）
  // 特点： 只会在内存中编译打包，不会有任何输出
  // 安装 webpack-dev-server
  // 启动指令 : npx webpack-dev-server
  devServer:{
    // 项目路径
    contentBase:resolve(__dirname,'build'),
    // 启动gzip压缩
    compress:true,
    // 指定端口
    port:8090,
    // 自动打开浏览器
    open:true
  }
}