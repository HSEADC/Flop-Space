const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const path = require('path');

// Массив с описанием partials
const partials = [
  { 
    path: path.join(__dirname, '../src/partials/navigation.html'),
    location: 'navigation', // Место в HTML, куда вставляется partial
    template_filename: '*', // Подключать к каждому HTML-файлу
  },
  { 
    path: path.join(__dirname, '../src/partials/footer.html'),
    location: 'footer', // Место в HTML, куда вставляется partial
    template_filename: '*', // Подключать к каждому HTML-файлу
  },
  { 
    path: path.join(__dirname, '../src/partials/analytics.html'),
    location: 'analytics', 
    template_filename: '*',
  }
];

// Генерация плагинов для каждого partial
module.exports = partials.map(partial => new HtmlWebpackPartialsPlugin({
  path: partial.path,
  location: partial.location,
  template_filename: partial.template_filename,
  priority: 'replace', // Опционально, для контроля приоритетов
}));