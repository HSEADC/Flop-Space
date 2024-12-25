const HtmlWebpackPlugin = require('html-webpack-plugin');

// Массив с описанием страниц
const pages = [
  { template: './src/index.html', filename: './index.html' },
  { template: './src/cases/cases.html', filename: './cases.html' },
  { template: './src/styleguide/styleguide.html', filename: './styleguide.html' },
  { template: './src/tests/tests.html', filename: './tests.html' },
  { template: './src/media/media.html', filename: './media.html' },
  { template: './src/about/about.html', filename: './about.html' },
  { template: './src/media/articles/about_dead_startup.html', filename: './about_dead_startup.html' }
];

// Генерация плагинов для каждой страницы
module.exports = pages.map(page => new HtmlWebpackPlugin({
  template: page.template,
  filename: page.filename
}));