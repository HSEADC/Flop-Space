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
  { template: './src/pages/articles/article_theranos.html', filename: './article_theranos.html' },
  { template: './src/pages/articles/article_juicero.html', filename: './article_juicero.html' },
  { template: './src/pages/articles/article_quibi.html', filename: './article_quibi.html' },
  { template: './src/pages/videos/video_1.html', filename: './video_1.html' },
  { template: './src/pages/videos/video_2.html', filename: './video_2.html' }
];

// Генерация плагинов для каждой страницы
module.exports = pages.map(page => new HtmlWebpackPlugin({
  template: page.template,
  filename: page.filename,
  favicon: './src/images/favicon.ico', // Указываем путь к фавиконке
  meta: {
    'og:image': { property: 'og:image', content: '/images/meta.jpg' }
  }
}));