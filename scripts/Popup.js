// import { closeModal, closeModalOnRemoteClick, keyHandler } from "./utils";

// import { closeModal } from "./utils";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    // open popup
    const modal = this._popupElement.querySelector(".modal");

    modal.classList.add("modal__open");
    modal.addEventListener("mousedown", this.setEventListeners);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes popup
    const modal = this._popupElement.querySelector(".modal");

    modal.classList.remove("modal__open");
    modal.removeEventListener("mousedown", this.setEventListeners);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    // listens for esc button
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(evt) {
    // sets event listeners
    const modal = this._popupElement.querySelector(".modal");
    const modalCloseButton = modal.querySelector(".close-icon");

    modalCloseButton.addEventListener("click", () => {
      this.close();
    });

    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
}
