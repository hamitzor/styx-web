const path = require("path")

const clientConfig = {
  context: path.resolve(__dirname, "src/front-end/js"),
  entry: "./index",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "src/front-end/public/min.js"),
    filename: "client.bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}

const serverConfig = {
  context: path.resolve(__dirname, "src/back-end"),
  entry: "./index",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.bundle.js"
  },
  target: "node",
  node: {
    __dirname: false
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}

module.exports = [clientConfig, serverConfig]