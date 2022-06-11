const formCardsAdd = document.forms.cardsAdd;
const formAvatarAdd =document.forms.avatarAdd;

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


export { formCardsAdd, formAvatarAdd, openPopup, closePopup }

