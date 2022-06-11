'use strict';

import '../pages/index.css';
import  {
  cardsContainer,
  popups,
  profileButtonEdit,
  profileButtonLink,
  profileAvatarImage,
  profileForm,
  cardForm,
  avatarForm,
  initialCards,
  formCardsAdd,
  formAvatarAdd
} from './vars.js';

import { closePopup,
  openProfileButtonEdit,
  openProfileButtonLink,
  openProfileAvatarImage,
  editingAvatarForm,
  editingProfileForm } from './modal.js';

import { enableValidation } from './validate.js';
import { createСard, renderCard, AddCardForm } from './card.js';
import { addLike } from './utils.js';


// Загрузка карточек:
initialCards.forEach((initialCards) => {
  const cardsElement = createСard (initialCards.name, initialCards.link)
  renderCard(cardsElement);
});


//Добавление лайков:
cardsContainer.addEventListener ('click', addLike);


// Открытие popup:
profileButtonEdit.addEventListener('click', openProfileButtonEdit);
profileButtonLink.addEventListener('click', openProfileButtonLink);
profileAvatarImage.addEventListener('click', openProfileAvatarImage);


//Закрытие popup:
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__button-close') || evt.target.classList.contains('popup')) {
      closePopup(popup)
      formCardsAdd.reset()
      formAvatarAdd.reset()
    }
  });
});


// Добавить карточки:
cardForm.addEventListener('submit', AddCardForm);


// Редактирование профиля:
profileForm.addEventListener('submit', editingProfileForm);


// Редактирование аватарки:
avatarForm.addEventListener('submit', editingAvatarForm);


// Валидация:
enableValidation({
  formSelector: '.popup__block',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
});
