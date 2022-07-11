import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor (popupSelector, link, name) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupFigcaption = this._popupSelector.querySelector('.popup__figcaption');
  }

  open () {
    super.open();
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupFigcaption.textContent = this._name;
  }
}
