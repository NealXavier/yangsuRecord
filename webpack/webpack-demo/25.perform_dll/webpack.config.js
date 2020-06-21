const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 告诉webpack哪些库不需要参与打包，同时使用时的名称也得变~
    new Webpack.DllReferencePlugin({
      manifest:resolve(__dirname,'dll/manifest.json')
    }),
    // 将某个文件打包输出出去，并在html中自动引入该资源文件
    new AddAssetHtmlWebpackPlugin({
      // 'dll/jquery.js'记得写文件类型，不然会提示找不到文件。
      filepath:resolve(__dirname,'dll/jquery.js')
    })
  ],
  mode: 'production'
};

/**
 *  单独打包某些文件，形成独立的chunk， 这样就不用重复打包
 *  dll: 
 *      和 externals 一样，都是为了把第三方库独立打包出来。
 *       这样就可以避免重复打包，提高构建的效率。
 *       而externals 是通过手工在html引入cdn的方式，使其可以使用该第三方库。
 *        而dll则更高级一点：是使用配置文件 webpack.dll.js 将其打包到具体的文件路径，并提供了映射地址。避免重复打包。
 *        然后需要使用该库时，就利用插件的方式动态注入到html上，使其可以使用。  
 *  
 */