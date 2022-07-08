import  {
  cardsTemplate,
  popupImage,
  imagePopup,
  popupFigcaption
} from './vars.js';

import { api } from './api.js';
import { openPopup } from './modal.js';


// Фцнкция добавления лайков:
function addReactionListener (button) {
  const cardElement = button.closest('.element');
  const elementButtonLikeNum = button.querySelector('.element__button-like-num');

  button.addEventListener('click', () => {
    if (!button.classList.contains('element__button-like_active')) {
      api.addLikes(cardElement.id)
        .then((res) => {
          elementButtonLikeNum.textContent = res.likes.length;
          button.classList.add('element__button-like_active');
        })
        .catch(err => console.log(err));
    } else {
      api.removeLikes(cardElement.id)
        .then((res) => {
          elementButtonLikeNum.textContent = res.likes.length;
          button.classList.remove('element__button-like_active');
        })
        .catch(err => console.log(err));
    }
  });
};


// Функция удаления карточки
function formHandlerDelete (cardItemId) {
  const cardElement = document.getElementById(`${cardItemId}`);

  api.deleteCard(cardItemId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.log(err))
}

function deleteCards (evt) {
  const deleteButton = evt.target;
  const cardElement = deleteButton.closest('.element');
  formHandlerDelete(cardElement.id);
};


// Функция увеличения картинки
function clickOnElmentImage (evt) {
  const elementImag = evt.target;
  const cardElement = elementImag.closest('.element');
  const elementCaption = cardElement.querySelector('.element__caption').textContent;

  popupImage.src = elementImag.src;
  popupFigcaption.textContent = popupImage.alt = elementCaption;
  openPopup(imagePopup);
};


// Функция создания карточки:
function createCard (card, isSelf = true, isLiked = false) {
  const { _id, link, name, likes } = card;
  const cardsElementCopy = cardsTemplate.cloneNode(true);
  const cardElement = cardsElementCopy.querySelector('.element');
  const elementImage = cardElement.querySelector('.element__image');
  const elementCaption = cardsElementCopy.querySelector('.element__caption');
  const elementButtonTrash = cardsElementCopy.querySelector('.element__button-trash')
  const elementButtonLike = cardsElementCopy.querySelector('.element__button-like');
  const elementButtonLikeNum = elementButtonLike.querySelector('.element__button-like-num');

  cardElement.id = _id;
  elementImage.src = link;
  elementImage.alt = name;
  elementButtonLikeNum.textContent = likes.length;
  elementCaption.textContent = name;

  if (isSelf) {
    elementButtonTrash.addEventListener('click', deleteCards);
  }else {
    elementButtonTrash.classList.add('element__button-trash_inactive');
  }

  if (isLiked) {
    elementButtonLike.classList.add('element__button-like_active');
  }
  elementImage.addEventListener('click', clickOnElmentImage);
  addReactionListener(elementButtonLike);

  return cardsElementCopy;
}


export { createCard }
