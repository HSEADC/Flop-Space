import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchBar from './react-components/SearchBar.jsx';

import "./style.scss";
import "./utils/scroll.js";
import "./stylesheets/components/search-bar.js";
import "./stylesheets/components/topic-list.js";

import "./utils/import-icons.js";

import "./utils/create-cards.js";
import "./utils/сreate-topics.js";

import "./utils/test.js";

import "./utils/router.js";

import "./utils/swiper-config.js"

// Монтируем SearchBar в контейнер с id="search-bar-react"
const searchBarContainer = document.getElementById('search-bar');
if (searchBarContainer) {
  const root = createRoot(searchBarContainer);
  root.render(<SearchBar />);
}

console.log('Всё работает и слава тебе господи');
