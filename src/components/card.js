import  {
  imagePopup,
  popupImage,
  popupFigcaption
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
    // this._cardElement = this._element.querySelector('.element');
    // this._button = cardElement.querySelector('.element__button-like');
    // this._cardLikes.classList.add('element__button-like_active')
  }
  //Клонируем карточки
  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
     return cardElement;
  }

  // Фцнкция добавления лайков:
  _addReactionListener () {
    const cardElement = this._element.closest('.element');
    console.log(cardElement)
    const elementButtonLikeNum = cardElement.querySelector('.element__button-like-num');
    const button = cardElement.querySelector('.element__button-like');
    if (!button.classList.contains('element__button-like_active')) {
      this._api.addLikes(cardElement.id)
        .then((res) => {
          elementButtonLikeNum.textContent = res.likes.length;
          button.classList.add('element__button-like_active');
        })
        .catch(err => console.log(err));
    } else {
      this._api.removeLikes(cardElement.id)
        .then((res) => {
          elementButtonLikeNum.textContent = res.likes.length;
          button.classList.remove('element__button-like_active');
        })
        .catch(err => console.log(err));
    }
  };

  // Функция удаления карточки
  _deleteCard() {
    const cardElement = document.getElementById(`${this._cardId}`);
    console.log(this._cardId)
    this._api.deleteCard(this._cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch(err => console.log(err))


      // function formHandlerDelete (cardItemId) {
      //   const cardElement = document.getElementById(`${cardItemId}`);

      //   api.deleteCard(cardItemId)
      //     .then(() => {
      //       cardElement.remove();
      //     })
      //     .catch(err => console.log(err))
      // }

      // function deleteCards (evt) {
      //   const deleteButton = evt.target;
      //   const cardElement = deleteButton.closest('.element');
      //   formHandlerDelete(cardElement.id);
      // };

  }

  _handleCardClick() {
    const cardPopup = new PopupWithImage(imagePopup, this._link, this._name);
    cardPopup.open();
  }
  _refreshLikes() {
    if (Boolean(this._card.likes.find(like => like._id === this._userId))) {
    this._elementButtonLike.classList.add('element__button-like_active');
    }
  }

  _addDeleteButton() {
    if (this._ownerId === this._userId) {
      this._element.addEventListener('click', this._deleteCard);
    }else {
      this._element.classList.add('element__button-trash_inactive');
    }
  }

  //Навесим слушатели на кнопки
  _setEventListeners() {
    //лайки
    this._element.querySelector('.element__button-like').addEventListener ('click', () => {
    this._addReactionListener();
    })
    //удаление
    this._element.querySelector('.element__button-trash').addEventListener ('click', () => {
    this._deleteCard();
    })
    //попап картинки
    this._element.querySelector('.element__image').addEventListener ('click', () => {
    this._handleCardClick();
    })
  }

  //Публичный метод генерации карточки
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
    // this._addDeleteButton();
    this._refreshLikes()
    // console.log(this._name)
    // console.log(this._element);
    // console.log(this._cardElement.id);
    // console.log(this._cardLikes.length);


    return this._element;

    // this._image = this._element.querySelector('.element__image'); //Картинка
    // this._title = this._element.querySelector('.element__caption'); //Заголовок
    // this._buttonLike = this._element.querySelector('.element__button-like'); //Кнопка лайка
    // this._likeCount = this._element.querySelector('.element__button-like-num'); //Кол-во лайков
    // this._deleteBtn = this._element.querySelector('.element__button-trash'); // Корзина

    // this._image.src = this._link;
    // this._title.textContent = this._name;
    // this._image.alt = this._name;
    // this._likeCount.textContent = this._cardLikes.length;

    // Проверяем лайки и отмечаем свои лайки активными(и после перезагрузки страницы)!!!!
    //   if (this._cardLikes.some((like) => like._id === this._userId)) {
    //     this._buttonLike.classList.add('element__button-like_active')
    //   }

    // //Добавляем кнопку удалить на карточку
    // if (this._ownerId === this._userId ) {
    //   this._deleteBtn.style.display = 'block';
    // }

    //   return this._element;
  };
 }
