const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    polyfill: 'babel-polyfill',
    app: './app.js',
  },
  context: path.resolve(__dirname, 'src'),
  devServer: {
    publicPath: '/',
    port: 9000,
    contentBase: path.join(process.cwd(), 'dist'),
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [precss, autoprefixer],
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|otf|woff|woff2|svg)$/,
        loader: 'file-loader',
        query: {
          outputPath: './css/fonts/',
          publicPath: (url) => `./../css/fonts/${url}`,
          name: '[name].[hash].[ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
        query: {
          outputPath: './images/',
          name: '[name].[hash].[ext]',
        },
      },
      {
        type: 'javascript/auto',
        test: /\.(json)/,
        loader: 'file-loader',
        query: {
          outputPath: './data/',
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  mode: 'development',
};
