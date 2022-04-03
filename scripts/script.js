'use strict';

const cardsTemplate = document.querySelector('#template').content;
const elementsList = document.querySelector('.elements__list');
const elementImage = cardsTemplate.querySelector('.element__image');
const elementCaption = cardsTemplate.querySelector('.element__caption');
const popupImage = document.querySelector('.popup__image');
const element = cardsTemplate.querySelector('.element');

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

function getRandomElement (arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

function cardSelection () {

let randomElement = getRandomElement(initialCards);
elementImage.src = randomElement.link;
elementImage.alt = elementCaption.textContent = randomElement.name;

elementImage.setAttribute('style', 'cursor:pointer');
const cardsElementCopy = element.cloneNode(true);

elementsList.prepend(cardsElementCopy);

like();
cardsDelete ();
fullScreen ()
}

for (let i=0; i<=5; i++) {
  cardSelection (i);
}


// Открытие и закрытие popup:

document.querySelector('.profile__button-edit').addEventListener('click', function () {
  profile.classList.add('popup_opened')
});

document.querySelector('#profile_button-close').addEventListener('click', profileClose);
function profileClose () {
  profile.classList.remove('popup_opened')
};


document.querySelector('.profile__button-link').addEventListener('click', function () {
  cards.classList.add('popup_opened')
});

document.querySelector('#cards_button-close').addEventListener('click', cardsClose);
function cardsClose () {
  cards.classList.remove('popup_opened')
};


document.querySelector('#images_button-close').addEventListener('click',function () {
  images.classList.remove('popup_opened')
});


// Лайкнуть

function like() {
  document.querySelector('.element__button-like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__button-like_active');
  })
};


// Удалить элемент

function cardsDelete () {
  const elementButtonTrash = document.querySelector('.element__button-trash');
  elementButtonTrash.addEventListener('click', function () {
    const elementTrash = elementButtonTrash.closest('.element');
    elementTrash.remove();
  });
}


// Увеличить картинку

function fullScreen () {
  document.querySelector('.element__image').addEventListener ('click', function (evt) {
  popupImage.src = evt.target.src
  document.querySelector('.popup__figcaption').textContent = evt.target.alt

  images.classList.add('popup_opened');
  })
};


// Редактирование профиля:

profile.addEventListener('submit', function formSubmitHandler (evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = popupProfileName.value;
  document.querySelector('.profile__desc').textContent = popupProfileDescription.value;

  profileClose()
});


// Добавить карточки

function cardsSubmitHandler (evt) {
  evt.preventDefault();

  elementImage.alt = elementCaption.textContent = popupCardsName.value;
  elementImage.src = popupImage.src = popupCardsImage.value;

  const cardsElementCopy = element.cloneNode(true);
  elementsList.prepend(cardsElementCopy);

  popupCardsName.value = ''
  popupCardsImage.value = ''

  cardsClose()
  like()
  cardsDelete ()
  fullScreen ()

};
cards.addEventListener('submit', cardsSubmitHandler);

