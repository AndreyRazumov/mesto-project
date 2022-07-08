export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeByEsc = (evt) => this._handleEscClose(evt);
  }

   //Открытие попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListeners();
  }

   //Функция закрытия всех попапов и удаление обработчика кнопки Esc
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

   //Функция закрытия попапа по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

   //Слушатели событий (Закроем попапы по крестику и по клику)
  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__button-close') || evt.target.classList.contains('popup')) {
        this.close();
      }
    });
    document.addEventListener('keydown', this._closePopupEsc);
  }
}
