// Запрос к серверу
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: '21113fb3-0279-459b-96d2-cacb8e8c5e15',
    'Content-Type': 'application/json',
  },
};


// Проверка запроса с сервера
function checkResponse(res){
  if(res.ok){
    return res.json()
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}


// Загрузка информации о пользователе с сервера
const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
}

// Загрузка карточек с сервера
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
}

// Редактирование профиля
const updateUser = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(checkResponse)
}


// Добавление новой карточки
const setCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(checkResponse)
}


// Удаление карточки
const  deleteCard = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
  })
}


// Постановка и снятие лайка
const addLikes = (cardID)=>{
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse)
}

const removeLikes = (cardID)=>{
  return  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
  })
}


// Обновление аватара пользователя
const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(checkResponse)
}


export {
  getUser,
  getCards,
  updateUser,
  setCard,
  deleteCard,
  addLikes,
  removeLikes,
  updateAvatar }
