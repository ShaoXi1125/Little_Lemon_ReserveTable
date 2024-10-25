const path = require('path');

module.exports = {
  entry: './src/index.js', // 项目入口文件
  output: {
    filename: 'bundle.js', // 输出的文件名
    path: path.resolve(__dirname, 'dist'), // 输出的路径（dist 文件夹）
    clean: true, // 在生成新文件之前清理 /dist 文件夹
  },
  mode: 'development', // 开发模式
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 匹配 JS 和 JSX 文件
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          loader: 'babel-loader', // 使用 Babel 加载器
        },
      },
      {
        test: /\.css$/, // 处理 CSS 文件
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 处理图片文件
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 解析文件扩展名
  },
  devtool: 'source-map', // 生成 source map，便于调试
};
