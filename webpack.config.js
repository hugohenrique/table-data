module.exports = {
  entry: ['./src/index.js'],
  output: {
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
