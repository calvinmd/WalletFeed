const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');


const config = {
  mode: 'development',
  entry: {
    main: [
      'webpack-dev-server/client?http://0.0.0.0:8080/',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, './src/main.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    chunkFilename: "[name].[id].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /-test\.(js|jsx)/],
        query: {
          presets: ['@babel/preset-env']
        },
      },
      {
        test: /\.(css|scss|less|sass)$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(json)$/,
        loader: 'json-loader',
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './src/index.html'), inject: true }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve('src')
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    headers: { "Access-Control-Allow-Origin": "*" },
    port: 8080,
    public: '0.0.0.0',
  },
  devtool: '#eval-source-map',
};

module.exports = config;
