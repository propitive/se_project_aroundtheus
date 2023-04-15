import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".form");
    this._confirmButton = this._popupForm.querySelector(
      ".confirm-popup__button"
    );
    this._saveButton = this._popupForm.querySelector(".form__submit");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Loading...";
    } else {
      this._saveButton.textContent = "Yes";
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this._handleSubmit();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }
}
