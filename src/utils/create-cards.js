import cardsData from '../data/content.json'; // Импортируем данные из JSON как массив cardsData

function createCard(card) {
  let cardElement = document.createElement('div');  // Cоздаем div с классом article-card и обработчиком клика, ожидаем передачу в переменную cardElement разметки
  cardElement.classList.add('article-card');
  cardElement.addEventListener('click', () => {
    window.location.href = `${card.pagelink}`; 
});

  let imagePath = require(`../images/${card.image}`);
  let avatarPath = card.avatar ? require(`../images/${card.avatar}`) : '';

  // Заполняем article-card разметкой в зависимости от того, что пришло в аргумент card

  // Если пришла card-default
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

  // Если пришла card-medium
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

  return cardElement; // Передаём разметку в переменную cardElement, после этого результат createCard передаётся в константу cardElement
}

// Аргумент cards принимает массив сardsData как только renderCards вызвана в конце 
function renderCards(cards) {
  const feedContainer = document.querySelector('.layout__feed');
  let currentBlock = null;

  // Следующий блок выполняется только, если контейнер = layout__feed

  if (feedContainer) {
    cards.sort((a, b) => a.position - b.position); // Сортируем по position из json

    // Достаем из массива cardData одну карточку и передаём данные из нее в аргумент card
    cards.forEach(card => {                   
      if (card.type === 'card-medium') {
        if (!currentBlock || currentBlock.children.length >= 2) {
          currentBlock = document.createElement('div');
          currentBlock.classList.add('article-block');
          feedContainer.appendChild(currentBlock); // Если есть хотя бы одна карточка medium, а контейнер article-block не создан, либо cоздан и уже содержит 2 карточки, то создаем новый article-block
        }
      }

      const cardElement = createCard(card);  // Константа cardElement = результат createCard (в верху скрипта) с аргументом card

      if (card.type === 'card-medium') {
        currentBlock.appendChild(cardElement); // Если карточка medium, кидаем cодержимое cardElement в article-block
      } else {
        feedContainer.appendChild(cardElement); // Если карточка default, кидаем cодержимое cardElement в layout__feed
      }
    });

  } else {
    console.error('Контейнер .layout__feed не найден на странице'); // Если главный контейнер не найден, выдаём ошибку
  }
}

// Проверяем на загрузку DOM и index.html (рендерим карточки только на ней), при успехе вызываем renderCards
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) { 
    renderCards(cardsData); 
  }
});