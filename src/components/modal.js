import  {
  profilePopup,
  cardPopup,
  avatarPopup,
  popupProfileName,
  popupProfileDescription,
  popupAvatarImage,
  profileName,
  profileDesc,
  profileAvatarImage,
  formCardsAdd,
  formAvatarAdd
} from './vars.js'

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
    formCardsAdd.reset()
    formAvatarAdd.reset()
  }
};

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

function editingAvatarForm (evt) {
  evt.preventDefault();
  profileAvatarImage.src = popupAvatarImage.value;
  closePopup(avatarPopup);
  formAvatarAdd.reset()
}

function editingProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDesc.textContent = popupProfileDescription.value;
  closePopup(profilePopup);
}

export { openPopup,
  closePopup,
  openProfileButtonEdit,
  openProfileButtonLink,
  openProfileAvatarImage,
  editingAvatarForm,
  editingProfileForm
}

