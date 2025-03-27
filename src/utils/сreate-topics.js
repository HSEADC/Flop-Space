import { filterCards } from './create-cards.js';
import topics from '../data/topics.json';

function createTopic(topic) {
    let topicElement = document.createElement('div');
    topicElement.classList.add('topic-list__item');

    topicElement.addEventListener('click', (event) => {
        event.preventDefault(); // Отменяем стандартный переход
        filterCards(topic.id, topic.title); // Фильтруем карточки по категории
    });

    let imagePath = require(`../images/topics/${topic.image}`);

    topicElement.innerHTML = `
    <div class="topic-list__image" style="background-image: url('${imagePath}')"></div>
    <p class="typography__subheader1"> ${topic.title} </p>
    `;

    return topicElement; 
}

function renderTopics(topics) {
    const topicsContainer = document.querySelector('.topic-list');

    if (topicsContainer) {

        topics.sort((a, b) => a.position - b.position);

        topics.forEach(topic => {

            const topicElement = createTopic(topic);

            topicsContainer.appendChild(topicElement);
            
        });

    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderTopics(topics);
})