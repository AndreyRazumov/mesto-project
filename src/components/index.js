'use strict';

import {
  cardsContainer,
  profilePopup,
  cardPopup,
  avatarPopup,
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
  initialCards
} from './vars.js'
import { enableValidation } from './validate.js';
import { formCardsAdd, formAvatarAdd, openPopup, closePopup } from './modal.js'
import { createСard, renderCard } from './card.js'


// Загрузка карточек:
initialCards.forEach((initialCards) => {
  const cardsElement = createСard (initialCards.name, initialCards.link)
  renderCard(cardsElement);

});


//Добавление лайков:
cardsContainer.addEventListener ('click', (evt) => {
  if (evt.target.classList.contains('element__button-like')){
    evt.target.classList.toggle('element__button-like_active');
  }
});


// Открытие popup:
profileButtonEdit.addEventListener('click', () => {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
  openPopup(profilePopup);
});

profileButtonLink.addEventListener('click', () => {
  openPopup(cardPopup);
});

profileAvatarImage.addEventListener('click', () => {
  openPopup(avatarPopup);
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileAvatarImage.src = popupAvatarImage.value;
  closePopup(avatarPopup);
  formAvatarAdd.reset()
});

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
cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardsElement = createСard (popupCardsName.value, popupCardsImage.value);
  renderCard (cardsElement);
  closePopup(cardPopup);
  formCardsAdd.reset()
});


// Редактирование профиля:
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDesc.textContent = popupProfileDescription.value;
  closePopup(profilePopup);
});


// Валидация:
enableValidation({
  formSelector: '.popup__block',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
});
