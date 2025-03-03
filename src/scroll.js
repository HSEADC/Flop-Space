/* document.addEventListener("wheel", function (event) {
  const scrollable = document.querySelector(".layout__feed");
  if (!scrollable) return;

  event.preventDefault(); // Предотвращаем стандартный скролл

  // Проверяем, можно ли скроллить
  const canScrollDown = scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight;
  const canScrollUp = scrollable.scrollTop > 0;

  // Если контейнер можно скроллить, ускоряем пропорционально силе прокрутки
  if (canScrollDown || canScrollUp) {
      let speedFactor = Math.abs(event.deltaY) / 30; // Чем сильнее прокрутка, тем больше шаг
      scrollable.scrollTop += event.deltaY * speedFactor; // Без smooth
  }

  
}, { passive: true });
*/

  // Создаём кастомный скроллбар
const scrollbar = document.createElement("div");
scrollbar.classList.add("custom-scrollbar");
const thumb = document.createElement("div");
thumb.classList.add("custom-scrollbar-thumb");
scrollbar.appendChild(thumb);
document.body.appendChild(scrollbar);

// Находим основной контейнер со скроллом
const scrollable = document.querySelector(".layout__feed");

function updateCustomScrollbar() {
  if (!scrollable) return;
  
  const scrollHeight = scrollable.scrollHeight - scrollable.clientHeight;
  const scrollProgress = scrollable.scrollTop / scrollHeight;
  
  // Двигаем индикатор
  const thumbHeight = Math.max(50, (scrollable.clientHeight / scrollable.scrollHeight) * 100); // Регулируем размер
  thumb.style.height = `${thumbHeight}%`;
  thumb.style.top = `${scrollProgress * (100 - thumbHeight)}%`;
}

scrollable.addEventListener("scroll", updateCustomScrollbar);
updateCustomScrollbar(); // Обновляем при загрузке

