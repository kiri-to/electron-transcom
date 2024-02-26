const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // mode: "production",
  mode: "development",
  entry: './src/renderer.js',
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // resolve: {
  //   alias: {           //alias配置作用于导入语句如import，此处不生效
  //     'wasm': path.resolve(__dirname, 'node_modules/scichart/_wasm/'),
  //   }
  // }, 
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/index.html", to: "" },
        { from: "src/main.js", to: "" },
        { from: "src/preload.js", to: "" },
        { from: "src/worker.js", to: "" },
        { from: "dll/raw/raw.dll", to: ""},
        { from: "dll/liquid/liquid.dll", to: ""},
        { from: "dll/liquid/libfftw3f-3.dll", to: ""},
        { from: "dll/Transcom/TransComApi.dll", to: ""},
        { from: "node_modules/scichart/_wasm/scichart2d.data", to: "" },
        { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" },
      ],
    })
  ]
};