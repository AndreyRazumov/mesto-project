export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

   //Открытие попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListeners();
  }

   //Закрытие попапов
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.removeEventListener('mousedown', this._handleOverlayClose);
  }

   //Pакрытие по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  //Закрытие по оверлею
  _handleOverlayClose(evt){
    if (evt.target.classList.contains('popup__button-close') || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

   //Слушатели событий
  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
  }
}
