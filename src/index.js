
import './pages/index.css';
import  {
  avatarButtonSave,
  cardsContainer,
  profilePopup,
  cardPopup,
  cardsButtonSave,
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
  formAvatarAdd,
  formCardsAdd,
  valid
} from './components/vars.js';
import {
  getUser,
  getCards,
  updateUser,
  setCard,
  deleteCard,
  addLikes  ,
  removeLike,
  updateAvatar } from './components/api.js'
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, validButtonSave } from './components/validate.js';
import { createСard, addLike } from './components/card.js';


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
  formCardsAdd.reset();
  validButtonSave (cardsButtonSave);
  openPopup(cardPopup);
}

function openProfileAvatarImage () {
  formAvatarAdd.reset();
  validButtonSave (avatarButtonSave);
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


// Загрузка:
function renderLoading (isLoading, buttonSave) {
  if (isLoading) {
    buttonSave.textContent = 'Сохранение...'
  }else{
    buttonSave.textContent = 'Сохранено'
    }
}





Валидация:
enableValidation(valid);
