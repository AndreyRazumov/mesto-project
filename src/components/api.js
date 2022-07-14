class Api {
  constructor( { baseUrl, headers } ) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  // Проверка запроса с сервера
  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };


  // Загрузка информации о пользователе с сервера
  getUser() {
    return fetch (`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then (this._checkResponse)
  };


  // Загрузка карточек с сервера
  getCards() {
  return fetch (`${this._baseUrl}/cards`, {
    headers: this._headers
  })
  .then (this._checkResponse)
 };


  // Редактирование профиля
  updateUser(name, about) {
    return fetch (`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name,
        about
      })
    })
    .then (this._checkResponse)
  };


  // Добавление новой карточки
  setCard(name, link) {
    return fetch (`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
        name,
        link
      })
    })
    .then (this._checkResponse)
  };


  //Удаление карточки
  deleteCard(cardId) {
    return fetch (`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then (this._checkResponse)
  };


  // Постановка и снятие лайка
  addLikes(cardId) {
  return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then (this._checkResponse)
  };

  removeLikes(cardId) {
    return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then (this._checkResponse)
  };


  // Обновление аватара пользователя
  updateAvatar(avatar) {
    return fetch (`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar
      })
    })
    .then (this._checkResponse)
 };
}

// Запрос к серверу
export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: '21113fb3-0279-459b-96d2-cacb8e8c5e15',
    'Content-Type': 'application/json'
  }
});
