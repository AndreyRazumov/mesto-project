import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
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

  // Добавляет слушатель клика
  setEventListeners() {
    this._formElement = this._popupSelector.querySelector('.popup__block');
    const buttonSave = this._popupSelector.querySelector('.popup__button-save');
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._handleSubmit.formSubmit(formData, buttonSave);
    })
  }

  // Ззакрытие попапа
  close() {
    super.close();
    this._formElement.reset();
  }
}
