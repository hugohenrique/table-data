module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      presets: ['es2015', 'react']
    }]
  },
  output: {
    library: 'table-data',
    libraryTarget: 'umd'
  }
};