'use strict';


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



// Включение и выключение popup:

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

document.querySelector('.element__button-like').addEventListener('click', function (evt){
  evt.target.classList.toggle('element__button-like_active');
});

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
  document.querySelector('.element__button-like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__button-like_active');
  });

  nameCards.value = ''
  imageCards.value = ''
});


// Удалить элемент
/*

<li class="todo__item">
  <span>Полить цветы</span>
  <button class="todo__item-button">Удалить</button>
<li>

//поможет метод closest. Он возвращает ближайший родительский элемент с переданным селектором.
//Когда мы вызываем его на элементе кнопки удаления, то получаем искомый элемент списка, просто передав его класс:

// выберем кнопку удаления
const deleteButton = document.querySelector('.todo__item-button');

// добавим обработчик
deleteButton.addEventListener('click', function () {
  const listItem = deleteButton.closest('.todo__item');
  listItem.remove();
});

*/
// Увеличить элемент
































