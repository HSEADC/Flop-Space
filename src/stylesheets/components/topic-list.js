document.addEventListener("DOMContentLoaded", () => {
    const topicList = document.querySelector(".topic-list");
  
    if (!topicList) return;
  
    // Горизонтальная прокрутка колесиком мыши
    topicList.addEventListener("wheel", (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        topicList.scrollBy({
          left: e.deltaY * 3, // Увеличиваем отзывчивость
          behavior: "smooth",
        });
      }
    });
  });