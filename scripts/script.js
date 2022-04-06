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
  renderCard(cardsElement, cardsContainer);

});

// Функция создания карточки

function createСard (name, link) {
  const cardsElementCopy = cardsTemplate.cloneNode(true);
  const elementImage = cardsElementCopy.querySelector('.element__image');
  const elementCaption = cardsElementCopy.querySelector('.element__caption');

  elementImage.alt = elementCaption.textContent = name;
  elementImage.src = link;

  // Лайкнуть
  const elementButtonLike = cardsElementCopy.querySelector('.element__button-like');
  elementButtonLike.addEventListener ('click', function (evt){
    evt.target.classList.toggle('element__button-like_active');
  });

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

  return (cardsElementCopy)
};

function renderCard (cardsElement, cardsContainer) {
  cardsContainer.prepend(cardsElement);
}

// Добавить карточки

cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardsElement = createСard (popupCardsName.value, popupCardsImage.value);
  renderCard (cardsElement, cardsContainer);
  closePopup(cardPopup);
  popupCardsName.value = '';
  popupCardsImage.value = '';
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




