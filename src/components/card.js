import {
  cardsTemplate,
  cardsContainer,
  popupImage,
  imagePopup,
  popupFigcaption,
} from './vars.js'
import { openPopup } from './modal.js'

// Функция создания карточки
function createСard (name, link) {
  const cardsElementCopy = cardsTemplate.cloneNode(true);
  const elementImage = cardsElementCopy.querySelector('.element__image');
  const elementCaption = cardsElementCopy.querySelector('.element__caption');

  elementImage.alt = elementCaption.textContent = name;
  elementImage.src = link;

  // Удалить элемент
  const elementButtonTrash = cardsElementCopy.querySelector('.element__button-trash');
  elementButtonTrash.addEventListener('click', () => {
    elementButtonTrash.closest('.element').remove();
  });

  // Увеличить картинку
  cardsElementCopy.querySelector('.element__image').addEventListener ('click', (evt) => {
  popupImage.src = evt.target.src;
  popupFigcaption.textContent = popupImage.alt = evt.target.alt;
  openPopup (imagePopup);
  });

  return cardsElementCopy;
};

function renderCard (cardsElement) {
  cardsContainer.prepend(cardsElement);
}

export { createСard, renderCard }
