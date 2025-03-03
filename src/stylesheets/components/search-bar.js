document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("search-bar__input-field");
    const measurer = document.getElementById("search-bar__text-measurer");
    const container = document.getElementById("search-bar");

    if (!input || !measurer || !container) {
        console.error("Ошибка: Один из элементов (input, measurer, container) не найден!");
        return;
    }

    // Функция обновления ширины инпута
    function adjustWidth() {
        measurer.textContent = input.value || input.placeholder;
        input.style.width = `${measurer.offsetWidth + 20}px`; // Запас в 20px
    }

    // Функция активации ввода (убирает hover)
    function activateInput() {
        container.classList.add("search-bar--active");
    }

    // Функция деактивации (если поле пустое)
    function deactivateInput() {
        if (input.value.trim() === "") {
            container.classList.remove("search-bar--active"); // Убираем модификатор
        }
    }

    // Навешиваем обработчики
    container.addEventListener("click", () => input.focus());
    input.addEventListener("input", adjustWidth);
    input.addEventListener("focus", activateInput);
    input.addEventListener("blur", deactivateInput);

    // Инициализация ширины
    adjustWidth();
});