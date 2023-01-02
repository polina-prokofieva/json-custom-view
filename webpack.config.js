const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const devtool = devMode ? 'source-map' : undefined;

const entry = devMode
  ? path.resolve(__dirname, './', 'main.js')
  : path.resolve(__dirname, 'src', 'api.js');

const plugins = devMode
  ? [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './', 'index.html'),
      }),
    ]
  : [];

const loaders = [
  {
    test: /\.less$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[local]--[hash:base64:5]',
          },
        },
      },
      'less-loader',
    ],
    exclude: /node_modules/,
  },
  {
    test: /\.js/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
];

if (devMode) {
  loaders.unshift({
    test: /\.html$/i,
    loader: 'html-loader',
  });
}

const outputFile = devMode ? '[name][contenthash].js' : 'api.js';
const target = devMode ? 'web' : 'browserslist';

module.exports = {
  mode,
  devtool,
  target,
  entry: {
    app: entry,
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: outputFile,
    clean: true,
    library: {
      type: 'module',
    },
    chunkFormat: 'commonjs',
  },

  devServer: {
    open: true,
    hot: false,
  },

  experiments: {
    outputModule: true,
  },

  plugins,

  module: {
    rules: loaders,
  },
};
