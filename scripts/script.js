'use strict';
const cardsTemplate = document.querySelector('#template').content;
const elementsList = document.querySelector('.elements__list');
const elementImage = cardsTemplate.querySelector('.element__image');
const elementCaption = cardsTemplate.querySelector('.element__caption');


// Выбор карточек

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

function cardSelection () {
  function getRandomElement (arr) {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
  };

  let randomElement = getRandomElement(initialCards);
  elementImage.src = randomElement.link;
  elementCaption.textContent = randomElement.name;
  const cardsElementCopy = cardsTemplate.querySelector('.element').cloneNode(true);
  elementsList.prepend(cardsElementCopy);

  like();
  cardsDelete ();
}


for (let i=0; i<=5; i++) {
  cardSelection (i);
}


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


// Лайкнуть

function like() {
  document.querySelector('.element__button-like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__button-like_active');
  });
}


// Удалить элемент

function cardsDelete () {
  const elementButtonTrash = document.querySelector('.element__button-trash');
  elementButtonTrash.addEventListener('click', function () {
    const elementTrash = elementButtonTrash.closest('.element');
    elementTrash.remove();
  });
}

// Редактирование профиля:

profile.addEventListener('submit', function formSubmitHandler (evt) {
  evt.preventDefault();
  const profileName = document.querySelector('.profile__name');
  const profileDesc = document.querySelector('.profile__desc');

  profileName.textContent = popupName.value;
  profileDesc.textContent = popupDescription.value;
  profileClose()
});


// Добавить карточки

function cardsSubmitHandler (evt) {
  evt.preventDefault();

  elementImage.alt = elementCaption.textContent = nameCards.value;
  elementImage.src = imageCards.value;

  const cardsElementCopy = cardsTemplate.querySelector('.element').cloneNode(true);
  elementsList.prepend(cardsElementCopy);

  cardsClose()
  like()
  cardsDelete ()

  nameCards.value = ''
  imageCards.value = ''
};
cards.addEventListener('submit', cardsSubmitHandler);

// Увеличить элемент






























