const HtmlWebpackPlugin = require('html-webpack-plugin');

// Массив с описанием страниц
const pages = [
  { template: './src/index.html', filename: './index.html' },
  { template: './src/pages/placeholder.html', filename: './placeholder.html' },
  { template: './src/pages/cases.html', filename: './cases.html' },
  { template: './src/pages/fav.html', filename: './fav.html' },
  { template: './src/pages/network.html', filename: './network.html' },
  { template: './src/pages/podcasts.html', filename: './podcasts.html' },
  { template: './src/pages/videos.html', filename: './videos.html' },
  { template: './src/pages/tests.html', filename: './tests.html' },
  { template: './src/pages/article_blue_tomato.html', filename: './article_blue_tomato.html' }
];

// Генерация плагинов для каждой страницы
module.exports = pages.map(page => new HtmlWebpackPlugin({
  template: page.template,
  filename: page.filename
}));