export default class UserInfo {
  constructor({ name, job }) {
    this._name = name.value;
    this._job = job.value;
  }

  getUserInfo() {
    userInfoObj = {
      username: this._name.textContent,
      job: this._job.textContent,
    };

    return userInfoObj;
  }

  setUserInfo() {
    this._userInfo = this._getUserInfo();
    this._userInfo.username;
    this._userInfo.job;
  }
}
