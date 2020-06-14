const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'./js/built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        /**
         *  需要下载的安装包
         *  babel-loader @babel/core @babel/preset-env @babel/polyfill core-js 
         * 
         *  1.基本兼容性处理-> @babel/preset-env
         *      问题：只能转换基本语法，但promise不能转换
         *  2.全部js兼容性处理： -->@babel/polyfill（方案已被抛弃）
         *      问题：只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大。
         *  3.需要兼容性处理的就做: 按需加载 --> core-js
         */
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          // 预设：提示babel做怎么样的兼容性处理
          presets:[
            [
              '@babel/preset-env',
            {
              // 按需加载
              useBuiltIns:'usage',
              // 指定code-js版本
              // 把corejs写成codejs，
              // 报错 ： ERROR in ./src/js/index.js Module not found: Error: Can't resolve 'core-js/modules/es6.promise'
              corejs:{
                version:3,
              },
              // 指定兼容性做到哪个版本浏览器
              targets:{
                chrome:'60',
                firefox:'60',
                ie:'9',
                safari:'10',
                edge:'17'
              }
            }
            ]
          ]
        }
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development'
}