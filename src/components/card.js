import  {
  imagePopup,
} from './vars.js';
import PopupWithImage from './PopupWithImage.js';

export default class Card {
  constructor ( {api, data, userId, templateSelector} ) {
    this._api = api;
    this._card = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._cardLikes = data.likes;
    this._userId = userId;
    this._templateSelector = templateSelector;
  }

  // Клонирование карточек
  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
     return cardElement;
  }

  // Добавление лайков:
  _addReactionListener () {
    if (!this._elementButtonLike.classList.contains('element__button-like_active')) {
      this._api.addLikes(this._cardId)
        .then((res) => {
          this._elementButtonLikeNum.textContent = res.likes.length;
          this._elementButtonLike.classList.add('element__button-like_active');
        })
        .catch(err => console.log(err));
    } else {
      this._api.removeLikes(this._cardId)
        .then((res) => {
          this._elementButtonLikeNum.textContent = res.likes.length;
          this._elementButtonLike.classList.remove('element__button-like_active');
        })
        .catch(err => console.log(err));
    }
  };

  // Увеличение картинки
  _handleCardClick() {
    const cardPopup = new PopupWithImage(imagePopup, this._link, this._name);
    cardPopup.open();
  }

  //Установка моих лайков
  _refreshLikes() {
    if (Boolean(this._card.likes.find(like => like._id === this._userId))) {
    this._elementButtonLike.classList.add('element__button-like_active');
    }
  }

  // Установка корзины на моих карточках
  _addDeleteButton() {
    if (this._ownerId === this._userId) {
      this._elementButtonTrash.classList.remove('element__button-trash_inactive');
    }else {
      this._elementButtonTrash.classList.add('element__button-trash_inactive');
    }
  }

  // Удаление карточки
  _deleteCard() {
    console.log(this._cardId)
    this._api.deleteCard(this._cardId)
      .then(() => {
        this._element.remove();
      })
      .catch(err => console.log(err))
  }

  // Слушатели
  _setEventListeners() {
    this._elementImage.addEventListener ('click', () => {
    this._handleCardClick();
    })

    this._elementButtonTrash.addEventListener ('click', () => {
    this._deleteCard();
    })

    this._elementButtonLike.addEventListener ('click', () => {
    this._addReactionListener();
    })
  }

  // Ввозвращает полностью работоспособный и наполненный данными элемент карточки
  generate() {
    this._element = this._getElement();
    this._cardElement = this._element
    this._elementImage = this._element.querySelector('.element__image');
    this._elementCaption = this._element.querySelector('.element__caption');
    this._elementButtonTrash = this._element.querySelector('.element__button-trash')
    this._elementButtonLike = this._element.querySelector('.element__button-like');
    this._elementButtonLikeNum = this._element.querySelector('.element__button-like-num');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementButtonLikeNum.textContent = this._cardLikes.length;
    this._elementCaption.textContent = this._name;
    this._element.id = this._ownerId;
    this._setEventListeners();
    this._addDeleteButton();
    this._refreshLikes()
    return this._element;
  };
 }
