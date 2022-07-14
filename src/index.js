
// import './pages/index.css';
import  {
  avatarButtonSave,
  profileButtonSave,
  cardsContainer,
  profilePopup,
  cardPopup,
  cardsButtonSave,
  avatarPopup,
  popupProfileName,
  popupProfileDescription,
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

const cardsSection = new Section ({
  renderer: (data, userId) => {
    const classCard = new Card ({
      api,
      data,
      userId,
      templateSelector: '#template'});
    const cardElement = classCard.generate();
    cardsSection.addItem(cardElement);
  }
}, cardsContainer)

Promise.all(initialPromises)
  .then(results => {
    profileName.textContent = results[0].name;
    profileDesc.textContent = results[0].about;
    profileAvatarImage.src = results[0].avatar;
    const user = results[0];
    const userId = results[0]._id
    const cards = results[1];
    userInfo.getUserInfo(user);
    cardsSection.renderItems(cards, userId);
  })
  .catch(err => console.log(err));

// Открытие popup:
function openProfileButtonEdit () {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
  profileFormValid.validButtonSave(profileButtonSave);
  editingProfileForm.open();
}
profileButtonEdit.addEventListener('click', openProfileButtonEdit);

function openAddCardForm () {
  formCardsAdd.reset();
  cardFormValid.validButtonSave(cardsButtonSave);
  AddCardForm.open();
}
profileButtonLink.addEventListener('click', openAddCardForm);

function openProfileAvatarImage () {
  formAvatarAdd.reset();
  avatarFormValid.validButtonSave(avatarButtonSave);
  editingAvatarForm.open();
}
profileAvatarImage.addEventListener('click', openProfileAvatarImage);


// Добавить карточку:
const AddCardForm = new PopupWithForm(cardPopup, {
  handleSubmit: (formData) => {
    cardsButtonSave.textContent = 'Сохранение...';
    api.setCard(formData.popupCardsName, formData.popupCardsImage)
      .then((data) => {
        const userId = data.owner._id;
        const classCard = new Card ({
                  api,
                  data,
                  userId,
                  templateSelector: '#template'});
        const cardElement = classCard.generate(data);
        cardsSection.addItem(cardElement, true);
        AddCardForm.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        cardsButtonSave.textContent = 'Создать';
      })
  }
})


// Редактирование аватарки:
const editingAvatarForm = new PopupWithForm(avatarPopup, {
  handleSubmit: (formData) => {
    avatarButtonSave.textContent = 'Сохранение...';
    api.updateAvatar(formData.avatar)
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
  handleSubmit: (formData) => {
    profileButtonSave.textContent = 'Сохранение...';
    api.updateUser(formData.name, formData.about)
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

