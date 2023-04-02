// import { closeModal, closeModalOnRemoteClick, keyHandler } from "./utils";

import { selectors } from "./constants.js";

// import { closeModal } from "./utils";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  open() {
    // open popup
    console.log(this._popupElement);
    console.log(selectors.profileModal);

    this._popupElement.classList.add("modal__open");
    this._popupElement.addEventListener("mousedown", this.setEventListeners);
    document.addEventListener("keyup", this._handleEscUp);
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("modal__open");
    this._popupElement.removeEventListener("mousedown", this.setEventListeners);
    document.removeEventListener("keyup", this._handleEscUp);
  }

  _handleEscUp(evt) {
    // listens for esc button
    evt.preventDefault();

    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // sets event listeners

    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("close-icon")
      ) {
        this.close();
      }
    });
  }
}
