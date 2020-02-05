const path = require('path')

const serverConfig = {
  context: path.resolve(__dirname, 'src/back-end'),
  entry: './index',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js'
  },
  target: 'node',
  node: {
    __dirname: false
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  }
}

module.exports = [serverConfig]