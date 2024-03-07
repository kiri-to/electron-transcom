const path = require('path');
const autoprefixer = require('autoprefixer');
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
        test: /\.(scss)$/i,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      },
    ],
  },
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