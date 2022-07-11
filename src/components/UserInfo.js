// export default class UserInfo {
//   constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
//     this._userNameSelector = userNameSelector;
//     this._userAboutSelector = userAboutSelector;
//     this._userAvatarSelector = userAvatarSelector;
//   }

//   //Возвращает данные о пользователе
//   getUserInfo(apiMethod) {
//     return apiMethod;
//   }

//   _refreshUserInfo({name=null, about = null, avatar = null}) {
//     if(name)
//       document.querySelector(this._userNameSelector).textContent = name;
//     if(about)
//       document.querySelector(this._userAboutSelector).textContent = about;
//     if(avatar)
//       document.querySelector(this._userAvatarSelector).style.backgroundImage = `url('${avatar}')`;
//   };

//   //ВОтправляет данные о пользователе
//   setUserInfo({name, about}, apiMethod) {
//     apiMethod(name, about)
//       .then((json) => {
//         console.log('New profile data: ', json);
//         this._refreshUserInfo(json);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }


export default class UserInfo {
  constructor({ userName, userAbout, userAvatar }) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src
    }
    return userInfo;
  }

  setUserInfo(data) {
    this._userName = data.name;
    this._userAbout = data.about;
    this._userAvatar = data.avatar;
  }
 }


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
//         return res
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }

//   setUserInfo(user) {
//     api.updateUser(user.name, user.about)
//       .then(res => {
//         this._nameUser.textContent = res.name;
//         this._infoUser.textContent = res.about;
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
// }
