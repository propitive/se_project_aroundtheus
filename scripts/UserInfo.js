import { profileName, profileSubtitle } from "./index.js";

export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userInfoObj = {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };

    return userInfoObj;
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}
