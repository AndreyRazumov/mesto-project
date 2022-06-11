//Фцнкция добавления лайков:
function addLike (evt) {
  if (evt.target.classList.contains('element__button-like')){
    evt.target.classList.toggle('element__button-like_active');
  }
}

export { addLike }

