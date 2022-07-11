export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

   //Открытие попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListeners();
  }

   //Закрытия всех попапов
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

   //Pакрытия по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

   //Слушатели событий
  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__button-close') || evt.target.classList.contains('popup')) {
        this.close();
      }
    });
    document.addEventListener('keydown', this._handleEscClose);
  }
}
