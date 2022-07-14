

export default class UserInfo {
  constructor( userName, userAbout, userAvatar ) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
  }

  // Возвращает объект с данными
  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src
    }
    return userInfo;
  }

  // Принимает новые данные пользователя
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._userAvatar.src = data.avatar;
    console.log(data)
  }

  setUserAvatar(user) {
    this._userAvatar.src = user.avatar;
  }
}
