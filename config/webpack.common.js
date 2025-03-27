const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const path = require('path');
const htmlPagesConfig = require('./html-pages.config');
const htmlPartialsConfig = require('./partials.config');
const loader = require('sass-loader');
const htmlPages = htmlPagesConfig;  // Подключение файла с настройками страниц
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: './', 
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Объединено правило для js и jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
            cacheDirectory: true // Включен кеш для ускорения сборки
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] // Для SCSS
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          }
        ] // Убрали лишний sass-loader
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader', // штука для работы со спрайтами иконок
            options: {
              extract: false, 
              spriteFilename: 'sprite.svg', 
            }
          },
          {
            loader: 'svgo-loader',
      options: {
        plugins: [
          { name: 'removeAttrs', params: { attrs: ['fill', 'stroke'] } } // удаляет дефолтные атрибуты иконок для изменения в CSS
        ]
            }
          }
        ]
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][hash][ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].[contenthash].css'
    }),
    ...htmlPages, // Подключение всех страниц через массив из html-pages.config.js
    ...htmlPartialsConfig, // Подключение Partials
    new SpriteLoaderPlugin(),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()] // Минификация CSS
  }
};