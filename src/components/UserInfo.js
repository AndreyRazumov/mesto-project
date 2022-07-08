import { api } from './api.js'

export default class UserInfo {
  constructor({ nameUser, infoUser }) {
    this._nameUser = nameUser;
    this._infoUser = infoUser;
  }

  async getUserInfo() {
    return await api.getUser()
      .then(res => {
        console.log (res)
        console.log (this.user)

        this.user = res;
        return this.user
      })
      .catch(err => {
        console.log(err)
      })
  }

  setUserInfo(user) {
    api.updateUser(user.name, user.about)
      .then(res => {
        this._nameUser.textContent = res.name;
        his._infoUser.textContent = res.about;
      })
      .catch(err => {
        console.log(err)
      })
  }
}
