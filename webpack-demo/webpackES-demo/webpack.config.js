module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry:{
    app:'./app.js'
  },
  output:{
    filename: '[name].[hash:8].js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use: {
          loader:'babel-loader',
          options:{
            presets: [
              ['@babel/preset-env',{
                targets:{
                  browsers:['last 10 versions']
                }
              }]
            ] // 指定presets
          },
        },
        exclude:'/node_modules'   
      }
    ]
  }
}