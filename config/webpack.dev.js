const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, '../dev_build'), // Исправленный путь
    hot: true, // Включает горячую замену модулей (HMR)
    open: true, // Автооткрытие браузера
    port: 3000, // Указываем порт
    historyApiFallback: true, // Для поддержки роутинга (SPA)
    devMiddleware: {
      writeToDisk: true, // Записывать файлы в dev_build/
    }
  },
  output: {
    filename: '[name].js', // Убрали contenthash для dev-режима
    path: path.resolve(__dirname, '../dev_build'), // Совпадает с devServer.static
    clean: true
  }
});


