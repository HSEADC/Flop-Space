<<<<<<< HEAD
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
=======
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
<<<<<<< HEAD
    filename: '[name].[contenthash].js',
=======
    filename: '[name].js',
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18
    path: path.resolve(__dirname, 'docs'),
    clean: true
  },
  module: {
    rules: [
      {
<<<<<<< HEAD
        test: /\.jsx?$/,
=======
        test: /\.(js|jsx)$/i,
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
<<<<<<< HEAD
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
=======
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
<<<<<<< HEAD
          }
=======
          },
          'sass-loader'
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
<<<<<<< HEAD
        test: /\.png/,
=======
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
<<<<<<< HEAD
        test: /\.svg/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf)$/i,
=======
        test: /\.(ttf|otf|woff|woff2)$/i,
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
<<<<<<< HEAD
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    // Index
=======
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    // Landing page
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),

<<<<<<< HEAD
    // Cemetery
    new HtmlWebpackPlugin({
      template: './src/cemetery/cemetery.html',
      filename: './cemetery/cemetery.html'
    }),

    // Advices 
    new HtmlWebpackPlugin({
      template: './src/advices/advices.html',
      filename: './advices/advices.html'
    }),

    // Team Search
    new HtmlWebpackPlugin({
      template: './src/team/team.html',
      filename: './team/team.html'
    }),

    // Article
    new HtmlWebpackPlugin({
          template: './src/cemetery/articles/about_dead_startup.html',
          filename: './cemetery/articles/about_dead_startup.html'
     }),

    // Partials
     new HtmlWebpackPartialsPlugin([
       {
         path: path.join(__dirname, './src/partials/analytics.html'),
         location: 'analytics',
         template_filename: '*',
         priority: 'replace'
       }
     ])
=======
    // Internal pages
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   scriptLoading: 'blocking',
    //   template: './src/pages/page.html',
    //   filename: './pages/page.html',
    //   chunks: ['page']
    // }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ])
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18
