const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../docs'), // Папка для продакшн сборки
    clean: true // Очистка директории перед каждой сборкой
  }
});