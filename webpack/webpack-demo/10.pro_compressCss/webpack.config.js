const {resolve} = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
// 单独提取css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css文件插件
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 不设置，默认为生产环境
// process.env.NODE_ENV = 'development'

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
          MiniCssExtractPlugin.loader,
          // 整合css字符串到js中
          'css-loader',
          {
            // css兼容性处理: postcss --> postcss-loader postcss-preset-env
            loader:'postcss-loader',
            options:{
              ident: 'postcss',
              plugins:()=>[
                // postcss的插件
                // 帮助读取postcss找到packae.json中browserslist里面的配置，
                // 通过配置加载指定的css兼容性样式
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 输出路径,相对与输出路径build之下
      filename:'css/[name].css'
    }),
    new OptimizeCssAssetWebpackPlugin()
  ],
  // 这个设置和生产环境和开发环境没有关系,决定执行环境的是process.env.NODE_ENV这个全局变量
  mode:'development'
}