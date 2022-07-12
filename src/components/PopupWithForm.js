import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, {handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._popupSelector.querySelector('.popup__block');
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__item'));
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    console.log(this._formValues)
    return this._formValues
  }

  _functionEventListener(evt) {
    evt.preventDefault();
    const formData = this._getInputValues();
    this._handleSubmit(this._getInputValues());
    this.close();
  }


  // Добавляет слушатель клика
  setEventListeners() {
    super.setEventListeners();
    // this._formElement.addEventListener('submit', this._functionEventListener)
    this._formElement.addEventListener('submit', evt =>{
    evt.preventDefault();
    // const data = this._getInputValues();
    this._handleSubmit(this._getInputValues());
    })
  }

  // Ззакрытие попапа
  close() {
    super.close();
    this._formElement.reset();
    // this._formElement.removeEventListener('submit', this._functionEventListener)
  }
}
