const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const devtool = devMode ? 'source-map' : underfined;

module.exports = {
  mode,
  devtool,
  entry: path.resolve(__dirname, 'src', 'api.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'api.js',
    clean: true,
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
