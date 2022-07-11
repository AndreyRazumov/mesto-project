
// import './pages/index.css';
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
import Card from './components/Card.js';
import Section from "./components/Section.js";
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';


const profileFormValid = new FormValidator(valid, profileForm);
const cardFormValid = new FormValidator(valid, cardForm);
const avatarFormValid = new FormValidator(valid, avatarForm);
const userInfo = new UserInfo(profileName, profileDesc, profileAvatarImage);


// Загрузка данных с сервера
const initialPromises = [api.getUser(), api.getCards()];

Promise.all(initialPromises)
  .then(results => {
    profileName.textContent = results[0].name;
    profileDesc.textContent = results[0].about;
    profileAvatarImage.src = results[0].avatar;
    const user = results[0];
    const userId = results[0]._id
    const cards = results[1];
    const getCardsList = new Section ({
      renderer: (data) => {
        const classCard = new Card ({
          api,
          data,
          userId,
          templateSelector: '#template'});
          const cardElement = classCard.generate();
          getCardsList.addItem(cardElement);
      }
  }, cardsContainer)
    userInfo.getUserInfo(user);
    getCardsList.renderItems(cards);
  })
  .catch(err => console.log(err));


// Открытие popup:
function openProfileButtonEdit () {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
  profileFormValid.validButtonSave(profileButtonSave);
  editingProfileForm.open();
}

function openAddCardForm () {
  formCardsAdd.reset();
  cardFormValid.validButtonSave(cardsButtonSave);
  AddCardForm.open();
}

function openProfileAvatarImage () {
  formAvatarAdd.reset();
  avatarFormValid.validButtonSave(avatarButtonSave);
  editingAvatarForm.open();
}

profileButtonEdit.addEventListener('click', openProfileButtonEdit);
profileButtonLink.addEventListener('click', openAddCardForm);
profileAvatarImage.addEventListener('click', openProfileAvatarImage);


// Добавить карточку:
const AddCardForm = new PopupWithForm(cardPopup, {
  formSubmit: () => {
    cardsButtonSave.textContent = 'Сохранение...';
    api.setCard(popupCardsName.value, popupCardsImage.value)
      .then(results => {
        const userId = results.owner._id;
        const setCardsList = new Section ({
          renderer: (results) => {
            const classCard = new Card ({
              api,
              data,
              userId,
              templateSelector: '#template'});
              const cardElement = classCard.generate(results);
              const addCard = setCardsList.addItem(cardElement);
          }
      }, cardsContainer)
      })
      .catch(err => console.log(err))
      .finally(() => {
        cardsButtonSave.textContent = 'Создать';
        AddCardForm.close();
      })
  }
})


// Редактирование аватарки:
const editingAvatarForm = new PopupWithForm(avatarPopup, {
  formSubmit: () => {
    avatarButtonSave.textContent = 'Сохранение...';
    api.updateAvatar(popupAvatarImage.value)
    .then(data => {
      userInfo.setUserInfo(data);
    })
    .catch(err => console.log(err))
    .finally(() => {
      avatarButtonSave.textContent = 'Сохранить';
      editingAvatarForm.close()
    })
  }
});


// Редактирование профиля:
const editingProfileForm = new PopupWithForm(profilePopup, {
  formSubmit: () => {
    profileButtonSave.textContent = 'Сохранение...';
    api.updateUser(popupProfileName.value, popupProfileDescription.value)
    .then((data) => {
    userInfo.setUserInfo(data);
    })
    .catch(err => console.log(err))
    .finally(() => {
      profileButtonSave.textContent = 'Сохранить';
      editingProfileForm.close();
    });
  }
});


// Валидация:
(function enableValidation() {
  const formList = Array.from(document.querySelectorAll(valid.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(valid, formElement);
    validator.enableVerification()
  });
})()

