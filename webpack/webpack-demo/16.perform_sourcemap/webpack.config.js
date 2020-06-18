/*
  HMR: hot module replacement 热模块替换 / 模块热替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块） 
      极大提升构建速度
      
      样式文件：可以使用HMR功能：因为style-loader内部实现了~
      js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。
      html文件: 默认不能使用HMR功能.同时会导致问题：html文件不能热更新了~ （不用做HMR功能，因为只有一个html文件（虽然我也没懂））
        解决：修改entry入口，将html文件引入
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader的配置
      {
        // 处理less资源
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭es6模块化
          esModule: false,
          outputPath: 'imgs'
        }
      },
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        // 处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    // plugins的配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 事实证明,如果不加上下面一行,将会导致没办法自动刷新，没有Live Reloading enabled的功能
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 8080,
    open: true,
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
    hot: true,
  },
  devtool:'eval-source-map'
};

// 在执行dev-server 时出现了个小插曲， 
// 错误： ERROR in Entry module not found: Error: Can't resolve './src' in 'E:\yangsuRecord\webpack\webpack-demo'
// 死活找不到 src目录，也就是检查不到 webpack.config.js 文件，原来是我的目录切错了，切到了根目录

/**
 * source-map:一种提供源代码到构建后代码映射技术（如果构建后代码出错了，
 *            通过映射可以追踪源代码错误）
 * 
 * [inline-|hidden-|eval|-][nosources-][cheap-[module-]] source-map
 * 
 * // 但是请注意，dev-server的话是不会生成构建文件的
 * 
 * 内联和外部的区别：1.使用webpack命令是会另外生成文件([entry].[ext].map)，外部生成了文件,内联没有 2.内联构建速度更快
 * 但是内联构建文件会更大，生产环境不需要
 * 
 * source-map:外部
 *    错误代码准确信息 和 源代码的错误位置
 * inline-source-map: 内联
 *   只生成一个内联: source-map
 *   错误代码准确信息 和 源代码的错误位置
 * hidden-source-map : 外部
 *   错误代码错误原因，但是没有错误位置
 *   不能追踪源代码错误，只能提示到构建后代码的错误位置  
 *   （报错提示不是源代码的地方，只是编译后代码的地方。）
 *       
 * eval-source-map : 内联
 *   特点： 在提示列数之前有个hash值
 *   每一个文件都生成对应的: source-map,在built.js 搜索sourceURL就能搜到
 *   错误代码准确信息 和 源代码的错误位置
 * nosources-source-map : 外部
 *  正确提示了源代码报错的行数，但是点进去完全找不到
 * cheap-source-map :外部
 *  正确提示了报错的行数，但没有精确到列
 * cheap-module-source-map : 外部
 *  正确提示了报错的行数，但没有精确到列
 *  module会将loader的 source map 加入
 *   
 * 开发环境： 速度快，调试更友好
 *    速度快（eval > inline > cheap > ....）
 *      eval-cheap-source-map  
 *      eval-source-map        
 *    调试更友好
 *       source-map
 *       cheap-module-source-map
 *       cheap-source-map
 *    --> eval-source-map / eval-cheap-module-source-map 
 *        (react和vue脚手架)
 * 生产环境： 源代码要不要隐藏？调试要不要更友好
 *     内联会让代码体积更大，所以不用内联
 *    nosources-source-map  全部隐藏    
 *    hidden-source-map 只隐藏源代码，会提示构建后代码
 *   --  source-map /  cheap-module-source-map 
 *       (对调试友好)
 *        
 */ 
