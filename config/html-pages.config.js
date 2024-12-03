const HtmlWebpackPlugin = require('html-webpack-plugin');

// Массив с описанием страниц
const pages = [
  { template: './src/index.html', filename: './index.html' },
  { template: './src/cemetery/cemetery.html', filename: './cemetery.html' },
  { template: './src/advices/advices.html', filename: './advices.html' },
  { template: './src/about/about.html', filename: './about.html' },
  { template: './src/cemetery/articles/about_dead_startup.html', filename: './about_dead_startup.html' }
];

// Генерация плагинов для каждой страницы
module.exports = pages.map(page => new HtmlWebpackPlugin({
  template: page.template,
  filename: page.filename
}));