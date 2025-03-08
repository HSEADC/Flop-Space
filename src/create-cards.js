import cardsData from './content.json'; // Импортируем данные из JSON

// Функция для создания карточки
function createCard(card) {
  let cardElement = document.createElement('div');
  cardElement.classList.add('article-card');

  let imagePath = require(`./images/${card.image}`);
  let avatarPath = card.avatar ? require(`./images/${card.avatar}`) : '';

  // Генерация разметки для дефолтной карточки
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

  // Генерация разметки для медиумной карточки
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

  return cardElement;
}

// Функция для добавления карточек в контейнер с учётом позиции
function renderCards(cards) {
  const feedContainer = document.querySelector('.layout__feed');
  let currentBlock = null;

  if (feedContainer) {
    // Сортируем карточки по позиции
    cards.sort((a, b) => a.position - b.position);

    cards.forEach(card => {
      // Если это медиумная карточка, добавляем новый блок с двумя карточками, если необходимо
      if (card.type === 'card-medium') {
        if (!currentBlock || currentBlock.children.length >= 2) {
          currentBlock = document.createElement('div');
          currentBlock.classList.add('article-block');
          feedContainer.appendChild(currentBlock);
        }
      }

      // Создаём карточку и добавляем её в текущий блок или в контейнер
      const cardElement = createCard(card);
      if (card.type === 'card-medium') {
        currentBlock.appendChild(cardElement);  // Добавляем медиумную карточку в блок
      } else {
        feedContainer.appendChild(cardElement);  // Добавляем дефолтную карточку в контейнер
      }
    });
  } else {
    console.error('Контейнер .layout__feed не найден на странице');
  }
}

// Ожидаем загрузки DOM, чтобы запустить рендеринг карточек
document.addEventListener('DOMContentLoaded', () => {
  renderCards(cardsData); // Запуск рендеринга карточек
});