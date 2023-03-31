import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(name, link) {
    this._image = document.querySelector(".image-pop-up__image");

    this._imagePopUpTitle.textContent = data.name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
