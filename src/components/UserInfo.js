export default class UserInfo {
  constructor({userNameSelector, userAboutSelector, userAvatarSelector}) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userAvatarSelector = userAvatarSelector;

  }
  getUserInfo(apiMethod) {
    return apiMethod;
  }
  refreshUserInfo({name=null, about = null, avatar = null}) {
    if(name)
      document.querySelector(this._userNameSelector).textContent = name;
    if(about)
      document.querySelector(this._userAboutSelector).textContent = about;
    if(avatar)
      document.querySelector(this._userAvatarSelector).style.backgroundImage = `url('${avatar}')`;
  };
  
  setUserInfo({name, about}, apiMethod) {
    apiMethod(name, about)
      .then((json) => {
        console.log('New profile data: ', json);
        this.refreshUserInfo(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
//   getUserInfo() {
//     const userInfo = {
//       name: this._nameUser.textContent,
//       about: this._jobUser.textContent,
//       avatar: this._urlAvatarUser.src
//     }

//     return userInfo;
//   }

//   setUserInfo(data) {
//     this._nameUser.textContent = data.name;
//     this._jobUser.textContent = data.about;
//     this._urlAvatarUser.src = data.avatar;
//   }
//  }


// import { api } from './api.js'

// export default class UserInfo {
//   constructor({ nameUser, infoUser }) {
//     this._nameUser = nameUser;
//     this._infoUser = infoUser;
//   }

//   getUserInfo() {
//     return api.getUser()
//       .then(res => {
//         console.log (res)
//         console.log (this.user)

//         this.user = res;
//         return this.user
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }

//   setUserInfo(user) {
//     api.updateUser(user.name, user.about)
//       .then(res => {
//         this._nameUser.textContent = res.name;
//         his._infoUser.textContent = res.about;
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
// }
