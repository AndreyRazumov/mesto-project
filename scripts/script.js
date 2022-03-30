'use strict';
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

// const profileButtonEdit = document.querySelector('.profile__button-edit');
// const profileButtonLink = document.querySelector('.profile__button-link');

// const profile = document.querySelector('#profile');
// const cards = document.querySelector('#cards');

// const profileButtonClose = document.querySelector('#profile_button-close');
// const cardsButtonClose = document.querySelector('#cards_button-close');

// const profileButtonSave = document.querySelector('#profile_button-save');
// const cardsButtonSave = document.querySelector('#cards_button-save');

// const popup = document.querySelector('.popup');
// const popupButtonClose = document.querySelector('.popup__button-close')
// const popupButtonSave = document.querySelector('.popup__button-save')
// const elementButtonLike = document.querySelector('.element__button-like')

// Выбор карточек
/*

 for (i=0 i<=6 i++) {
  cardsSubmitHandler(evt)
}

*/

// Открытие и закрытие popup:

document.querySelector('.profile__button-edit').addEventListener('click', function () {
  profile.classList.add('popup_opened');
});

function profileClose () {
  profile.classList.remove('popup_opened');
}
document.querySelector('#profile_button-close').addEventListener('click', profileClose);

document.querySelector('.profile__button-link').addEventListener('click', function () {
  cards.classList.add('popup_opened');
});

function cardsClose () {
  cards.classList.remove('popup_opened');
}
document.querySelector('#cards_button-close').addEventListener('click', cardsClose);




// Редактирование профиля:

profile.addEventListener('submit', function formSubmitHandler (evt) {
  evt.preventDefault();
  // const popupName = document.querySelector('#popupName');
  // const popupDescription = document.querySelector('#popupDescription');
  const profileName = document.querySelector('.profile__name');
  const profileDesc = document.querySelector('.profile__desc');

  profileName.textContent = popupName.value;
  profileDesc.textContent = popupDescription.value;
  profileClose()
});




// Добавить карточки

cards.addEventListener('submit', function cardsSubmitHandler (evt) {
  evt.preventDefault();
  const cardsTemplate = document.querySelector('#template').content;
  const elementsList = document.querySelector('.elements__list');
  // const popupNameCards = document.querySelector('#nameCards');
  // const popupImageCards = document.querySelector('#imageCards');
  const elementImage = cardsTemplate.querySelector('.element__image');
  const elementCaption = cardsTemplate.querySelector('.element__caption');

  elementImage.alt = elementCaption.textContent = nameCards.value;
  elementImage.src = imageCards.value;

  const cardsElementCopy = cardsTemplate.querySelector('.element').cloneNode(true);
  elementsList.prepend(cardsElementCopy);

  cardsClose()

  // Лайкнуть

  document.querySelector('.element__button-like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__button-like_active');
  });

  // Удалить элемент

  const elementButtonTrash = document.querySelector('.element__button-trash');
  elementButtonTrash.addEventListener('click', function () {
    const elementDell = elementButtonTrash.closest('.element');
    elementDell.remove();
  });

  // Обнулить строки

  nameCards.value = ''
  imageCards.value = ''
});


// Увеличить элемент
































