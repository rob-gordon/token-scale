const CleanWebpackPlugin = require('clean-webpack-plugin');
const deepmerge = require('deepmerge');
const path = require('path');

const defaultSettings = {
  entry: './src/index.js',
  output: {
    library: 'CoreLayout',
    libraryTarget: 'umd',
    filename: 'CoreLayout.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

const serverConfig = deepmerge(defaultSettings, {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'CoreLayout.node.js'
  }
});

const clientConfig = deepmerge(defaultSettings, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'CoreLayout.js'
  }
});

module.exports = [serverConfig, clientConfig];
