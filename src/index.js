
import './pages/index.css';
import  {
  avatarButtonSave,
  profileButtonSave,
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
  updateAvatar } from './components/api.js'
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, validButtonSave } from './components/validate.js';
import { createCard, addReactionListener, clickOnElmentImage } from './components/card.js';


// Загрузка карточек:
function initCards (initialCards, userId) {
  initialCards.forEach((card) => {
    const isSelf = userId === card.owner._id;
    const isLiked = Boolean(card.likes.find(like => like._id === userId));
    const newCard = createCard(card, isSelf, isLiked);
    cardsContainer.append(newCard);
  });
}



// initialCards.forEach((initialCards) => {
//   const cardsElement = createCard (initialCards.name, initialCards.link)
//   renderCard(cardsElement);
// });

function renderCard (cardsElement) {
  cardsContainer.prepend(cardsElement);
}



//Добавление лайков:
// cardsContainer.addEventListener ('click', addLike);


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
  cardsButtonSave.textContent = 'Сохранение...';
  setCard(popupCardsName.value, popupCardsImage.value)
    .then(data => {
      console.log(data)
      console.log(popupCardsName.value)
      const card = createCard(data);
      cardsContainer.prepend(card);
      // createСard (popupCardsName.value, popupCardsImage.value)
      // renderCard (data)
      closePopup(cardPopup);
    })
    .catch(err => console.log(err))
    .finally(() => {
      cardsButtonSave.textContent = 'Создать';
    });



  // const cardsElement = createСard (popupCardsName.value, popupCardsImage.value);
  // renderCard (cardsElement);
  // closePopup(cardPopup);
}

cardForm.addEventListener('submit', AddCardForm);


// Редактирование профиля:
function editingProfileForm (evt) {
  evt.preventDefault();
  profileButtonSave.textContent = 'Сохранение...';
  updateUser(popupProfileName.value,  popupProfileDescription.value)
    .then(data => {
      profileName.textContent = data.name;
      profileDesc.textContent = data.about;
      closePopup(profilePopup)
    })
    .catch(err => console.log(err))
    .finally(() => {
      profileButtonSave.textContent = 'Сохранить';
    });
};

profileForm.addEventListener('submit', editingProfileForm);


// Редактирование аватарки:
function editingAvatarForm (evt) {
  evt.preventDefault();
  avatarButtonSave.textContent = 'Сохранение...';
  updateAvatar(popupAvatarImage.value)
    .then(data => {
      profileAvatarImage.src = data.avatar;
      closePopup(avatarPopup);
    })
    .catch(err => console.log(err))
    .finally(() => {
      avatarButtonSave.textContent = 'Сохранить';
    })
}

avatarForm.addEventListener('submit', editingAvatarForm);


// Валидация:
enableValidation(valid);


// Загрузка данных с сервера
const initialPromises = [getUser(), getCards()];

Promise.all(initialPromises)
  .then((results) => {
    console.log(results)
    const userInfo = results[0];
    const cards = results[1];
    profileName.textContent = userInfo.name;
    profileDesc.textContent = userInfo.about;
    profileAvatarImage.src = userInfo.avatar;
    initCards(cards, userInfo._id);
  })
  .catch(err => console.log(err));
