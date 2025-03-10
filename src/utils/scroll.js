 // Создаём кастомный скроллбар
const scrollbar = document.createElement("div");
scrollbar.classList.add("custom-scrollbar");
const thumb = document.createElement("div");
thumb.classList.add("custom-scrollbar-thumb");
scrollbar.appendChild(thumb);
document.body.appendChild(scrollbar);

// Находим основной контейнер со скроллом
const scrollable = document.querySelector(".layout__target-content");

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

