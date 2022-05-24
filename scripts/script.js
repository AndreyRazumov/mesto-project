'use strict';

const cardsTemplate = document.querySelector('#template').content;
const cardsContainer = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup__image');

const profilePopup = document.querySelector('#profilePopup');
const cardPopup = document.querySelector('#cardPopup');
const imagePopup = document.querySelector('#imagePopup');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc');

const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonLink = document.querySelector('.profile__button-link');

const profileButtonClose = document.querySelector('#profile_button-close');
const cardsButtonClose = document.querySelector('#cards_button-close');
const imagesButtonClose = document.querySelector('#images_button-close');

const profileForm = document.querySelector('#profileForm');
const cardForm = document.querySelector('#cardForm');

const popupFigcaption = document.querySelector('.popup__figcaption')


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

initialCards.forEach(function (initialCards) {
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
  elementButtonTrash.addEventListener('click', function () {
    elementButtonTrash.closest('.element').remove();
  });

  // Увеличить картинку
  cardsElementCopy.querySelector('.element__image').addEventListener ('click', function (evt) {
  popupImage.src = evt.target.src;
  popupFigcaption.textContent = popupImage.alt = evt.target.alt;
  openPopup (imagePopup);
  });

  return cardsElementCopy;
};

function renderCard (cardsElement) {
  cardsContainer.prepend(cardsElement);
}

// Добавить карточки

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardsElement = createСard (popupCardsName.value, popupCardsImage.value);
  renderCard (cardsElement);
  closePopup(cardPopup);
  popupCardsName.value = '';
  popupCardsImage.value = '';
});


//Добавление лайков

cardsContainer.addEventListener ('click', function (evt){
  evt.target.classList.toggle('element__button-like_active');
});

// Открытие и закрытие popup:

function openPopup (popup) {
  popup.classList.add('popup_opened');
};
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

profileButtonEdit.addEventListener('click', function () {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
  openPopup(profilePopup);
});
profileButtonLink.addEventListener('click', function () {
  openPopup(cardPopup);
});
profileButtonClose.addEventListener('click', function () {
  closePopup(profilePopup);
});
cardsButtonClose.addEventListener('click', function () {
  closePopup(cardPopup);
});
imagesButtonClose.addEventListener('click', function () {
  closePopup(imagePopup);
});


// Редактирование профиля:

profileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDesc.textContent = popupProfileDescription.value;
  closePopup(profilePopup);
});


// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });


// запрос к серверу: https://mesto.nomoreparties.co

// return fetch('https://nomoreparties.co/v1/cohort-11/cards', {
//   headers: {
//     authorization: '21113fb3-0279-459b-96d2-cacb8e8c5e15'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });


//Загрузка информации о пользователе с сервера:
// GET https://nomoreparties.co/v1/cohort-11/users/me


//Загрузка карточек с сервера:
// GET https://nomoreparties.co/v1/cohort-11/cards


// Редактирование профиля
// PATCH https://nomoreparties.co/v1/cohort-11/users/me
