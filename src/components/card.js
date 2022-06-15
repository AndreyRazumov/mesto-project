import  {
  avatarButtonSave,
  profileButtonSave,
  cardsTemplate,
  cardsContainer,
  popupImage,
  profilePopup,
  cardPopup,
  cardsButtonSave,
  avatarPopup,
  imagePopup,
  popupCardsName,
  popupCardsImage,
  popupProfileName,
  popupProfileDescription,
  popupAvatarImage,
  popups,
  profileName,
  profileDesc,
  profileButtonEdit,
  profileButtonLink,
  profileAvatarImage,
  profileForm,
  cardForm,
  avatarForm,
  popupFigcaption,
  initialCards,
  formCardsAdd,
  formAvatarAdd,
  valid
} from './vars.js';
import {
  getUser,
  getCards,
  updateUser,
  setCard,
  deleteCard,
  addLikes,
  removeLikes,
  updateAvatar } from './api.js'
import { openPopup } from './modal.js';

// Функция создания карточки
// function createCard (name, link) {
//   const cardsElementCopy = cardsTemplate.cloneNode(true);
//   const elementImage = cardsElementCopy.querySelector('.element__image');
//   const elementCaption = cardsElementCopy.querySelector('.element__caption');

//   elementImage.alt = elementCaption.textContent = name;
//   elementImage.src = link;

//   // Удалить карточку
//   const elementButtonTrash = cardsElementCopy.querySelector('.element__button-trash');
//   elementButtonTrash.addEventListener('click', () => {
//     elementButtonTrash.closest('.element').remove();
//   });

//   // Увеличить картинку
//   cardsElementCopy.querySelector('.element__image').addEventListener ('click', (evt) => {
//   popupImage.src = evt.target.src;
//   popupFigcaption.textContent = popupImage.alt = evt.target.alt;
//   openPopup (imagePopup);
//   });

//   return cardsElementCopy;
// };


//Фцнкция добавления лайков:
// function addLike (evt) {
//   if (evt.target.classList.contains('element__button-like')){
//     evt.target.classList.toggle('element__button-like_active');
//   }
// }
/////////////////
function addReactionListener (button) {
  const cardItemElement = button.closest('.element');
  const elementButtonLikeNum = button.querySelector('.element__button-like-num');
  button.addEventListener('click', () => {
    if (button.classList.contains('element__button-like_active')) {
      removeLikes(cardItemElement.id)
        .then(res => {
          elementButtonLikeNum.textContent = res.likes.length;
          button.classList.remove('element__button-like_active');
        })
        .catch(err => console.log(err));
    } else {
      addLikes(cardItemElement.id)
        .then(res => {
          elementButtonLikeNum.textContent = res.likes.length;
          button.classList.add('element__button-like_active');
        })
        .catch(err => console.log(err));
    }
  });
};



// function deleteCard (evt) {
//   const deleteButton = evt.target;
//   const cardItem = deleteButton.closest('.element');
//   // openConfirmationPopup(cardItem.id);
// };


function clickOnElmentImage (evt) {
  const elementImag = evt.target;
  const cardElement = elementImag.closest('.element');
  const elementCaption = cardElement.querySelector('.element__caption').textContent;
  popupImage.src = elementImag.src;
  popupFigcaption.textContent = popupImage.alt = elementCaption;
  openPopup(imagePopup);
};


function createCard (card, isSelf = true, isLiked = false) {
  const { _id, link, name, likes = 0 } = card;

  const cardsElementCopy = cardsTemplate.cloneNode(true);

  const cardElement = cardsElementCopy.querySelector('.element');
  const elementImage = cardElement.querySelector('.element__image');
  const elementCaption = cardsElementCopy.querySelector('.element__caption');
  const elementButtonLike = cardsElementCopy.querySelector('.element__button-like');
  const elementButtonLikeNum = elementButtonLike.querySelector('.element__button-like-num');

  if (isLiked) {
    elementButtonLike.classList.add('element__button-like_active');
  }

  cardElement.id = _id;
  elementImage.src = link;
  elementImage.alt = name;
  elementButtonLikeNum.textContent = likes.length;
  elementCaption.textContent = name;

  elementImage.addEventListener('click', clickOnElmentImage);
  addReactionListener(elementButtonLike);
  if (isSelf) {
    cardsElementCopy.querySelector('.element__button-trash').addEventListener('click', deleteCard);
  }
  return cardsElementCopy;
}



// Удалить карточку
// function deleteElement (evt) {
//   evt.preventDefault();
//   const cardId = confirmationInputElement.value;
//   const cardElement = document.getElementById(`${cardId}`);
//   deleteCard(cardId)
//     .then(() => {
//       cardElement.remove();
//       closePopup(confirmationPopup);
//     })
//     .catch(err => console.log(err))
//     .finally(() => {
//       confirmationInputElement.value = '';
//     });
// }

export { createCard, addReactionListener, clickOnElmentImage }
