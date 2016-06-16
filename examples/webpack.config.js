module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'table-data': '../src'
    }
  },
  module: {
    loaders: [
      {
        test    : /\.js$/,
        exclude : /node_modules/,
        loader  : 'babel-loader',
        presets : ['es2015', 'react']
      }
    ]
  }
};