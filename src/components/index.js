
import '../pages/index.css';
import  {
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
  initialCards,
  valid
} from './vars.js';

import { openPopup, closePopup } from './modal.js';
import { enableValidation } from './validate.js';
import { createСard, addLike } from './card.js';


// Загрузка карточек:
initialCards.forEach((initialCards) => {
  const cardsElement = createСard (initialCards.name, initialCards.link)
  renderCard(cardsElement);
});

function renderCard (cardsElement) {
  cardsContainer.prepend(cardsElement);
}



//Добавление лайков:
cardsContainer.addEventListener ('click', addLike);


// Открытие popup:
function openProfileButtonEdit () {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
  openPopup(profilePopup);
}

function openProfileButtonLink () {
  openPopup(cardPopup);
}

function openProfileAvatarImage () {
  openPopup(avatarPopup);
}

profileButtonEdit.addEventListener('click', openProfileButtonEdit);
profileButtonLink.addEventListener('click', openProfileButtonLink);
profileAvatarImage.addEventListener('click', openProfileAvatarImage);



//Закрытие popup:
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__button-close') || evt.target.classList.contains('popup')) {
      closePopup(popup)
    }
  });
});


// Добавить карточки:
function AddCardForm  (evt) {
  evt.preventDefault();
  const cardsElement = createСard (popupCardsName.value, popupCardsImage.value);
  renderCard (cardsElement);
  closePopup(cardPopup);
}

cardForm.addEventListener('submit', AddCardForm);


// Редактирование профиля:
function editingProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDesc.textContent = popupProfileDescription.value;
  closePopup(profilePopup);
}

profileForm.addEventListener('submit', editingProfileForm);


// Редактирование аватарки:
function editingAvatarForm (evt) {
  evt.preventDefault();
  profileAvatarImage.src = popupAvatarImage.value;
  closePopup(avatarPopup);
}

avatarForm.addEventListener('submit', editingAvatarForm);


Валидация:
enableValidation(valid);
