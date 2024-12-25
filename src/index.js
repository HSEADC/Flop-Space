import './style.css'

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('#main_slider', {
    slidesPerView: 1.3,   // Показываем полную центральную карточку и две другие, частично выходящие за пределы
    centeredSlides: true,  // Центрируем активный слайд
    spaceBetween: 30,      // Расстояние между слайдами
    initialSlide: 1,
  });

const failslider = new Swiper('#failures_slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 3,   // Показываем полную центральную карточку и две другие, частично выходящие за пределы
    centeredSlides: true,  // Центрируем активный слайд
    spaceBetween: 30,      // Расстояние между слайдами
    initialSlide: 1,
    watchOverflow: true,
    grabCursor: true,
    loop: true,
    allowSlidePrev: false,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',  // Элемент для точек
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        clickable: true,
      },
  });

console.log('Текст для консоли v2')
