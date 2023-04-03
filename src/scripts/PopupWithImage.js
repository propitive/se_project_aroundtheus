import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopUpImage = this._popupElement.querySelector(
      ".image-pop-up__image"
    );
    this._imagePopUpTitle = this._popupElement.querySelector(
      ".image-pop-up__title"
    );
  }

  open(data) {
    this._imagePopUpImage.src = data.link;
    this._imagePopUpImage.alt = data.link;
    this._imagePopUpTitle.textContent = data.name;
    super.open();
  }
}
