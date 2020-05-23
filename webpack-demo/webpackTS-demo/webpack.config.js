module.exports = {
  devtool:false, // 将源代码翻译出来,而不是eval的方式
  mode:'development',
  entry:{
    app:'./src/app.ts'
  },
  output:{
    filename:'[name].bundle.js'
  },
  module:{
      rules:[
        {
          test:/\.tsx?$/,
          use:{
            loader: 'ts-loader'
          }
        }
      ]
  }
}