import cardsData from '../data/content.json';
import topics from '../data/topics.json';

function createCard(card) {
  let cardElement = document.createElement('div');
  cardElement.classList.add('article-card');
  cardElement.setAttribute('data-category', card.category);
  cardElement.addEventListener('click', () => {
    window.location.href = `${card.pagelink}`;
  });

  let imagePath = require(`../images/${card.image}`);
  let avatarPath = card.avatar ? require(`../images/${card.avatar}`) : '';

  if (card.type === 'card-default') {
    cardElement.innerHTML = `
      <div class="article-card__content">
        <div class="author-block">
          <div class="author-block__avatar" style="background-image: url(${avatarPath})"></div>
          <div class="author-block__text-block">
            <p class="typography__caption2">${card.author}</p>
            <p class="typography__caption1 typography--muted">${card.authorTitle}</p>
          </div>
        </div>
        <h1 class="typography__display1 typography--line-limit">${card.title}</h1>
        <p class="typography__body2 typography--muted typography--line-limit">${card.content}</p>
      </div>
      <div class="article-card__image" style="background-image: url(${imagePath})"></div>
    `;
  }

  if (card.type === 'card-medium') {
    cardElement.innerHTML = `
      <div class="article-card__image article-card__image--medium" style="background-image: url(${imagePath})"></div>
      <div class="article-card__content">
        <div class="author-block">
          <div class="author-block__avatar" style="background-image: url(${avatarPath})"></div>
          <div class="author-block__text-block">
            <p class="typography__caption2">${card.author}</p>
            <p class="typography__caption1 typography--muted">${card.authorTitle}</p>
          </div>
        </div>
        <h1 class="typography__header2 typography--line-limit">${card.title}</h1>
        <p class="typography__body1 typography--muted typography--line-limit">${card.content}</p>
      </div>
    `;
  }

  if (card.type === 'card-small') {
    cardElement.classList.add('article-card--small');
    cardElement.innerHTML = `
      <div class="article-card__content">
        <div class="author-block">
          <div class="author-block__avatar" style="background-image: url(${avatarPath})"></div>
          <div class="author-block__text-block">
            <p class="typography__caption2">${card.author}</p>
            <p class="typography__caption1 typography--muted">${card.authorTitle}</p>
          </div>
        </div>
        <p class="typography__body2 typography--line-limit typography--line-limit-5">${card.title}/ ${card.content}</p>
      </div>
    `;
  }

  return cardElement;
}

function renderCards(cards) {
  const feedContainer = document.querySelector('.layout__feed');
  let currentBlock = null;
  let suggestionBlock = null;
  let suggestionRow = null;
  let suggestionCount = 0;
  let currentCategory = '';

  if (feedContainer) {
    cards.sort((a, b) => a.position - b.position);

    cards.forEach(card => {
      if (card.type === 'card-small') {
        if (!suggestionBlock || suggestionCount >= 6 || card.suggestionTitle !== currentCategory) {
          suggestionBlock = document.createElement('div');
          suggestionBlock.classList.add('suggestion-block');
          feedContainer.appendChild(suggestionBlock);

          const title = document.createElement('h1');
          title.textContent = card.suggestionTitle;
          title.classList.add('typography__header1');
          suggestionBlock.appendChild(title);

          suggestionCount = 0;
          currentCategory = card.suggestionTitle;
        }

        if (!suggestionRow || suggestionCount % 3 === 0) {
          suggestionRow = document.createElement('div');
          suggestionRow.classList.add('suggestion-block__row');     
          suggestionBlock.appendChild(suggestionRow);
        }

        const cardElement = createCard(card);
        suggestionRow.appendChild(cardElement);
        suggestionCount++;
      } else {
        if (card.type === 'card-medium') {
          if (!currentBlock || currentBlock.children.length >= 2) {
            currentBlock = document.createElement('div');
            currentBlock.classList.add('article-block');
            feedContainer.appendChild(currentBlock);
          }
        }

        const cardElement = createCard(card);
        if (card.type === 'card-medium') {
          currentBlock.appendChild(cardElement);
        } else {
          feedContainer.appendChild(cardElement);
        }
      }
    });
  } else {
    console.error('Контейнер .layout__feed не найден на странице');
  }
}

