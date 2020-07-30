const path = require('path')
module.exports={
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  },
  module:{
    rules: [
      {
        //1.css-loader只负责将css文件加载，不负责解析
        //2.style-loader负责将样式渲染到DOM中
        //3.使用多个loader时，是从右向左加载的，需要注意顺序
        test: /\.css$/i,
        use: ['style-loader','css-loader']
      },
    ],
  }
}