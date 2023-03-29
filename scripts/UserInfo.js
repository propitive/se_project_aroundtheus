export default class UserInfo {
  constructor({ name, description }) {
    this._name = name.value;
    this._description = description.value;
  }

  getUserInfo() {
    userInfoObj = {
      name: this._name.textContent,
      description: this._description.textContent,
    };

    return userInfoObj;
  }

  setUserInfo({ name, description }) {
    this._name = name;
    this._description = description;
  }
}
