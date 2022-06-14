const cardsTemplate = document.querySelector('#template').content;
const cardsContainer = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup__image');

const profilePopup = document.querySelector('#profilePopup');
const cardPopup = document.querySelector('#cardPopup');
const avatarPopup = document.querySelector('#avatarPopup');
const imagePopup = document.querySelector('#imagePopup');
const popupCardsName = document.querySelector('#popupCardsName');
const popupCardsImage = document.querySelector('#popupCardsImage');
const popupProfileName = document.querySelector('#popupProfileName');
const popupProfileDescription = document.querySelector('#popupProfileDescription');
const popupAvatarImage = document.querySelector('#popupAvatarImage');
const cardsButtonSave = document.querySelector('#cards_button-save');
const avatarButtonSave = document.querySelector('#avatar_button-save');
const profileButtonSave = document.querySelector('#profile_button-save');

const popups = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc');

const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonLink = document.querySelector('.profile__button-link');
const profileAvatarImage = document.querySelector('.profile__avatar-image')

const profileForm = document.querySelector('#profileForm');
const cardForm = document.querySelector('#cardForm');
const avatarForm = document.querySelector('#avatarForm');

const popupFigcaption = document.querySelector('.popup__figcaption');

const formCardsAdd = document.forms.cardsAdd;
const formAvatarAdd =document.forms.avatarAdd;

const valid = {
  formSelector: '.popup__block',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
};

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


export {
  avatarButtonSave,
  profileButtonSave,
  cardsTemplate,
  cardsContainer,
  popupImage,
  profilePopup,
  cardPopup,
  cardsButtonSave,
  avatarPopup,
  imagePopup,
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
  popupFigcaption,
  initialCards,
  formCardsAdd,
  formAvatarAdd,
  valid
}
