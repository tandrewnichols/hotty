const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    client: './lib/client'
  },
  devServer: {
    port: 9000,
    contentBase: '/dist/',
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3131',
      '/socket': {
        target: 'ws://localhost:3131',
        ws: true
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].hotty.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};
