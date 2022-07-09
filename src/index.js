
// import './pages/index.css';
import  {
  avatarButtonSave,
  popupBlock,
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
  formCardsAdd,
  formAvatarAdd,
  valid
} from './components/vars.js';

import { api } from './components/api.js'
import FormValidator from './components/FormValidator.js';
import  Card  from './components/Card.js';
import Section from "./components/Section.js";
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

import { openPopup, closePopup } from './components/modal.js';
// import { createCard } from './components/card2.js';
import { refreshProfile } from './components/utils.js';



const popupWithImage = new PopupWithImage(imagePopup);
const avatarPopupElement = new Popup(avatarPopup);



// let cardsList;
// let userData;

// Загрузка данных с сервера
// const initialPromises = [api.getUser(), api.getCards()];

// Promise.all(initialPromises)
//   .then(results => {
//     profileName.textContent = results[0].name;
//     profileDesc.textContent = results[0].about;
//     profileAvatarImage.src = results[0].avatar;
//     const userInfo = results[0];
//     const cards = results[1];
//     const userData = new UserInfo(results[0].name, results[0].about);
//     console.log (userData)
//     // console.log (results)
//     // console.log (results[0].about)

//   })
//   .catch(err => console.log(err));

Promise.all([api.getCards(), api.getUser()])
  .then(([cardsInfo, user]) => {
    const userInfo = new UserInfo({ profileName, profileDesc, profileAvatarImage });
    const userId = user._id;
    userInfo.setUserInfo(user);

    console.log('init cards', cardsInfo);
    console.log(userId);
    console.log(userInfo);

    const cardList = new Section({
      items: cardsInfo,
      renderer: (item) => {
        const card = new Card (
          api,
          item,
          userId,
          // handleCardClick: () => {
          //   // const popupWithImage = new PopupWithImage(imgPopupOpen);
          //   // popupWithImage.open();
          // },
          '#template'
        );
        const cardElement = card.generate();
        cardList.addItem(cardElement);
        // refreshLikes(_element, json)
      }
    }, cardsContainer);

  })
  .catch((err) => {
    console.log(err);
  });


  // console.log(cardList)


  // cardList.rendererItems();
  // refreshProfile(userInfo.name, userInfo.about, userInfo.avatar);
  //  const myID = userInfo._id;
  //  console.log (myID)










// Загрузка карточек:
// function initCards (initialCards, userId) {
//   initialCards.forEach((card) => {
//     const isSelf = userId === card.owner._id;
//     const isLiked = Boolean(card.likes.find(like => like._id === userId));
//     const newCard = createCard(card, isSelf, isLiked);
//     cardsContainer.append(newCard);
//   });
// }



// Открытие popup:
function openProfileButtonEdit () {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
  openPopup(profilePopup);
}

function openProfileButtonLink () {
  formCardsAdd.reset();
  // validButtonSave (cardsButtonSave);
  openPopup(cardPopup);
}

function openProfileAvatarImage () {
  formAvatarAdd.reset();
  // validButtonSave (avatarButtonSave);
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
  api.setCard(popupCardsName.value, popupCardsImage.value)
    .then(data => {
      const card = createCard(data);
      cardsContainer.prepend(card);
      closePopup(cardPopup);
    })
    .catch(err => console.log(err))
    .finally(() => {
      cardsButtonSave.textContent = 'Создать';
    });
}

cardForm.addEventListener('submit', AddCardForm);


// Редактирование профиля:
function editingProfileForm (evt) {
  evt.preventDefault();
  profileButtonSave.textContent = 'Сохранение...';
  api.updateUser(popupProfileName.value,  popupProfileDescription.value)
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
  api.updateAvatar(popupAvatarImage.value)
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
(function enableValidation() {
  const formList = Array.from(document.querySelectorAll(valid.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(valid, formElement);
    validator.enableVerification()
  });
})()



