import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handle) {
    super(popupSelector);
    this._handle = handle;
    this._formElement = this._popupSelector.querySelector('.popup__block');
    this._functionEventListener = this._functionEventListener.bind(this);
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__item'));
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues
  }

  _functionEventListener(evt) {
    evt.preventDefault();
    this._handle.handleSubmit(this._getInputValues());
    this.close();
  }


  // Добавляет слушатель клика
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._functionEventListener)
  }

  // Ззакрытие попапа
  close() {
    this._formElement.reset();
    super.close();
    this._formElement.removeEventListener('submit', this._functionEventListener)
  }
}
