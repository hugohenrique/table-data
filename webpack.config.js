const path = require('path');

module.exports = {
  entry: [path.join(__dirname, 'src/index.js')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'table-data',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
