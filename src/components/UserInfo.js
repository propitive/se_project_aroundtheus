export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, userAvatar }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }

  setAvatar(value) {
    this._userAvatar.textContent = value.name;
    this._userAvatar.src = value;
  }

  getAvatar() {
    return this._userAvatar.src;
  }
}
