const { output } = require("./webpack.config");
const { resolve } = require("path");
const webpackConfig = require("./webpack.config");
const webpack = require("webpack");

/**
 * 单独打包第三方库： jQuery、react、vue库
 */
module.exports = {
  entry:{
    // 最终打包的[name] --> jQuery
    // ['jquery']  --> 要打包的库是 jquery
    jquery : ['jquery'],
  },
  output:
  {
    filename:'[name].js',
    path:resolve(__dirname,'dll'),
    library:'[name]_[hash:10]'  // 打包的库里面向外暴露出去的内容叫什么
  },
  plugins:[
    // 打包生成一个manifest.json --> 提供jquery映射
    new webpack.DllPlugin({
      name:'[name]_[hash:8]',   // 映射库的暴露的内容名称
      path: resolve(__dirname,'dll/manifest.json')  // 输出文件路径
    })
  ],
  mode:'production'
}