const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/js/index.js',
  output:{
    filename:'js/built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          // 创建style标签（这个不需要了）
          // 'style-loader',
          // 顺序需要注意, 独立输出一个css文件
          // 
          MiniCssExtractPlugin.loader,
          // 整合css字符串到js中
          'css-loader'
        ]
      }
    ]
  },
  plugins:[
    // 以下有关于plugin打印出来的错误不需要理会
    /**
     * Child mini-css-extract-plugin ../node_modules/css-loader/dist/cjs.js!src/css/main.css:
    Entrypoint mini-css-extract-plugin = *
    [../node_modules/css-loader/dist/cjs.js!./src/css/main.css] 415 bytes {mini-css-extract-plugin} [built]
        + 1 hidden module
     */
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 输出路径,相对与输出路径build之下
      filename:'css/[name].css'
    })
  ],
  mode:'development'
}