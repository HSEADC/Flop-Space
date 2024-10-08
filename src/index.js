<<<<<<< HEAD
import './style.css'

console.log('Текст для консоли v2')
=======
import './index.css'
import jpg from './images/image.jpg'

document.addEventListener('DOMContentLoaded', () => {
  const image = new Image()
  image.src = jpg
  document.querySelector('.images').appendChild(image)
})
>>>>>>> e7d96b23a8b9065747c30f2a69378aa290930b18
