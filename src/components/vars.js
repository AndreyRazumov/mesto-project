const cardsTemplate = document.querySelector('#template').content;
const cardsContainer = document.querySelector('.elements__list');

const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');

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
const popupBlock = document.querySelector('.popup__block')

const popups = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc');

const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonLink = document.querySelector('.profile__button-link');
const profileAvatarImage = document.querySelector('.profile__avatar-image')
const buttonLike = document.querySelector('.element__button-like')

const profileForm = document.querySelector('#profileForm');
const cardForm = document.querySelector('#cardForm');
const avatarForm = document.querySelector('#avatarForm');


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

export {
  avatarButtonSave,
  buttonLike,
  popupBlock,
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
  formCardsAdd,
  formAvatarAdd,
  valid
}
