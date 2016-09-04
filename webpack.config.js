module.exports = {
  entry: './src/client/index.js',
  output: {
    path: './static',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass'],
      }
    ]
  }

}
