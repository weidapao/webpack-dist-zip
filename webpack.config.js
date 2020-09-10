const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('lib'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          { loader: 'eslint-loader' }
        ],
      },
    ],
  },
  mode: 'production',
  target: 'node',
}
