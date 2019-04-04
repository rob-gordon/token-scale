const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: "./src/TokenScale.js",
  output: {
    library: "TokenScale",
    libraryTarget: "umd",
    filename: "TokenScale.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
],
};
