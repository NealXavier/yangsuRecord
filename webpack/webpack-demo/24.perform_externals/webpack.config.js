const {resolve} = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimiziCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')


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
    filename:'js/built.js',
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

      {
        test:/\.js$/,
        exclude:/node_modules/,
        // 去.eslintrc文件找eslint风格规范
        loader:'eslint-loader',
        // 优先执行
        enforce:'pre',
        options:{
          fix:true // 自动检查
        }
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:[
          /**
           * 开启多进程打包。
           * 进程 启动大概需要600ms。进程通信也需要开销
           * 只有js构建时间够长才有必要用，不然效果不明显。
           */
          {
            loader:'thread-loader',
            options:{
              wordkers:2 // 进程2个
            }
          },
          {
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
              ]
            }
          }
        ]
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
      filename:'css/built.css'
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
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 1. 帮助servicework快速启动
       * 2. 删除旧的serviceworker
       * 
       *  生成 serviceworker 配置文件~
       *  
       */
      clientsClaim:true,
      skipWaiting:true
    })
  ],
  // mode设置为production自动压缩js代码
  mode:'production',
  externals:{
    // 拒绝jQuery 被打包进来 
    // 直接直接打包出去之后 jQuery 打印不出来, 这时候第三方哭需要在html里面引入cdn
    jquery: 'jQuery'
  }
}