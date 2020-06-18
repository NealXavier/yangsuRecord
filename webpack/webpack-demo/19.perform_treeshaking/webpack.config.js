const {resolve} = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimiziCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonCssLoader = [// 单独输出css文件
        MiniCssExtractPlugin.loader,
        'css-loader',
      {
        // 对css做兼容性处理
        loader:'postcss-loader',
        options:{
          ident: 'postcss',
          plugins:()=>[
            // 会对应去package.json 找 browsersList
            require('postcss-preset-env')()
          ] 
        }
      }]

module.exports = {
  // 入口
  entry:'./src/js/index.js',
  // 输出
  output:{
    filename:'js/built.[contenthash:10].js',
    path:resolve(__dirname,'build')
  },
  module:{
    // 处理css
    rules:[
      {
        test:/\.css$/,
        use:[...commonCssLoader]
      },
      {
        test:/\.less$/,
        use:[...commonCssLoader,
          'less-loader'
        ]
      },
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
      // 处理图片资源
      {
        test:/\.(jpg|png|jpeg)$/,
        loader:'url-laoder',
        options:{
          limit:8*1024,
          name:'[hash8]:[ext]',
          ouputPath:'imgs',
          // 和html-loader会有冲突
          esModule:false
        },
      },
      {
        // 处理html引入的图片
        test:/\.html$/,
        loader:'html-loader',
      },
      // 处理其他资源
      {
        exclude:/\.(html|css|js|jpg|png|gif)$/,
        loader:'file-loader',
        options:{
          output:'media'
        }
      }
    ]
  },
  plugins:[
    // 独立输出css代码
    new MiniCssExtractPlugin({
      filename:'css/built.[contenthash:10].css'
    }),
    // 压缩css代码
    new OptimiziCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      // 压缩html代码 
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
  // mode设置为production自动压缩js代码
  mode:'production'
}

  /**
 *   treeshaking: 顾名思义，树摇，把无用的节点摇掉。
 *                作用：减少代码体积。
 *  要素：  1.必须使用es6模块化
 *         2. mode : 'production'
 *  
 * 注意： 在package.json中配置
 *        "sideEffects":false 所有代码都没有副作用 （都可以进行tree shaking）
 *          问题： 可能会把 css/ @babel / polyfill （副作用）文件干掉
 *        
 *      但是在我的环境(webpack5)里面并没有出现css会被干掉的情况
 * 
 *      如果被错杀，可以采用 sideEffects:[*.css] ,css代表不想被摇掉的文件类型
 */