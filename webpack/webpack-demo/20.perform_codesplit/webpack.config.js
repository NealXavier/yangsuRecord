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
  entry:'./demo03/src/js/index.js',
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
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory:true
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
      template:'./demo03/src/index.html',
      // 压缩html代码 
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    }),
  ],
  optimization:{
    splitChunks:{
        chunks:'all'
    },
  },
  // mode设置为production自动压缩js代码
  mode:'production'
}


/**  previously: 
 *      对于entry文件入口数会打包输出对应数量的文件：
 *      但是事实上，多入口文件使用的相对较少。都是单页面（单入口）文件居多。
 *      
 * 、
 *  代码分割 code split:
 *  
 *   作用： 
 *       1、将 node_modules 中代码单独打包一个 chunk 最终输出，比如你在js 中引入 jQuery,那么jQuery将会被独立打包
 *       2、自动分析多入口chunk 中。 有没有公共文件，如果有的话会打包成单独一个chunk。
 *            例如： test.js 引入jQuery。 index.js 也引入 jQuery 。 如果不采用code-split，会把jq都打到文件上。体积就会很大。
 *       
 *   配置方式：
 *      optimization:{
 *          splitChunks:{
 *              chunks:'all'
 *          },
 *      }
 *  addition:
 *     为了分辨出打包文件的来源(一般是针对多文件)：可以在 output: {
 *                                      filename:'js/[name].[contenthash:10].js' 这样就可以分辨来源了。   
 *                                  }
 *    
 * 
 *  还有另外一种方法: 使用js文件引入。
 *    通过js代码，让某个文件被单独打包成一个chunk。（一般是但入口文件的情况）
 *    import 动态导入语法： 能将某个文件单独打包。
 *     
      import(./test')
        .then(({mul,count})=>{
          // 文件加载成功
          // eslint-disable-next-line
          console.log('mul(3,4)'+ mul(3,4))
        })
        .catch(()=>{
          // eslint-disable-next-line
          console.log('文件加载失败~')
        })
  问题： 
      单独输出的包文件名称会变，所以应该加个注释  "/* webpackChunkName:'test' */
// 发现使用注释输出文件名还是没变：原来是输出文件名被定死了。应该由 js/bulit -> js/[name]