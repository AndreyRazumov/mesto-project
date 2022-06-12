import  { formAvatarAdd, formCardsAdd, valid} from './vars.js';
import { enableValidation } from './validate.js';

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  formCardsAdd.reset()
  formAvatarAdd.reset()
  enableValidation(valid);
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
  }
};

export { openPopup, closePopup}

