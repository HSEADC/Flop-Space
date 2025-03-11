const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const path = require('path');

const partials = [
  { 
    path: path.join(__dirname, '../src/partials/header.html'),
    location: 'header', 
    template_filename: '*', 
  },
  { 
    path: path.join(__dirname, '../src/partials/navigation.html'),
    location: 'navigation', 
    template_filename: '*', 
  },
  { 
    path: path.join(__dirname, '../src/partials/mobile-navigation.html'),
    location: 'mobile-navigation', 
    template_filename: '*', 
  },
];

module.exports = partials.map(partial => new HtmlWebpackPartialsPlugin({
  path: partial.path,
  location: partial.location,
  template_filename: partial.template_filename,
  priority: 'replace', 
}));