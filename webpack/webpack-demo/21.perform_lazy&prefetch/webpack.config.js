const {resolve} = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimiziCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口
  // entry:{
  //   main:'./demo03/src/js/index.js',
  //   test:'./demo03/src/js/test.js'
  // },
  entry:'./src/js/index.js',
  // 输出
  output:{
    filename:'js/[name].[contenthash:10].js',
    path:resolve(__dirname,'build')
  },
  module:{
    // 处理css
    rules:[
      // 处理js
      /**
       * 但是一般来讲,一个文件类型只能对应一个loader处理，
       * 当一个文件要被多个loader处理时，那么一定要指定处理顺序：
       * 先执行 eslint-loader , 再执行babel-loader
       */ 

      // {
      //   test:/\.js$/,
      //   exclude:/node_modules/,
      //   // 去.eslintrc文件找eslint风格规范
      //   enforce:'pre',
      //   loader:'eslint-loader',
      //   // 优先执行
      //   options:{
      //     fix:true // 自动检查
      //   }
      // },
      {
        oneOf:[
          {
            test:/\.js$/,
            exclude:/node_modules/,
            loader:'babel-loader',
            options:{
              presets:[
                [
                  // 只能处理普通的es6语法，不能处理promise这些
                  '@babel/preset-env',
                  {
                    useBuiltIns:'usage',
                    corejs:{
                      version:3
                    },
                    targets:{
                      chrome:'60',
                      firefox:'50'
                    }
                  }
                ]
              ],
            }
          },
        ]
      }
    ]
  },
  plugins:[
    // 独立输出css代码
    new MiniCssExtractPlugin({
      filename:'css/built.[contenthash:10].css'
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      // 压缩html代码 
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    }),
  ],
  // optimization:{
  //   splitChunks:{
  //       chunks:'all'
  //   },
  // },
  // mode设置为production自动压缩js代码
  mode:'production'
}

/**
   // 懒加载：当文件需要时才加载~,缺点是：当请求的文件体积太大时会页面会卡死
   // 预加载：等所有文件都加载完了之后，test文件才进行异步请求文件，但是不执行。可以有效防止页面卡死。 缺点是： 兼容性太差。
   // 所以说，一般还是用懒加载。。。
   // 正常加载： 可以认为是并行加载。
    import('./test')
    .then(({mul,count})=>{
      console.log('加载成功~')
    }).catch(e=>{
      console.log('加载失败了。')
    })
 *  
 */  