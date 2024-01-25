const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/renderer.js',
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
        patterns: [
            { from: "src/index.html", to: "" },
            { from: "src/index.css", to: "" },
            { from: "src/main.js", to: "" },
            { from: "src/preload.js", to: "" },
            { from: "node_modules/scichart/_wasm/scichart2d.data", to: "" },
            { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" },
          ],
    })
  ]
};