export function filterCards(category, categoryTitle) {
  const cards = document.querySelectorAll('.article-card');
  const articleBlocks = document.querySelectorAll('.article-block');
  const suggestionBlocks = document.querySelectorAll('.suggestion-block'); // Добавляем выборку suggestion-block
  const categoryHeader = document.querySelector('.category-header');
  const topicHeader = document.querySelector('.topic-header');
  const topicImage1 = document.querySelector('.topic-header__cover');
  const topicImage2 = document.querySelector('.topic-header__image');

  const feedHeader = document.querySelector('.feed-header');

if (feedHeader) {
  if (category === 'all') {
    feedHeader.style.display = 'block'; // Показываем при выборе "Все"
  } else {
    feedHeader.style.display = 'none'; // Скрываем при выборе конкретного топика
  }
}

  if (topicHeader) {
    if (category === 'all') {
      topicHeader.style.display = 'none'; // Скрываем весь контейнер заголовка
    } else {
      topicHeader.style.display = 'block'; // Показываем весь контейнер заголовка
      categoryHeader.textContent = categoryTitle; // Обновляем текст заголовка

      // Находим текущий топик в данных
      const currentTopic = topics.find(topic => topic.id === category);
      if (currentTopic) {
        const imagePath1 = require(`../images/topics/${currentTopic.image}`);
        const imagePath2 = require(`../images/topics/${currentTopic.image}`);

        topicImage1.style.backgroundImage = `url('${imagePath1}')`;
        topicImage2.style.backgroundImage = `url('${imagePath2}')`;
      }
    }
  }

  if (category === 'all') {
    cards.forEach(card => {
      card.style.display = 'flex'; // Показываем все карточки
    });
  } else {
    cards.forEach(card => {
      if (card.dataset.category === category) {
        card.style.display = 'flex'; // Показываем только нужные
      } else {
        card.style.display = 'none'; // Скрываем остальные
      }
    });
  }

  // Проверяем article-block, остались ли в нем видимые карточки
  articleBlocks.forEach(block => {
    const hasVisibleCards = Array.from(block.children).some(card => card.style.display === 'flex');

    if (!hasVisibleCards) {
      block.style.display = 'none'; // Скрываем пустые article-block
    } else {
      block.style.display = 'flex'; // Показываем, если есть видимые карточки
    }
  });

  // Проверяем suggestion-block, остались ли в нем видимые карточки
  suggestionBlocks.forEach(block => {
    const rows = Array.from(block.querySelectorAll('.suggestion-block__row')); // Ищем все строки в блоке
    let totalCardsInBlock = 0;
  
    rows.forEach(row => { // эта часть пока не работает 
      const cardsInRow = Array.from(row.querySelectorAll('.article-card--small')).filter(card => card.style.display !== 'none'); // Оставляем только видимые карточки
      const visibleCardsInRow = cardsInRow.length; // Количество видимых карточек в ряду
  
      if (visibleCardsInRow === 3) {
        row.style.display = 'flex'; // Показываем строку только если в ней ровно 3 карточки
        totalCardsInBlock += visibleCardsInRow; // Добавляем карточки в общий счётчик
      } else {
        row.style.display = 'none'; // Скрываем строку, если карточек не 3
      }
    });

    // Если количество видимых карточек равно 6 или 3, показываем блок, иначе скрываем
    if (totalCardsInBlock === 6 || totalCardsInBlock === 3) {
      block.style.display = 'flex';
    } else {
      block.style.display = 'none';
    }
  });
}



// Проверяем на загрузку DOM и index.html (рендерим карточки только на ней), при успехе вызываем renderCards
document.addEventListener('DOMContentLoaded', () => {
    renderCards(cardsData); 
});