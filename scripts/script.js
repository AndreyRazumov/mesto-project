'use strict';

const cardsTemplate = document.querySelector('#template').content;
const cardsContainer = document.querySelector('.elements__list');
const elementImage = cardsTemplate.querySelector('.element__image');
const elementCaption = cardsTemplate.querySelector('.element__caption');
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

initialCards.forEach(function (elementCards) {

  elementImage.alt = elementCaption.textContent = elementCards.name;
  elementImage.src = popupImage.src = elementCards.link;
  creatingСard(initialCards);
});

// Функция создания карточки

function creatingСard () {
  const cardsElementCopy = cardsTemplate.cloneNode(true);
  cardsContainer.prepend(cardsElementCopy);

  // Лайкнуть
  const elementButtonLike = document.querySelector('.element__button-like');
  elementButtonLike.addEventListener ('click', function (evt){
    evt.target.classList.toggle('element__button-like_active');
  });

  // Удалить элемент
  const elementButtonTrash = document.querySelector('.element__button-trash');
  elementButtonTrash.addEventListener('click', function () {
    const elementTrash = elementButtonTrash.closest('.element');
    elementTrash.remove();
  });

  // Увеличить картинку
  document.querySelector('.element__image').addEventListener ('click', function (evt) {
  popupImage.src = evt.target.src;
  document.querySelector('.popup__figcaption').textContent = popupImage.alt = evt.target.alt;
  imagePopup.classList.add('popup_opened');
  });
};


// Добавить карточки

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  elementImage.alt = elementCaption.textContent = popupCardsName.value;
  elementImage.src = popupImage.src = popupCardsImage.value;
  creatingСard ();
  popupCardsName.value = '';
  popupCardsImage.value = '';
  closePopup(cardPopup);
});


// Открытие и закрытие popup:

function openPopup (popup) {
  popup.classList.add('popup_opened');
};
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

profileButtonEdit.addEventListener('click', function () {
  openPopup(profilePopup);
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
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




