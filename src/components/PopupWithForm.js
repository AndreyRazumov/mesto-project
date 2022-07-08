import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
 constructor (popupSelector, {handleSubmit}) {
   super(popupSelector);
   this._handleSubmit = handleSubmit;
   this._form = this._popupSelector.querySelector('.popup__block');
   this._popupItem = this._form.querySelectorAll('.popup__item');
   this._buttonSave = this._form.querySelector('.popup__button-save');

 }

 _getInputValues() {
  this._inputList = Array.from(this._popupItem);
  this._formValues = {};
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  })
  return this._formValues
 }

 setEventListeners() {
   super.setEventListeners();
   this._form.addEventListener('submit', (evt) => {
     evt.preventDefault();
     this._handleSubmit(this._getInputValues());
   })
 }

 close() {
  super.close();
   this._form.reset();
   this._buttonSave.classList.add('button_inactive');
   this._buttonSave.setAttribute('disabled', '');

 }
}
