// 'use strict';


import { enableValidation } from './validate.js';

const cardsTemplate = document.querySelector('#template').content;
const cardsContainer = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup__image');

const profilePopup = document.querySelector('#profilePopup');
const cardPopup = document.querySelector('#cardPopup');
const avatarPopup = document.querySelector('#avatarPopup');
const imagePopup = document.querySelector('#imagePopup');
const popupCardsName = document.querySelector('#popupCardsName');
const popupCardsImage = document.querySelector('#popupCardsImage');
const popupProfileName = document.querySelector('#popupProfileName');
const popupProfileDescription = document.querySelector('#popupProfileDescription');
const popupAvatarImage = document.querySelector('#popupAvatarImage')

const popups = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc');

const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonLink = document.querySelector('.profile__button-link');
const profileAvatarImage = document.querySelector('.profile__avatar-image')

const profileForm = document.querySelector('#profileForm');
const cardForm = document.querySelector('#cardForm');
const avatarForm = document.querySelector('#avatarForm');

const popupFigcaption = document.querySelector('.popup__figcaption');

const formCardsAdd = document.forms.cardsAdd;
const formAvatarAdd =document.forms.avatarAdd;



// Загрузка карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((initialCards) => {
  const cardsElement = createСard (initialCards.name, initialCards.link)
  renderCard(cardsElement);

});

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


//Добавление лайков

cardsContainer.addEventListener ('click', (evt) => {
  if (evt.target.classList.contains('element__button-like')){
    evt.target.classList.toggle('element__button-like_active');
  }
});


// Добавить карточки

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardsElement = createСard (popupCardsName.value, popupCardsImage.value);
  renderCard (cardsElement);
  closePopup(cardPopup);
  formCardsAdd.reset()
});


// функция закрытия по Esc
function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
    formCardsAdd.reset()
    formAvatarAdd.reset()
  }
};


// Открытие и закрытие popup:
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

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

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__button-close') || evt.target.classList.contains('popup')) {
      closePopup(popup)
      formCardsAdd.reset()
      formAvatarAdd.reset()
    }
  });
});



// Редактирование аватарки:
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileAvatarImage.src = popupAvatarImage.value;
  closePopup(avatarPopup);
  formAvatarAdd.reset()
});


// Редактирование профиля:
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDesc.textContent = popupProfileDescription.value;
  closePopup(profilePopup);
});


// Валидация
enableValidation({
  formSelector: '.popup__block',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
});
