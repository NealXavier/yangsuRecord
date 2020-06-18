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
 *  缓存：**用于生产环境中**，其实目的和HMR热模块替换是一样的，只不过HMR用于开发环境，
 *                         缓存开启，可以让未修改的文件只读缓存，不用重新构建，节省构建时间。
 * 
 *  chunk : 代码块， 在入口(entry)文件中所有引入的资源文件，包括: js、css文件都会被捆绑形成一个chunk
 *  
 */

 // 问题：
 /**  
  *  Module build failed (from ../node_modules/eslint-loader/dist/cjs.js): Error: Cannot find module 'eslint'
  * 
  * 用过的方案：
  *     1. 删除package-lock.json
  *     2. 在package.json 中删除eslint有关的依赖
  *     3. 删除掉node_modules中有关eslint的包
  * 但是都没有解决
  *     最后是用 npm install eslint-loader --save-dev 重新装了eslint才恢复的
  * 
  * 
  * 缓存：
  *     babel缓存： 
  *         cacheDirectory: true.  1.启动babel缓存 2.第二次构建时，会读取之前的缓存
  *     文件资源缓存：
  *         读取文件资源缓存需要注意改动文件重新打包之后，是不是还还应该拿缓存？
  *         前提是: 服务端已经先提前写入 cookie 代表built 目录下的文件都进行强缓存
  *         那么就代表,哪怕我们对文件进行改动后重新打包,还是会读缓存，这是我们不想看到的。
  *     
  *       1. 使用普通的hash值: 这样会导致，打包的hash值都一样，但是每次改动，假如我只改了css文件，但是js文件也会重新获取。（即缓存失效）
  *       2. chunkhash: 来自同一个chunk，那么hash值是一样的。怎么理解chunk，从同一个入口文件引入的所有资源文件都算同一个trunk
  *           所以，一旦只改动一个文件，其他同个trunk的文件也会重新构建，也就是缓存还是会失效。    
  *       3. contenthash: 只根据修改内容来的hash值。真正做到了根据内容来决定资源文件到底需不需要构建。
  *           
  */