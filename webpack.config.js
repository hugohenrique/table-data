module.exports = {
  entry: __dirname + '/src',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test    : /\.js$/,
        use     : ['babel-loader'],
        exclude : /node_modules/
      }
    ]
  }
};
