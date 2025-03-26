import testData from '../data/test-data.json';

let currentQuestionIndex = 0;
let selectedAnswerIndex = null;
const totalQuestions = testData.questions.length;
let correctAnswers = 0; // Переменная для подсчёта правильных ответов

document.addEventListener('DOMContentLoaded', () => {
  const questionElement = document.querySelector('.test-widget__info h1');
  const descriptionElement = document.querySelector('.test-widget__info p');
  const optionsElement = document.querySelector('.test-widget__options');
  const nextButton = document.querySelector('.button--unactive');
  const prevButton = document.querySelector('.button--primary');
  const testWidget = document.querySelector('.test-widget');
  const counterElement = document.querySelector('.test-widget__counter');

  // Проверяем, что все элементы найдены
  if (!questionElement || !descriptionElement || !optionsElement || !nextButton || !prevButton || !testWidget || !counterElement) {
    console.error('Не все элементы DOM были найдены');
    return;
  }

  // Инициализация
  updateQuestion();

  // Функция для обновления вопроса
// Функция для обновления вопроса
function updateQuestion() {
    const currentQuestion = testData.questions[currentQuestionIndex];
  
    // Обновляем заголовок и описание
    questionElement.textContent = currentQuestion.title;
    descriptionElement.textContent = currentQuestion.description;
  
    // Обновляем счётчик с нужными стилями
    counterElement.innerHTML = `
      <span class="typography__header2">${currentQuestionIndex + 1} /&nbsp</span> 
      <span class="typography__header2 typography--muted">${totalQuestions}</span>
    `;
  
    // Обновляем варианты ответов
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.classList.add('test-widget__option');
      li.classList.add('typography--muted');  // Добавляем класс typography--muted
      li.classList.add('typography__body2'); // Добавляем класс typography__body2
      li.textContent = option;
      li.dataset.index = index;
  
      // Если вариант выбран, добавляем активный класс
      if (index === selectedAnswerIndex) {
        li.classList.add('test-widget__option--highlighted');
      }
  
      li.addEventListener('click', () => selectAnswer(index, li));
      optionsElement.appendChild(li);
    });
  
    // Обновляем кнопки
    updateButtons();
  }

  // Функция для обновления кнопок
function updateButtons() {
    const backButton = prevButton; // Уже определено выше
    const nextButton = nextButton; // Уже определено выше
  
    // Проверка на наличие кнопок перед выполнением
    if (!backButton || !nextButton) {
      console.error('Кнопки не найдены!');
      return;
    }
  
    // Проверяем, есть ли выбранный вариант
    const selectedOption = document.querySelector('.test-widget__option--highlighted');
  
    // Если выбран вариант, активируем кнопку "Следующий вопрос"
    if (selectedOption) {
      nextButton.classList.remove('button--unactive');
      nextButton.classList.add('button--accent');
      nextButton.removeEventListener('click', preventNext);  // Убираем предыдущее блокирование
      nextButton.addEventListener('click', goToNextQuestion); // Активируем переход
    } else {
      nextButton.classList.add('button--unactive');
      nextButton.classList.remove('button--accent');
      nextButton.removeEventListener('click', goToNextQuestion); // Убираем переход
      nextButton.addEventListener('click', preventNext); // Добавляем блокировку
    }
  
    // Если это первый вопрос, кнопка "Назад" имеет только класс button--unactive
    if (currentQuestionIndex === 0) {
      backButton.classList.add('button--unactive');
      backButton.classList.remove('button--primary');
    } else {
      backButton.classList.remove('button--unactive');
      backButton.classList.add('button--primary');
    }
  }
  
  // Функция для блокировки клика по кнопке "Следующий вопрос"
  function preventNext(event) {
    event.preventDefault();  // Отменяет действие по умолчанию (переход к следующему вопросу)
    event.stopPropagation(); // Останавливает дальнейшее распространение события
  }
  

  // Функция для выбора ответа
  function selectAnswer(index, li) {
    const options = optionsElement.querySelectorAll('.test-widget__option');
    
    // Убираем выделение с предыдущего выбранного варианта
    const previousSelected = optionsElement.querySelector('.test-widget__option--highlighted');
    if (previousSelected) {
      previousSelected.classList.remove('test-widget__option--highlighted');
    }

    // Добавляем выделение на новый вариант
    li.classList.add('test-widget__option--highlighted');
    selectedAnswerIndex = index;

    // Активируем кнопку "Следующий вопрос"
    nextButton.classList.remove('button--unactive');
    nextButton.classList.add('button--accent');
  }

  // Функция для перехода к следующему вопросу
  function goToNextQuestion() {
    const currentQuestion = testData.questions[currentQuestionIndex];
    const selectedOption = document.querySelector('.test-widget__option--highlighted');
    
    // Проверка на правильность ответа (если есть правильный ответ в данных)
    if (selectedOption && selectedOption.dataset.index == currentQuestion.correctAnswerIndex) {
      correctAnswers++;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++;
      selectedAnswerIndex = null; // Сбросить выбранный ответ
      nextButton.classList.add('button--unactive');
      nextButton.classList.remove('button--accent');
      updateQuestion();
    } else {
      showResult(); // Показать результаты на последнем вопросе
    }
  }

  // Функция для возвращения к предыдущему вопросу
  function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      selectedAnswerIndex = null; // Сбросить выбранный ответ
      nextButton.classList.add('button--unactive');
      nextButton.classList.remove('button--accent');
      updateQuestion();
    }
  }

  // Функция для отображения результатов теста
  function showResult() {
    testWidget.innerHTML = `<h1>Результаты теста</h1><p>Вы ответили правильно на ${correctAnswers} из ${totalQuestions} вопросов.</p>`;
  }

  // Обработчики событий для кнопок
  nextButton.addEventListener('click', goToNextQuestion);
  prevButton.addEventListener('click', goToPreviousQuestion);
});
