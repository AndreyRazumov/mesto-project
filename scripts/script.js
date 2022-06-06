'use strict';

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

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__item_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__block'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      setEventListeners(formElement);
  });
};

enableValidation();

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('button_inactive');
  }
}







// проверка на количество символов
// form.addEventListener('input', function (evt) {
//   const isValid = artist.value.length > 0 && title.value.length > 0;
//   setSubmitButtonState(isValid);
// });

// включение кнопки при валидности
// function setSubmitButtonState(isFormValid) {
//   if (isFormValid) {
//     addButton.removeAttribute('disabled');
//     addButton.classList.remove('input__btn_disabled');
//   } else {
//     addButton.setAttribute('disabled', true);
//     addButton.classList.add('input__btn_disabled');
//   }
// }



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
