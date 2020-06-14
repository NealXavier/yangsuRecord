const {resolve} = require('path')

module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'./js/built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        /**
         * 语法检查： eslint-loader eslint
         * 注意： 只检查自己写的源代码，第三方的库是不用检查的
         * 设置检查规则 :
         *    package.json 中 eslintConfig 中设置
         *    "eslintConfig": {
         *        "extends":"airbnb-base"
         *    }
         *  airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
         */
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'eslint-loader',
        options:{
          // 自动修复不符合规范的地方
          fix:true
        }
      },
    ]
  },
  mode:'development'
}