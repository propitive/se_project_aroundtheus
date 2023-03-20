import { openModal } from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._data = data;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () =>
      this._handleLikeIcon()
    );

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());

    this._cardImage.addEventListener("click", this._handlePreviewPicture);
  }

  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("card__like-button-active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handlePreviewPicture = () => {
    const imagePopUp = document.querySelector(".image-pop-up");
    const imagePopUpImage = document.querySelector(".image-pop-up__image");
    const imagePopUpTitle = document.querySelector(".image-pop-up__title");

    imagePopUpImage.src = this._link;
    imagePopUpImage.alt = this._name;
    imagePopUpTitle.textContent = this._name;

    openModal(imagePopUp);
  };

  _getTemplate() {
    return this._cardSelector.querySelector(".card").cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._addCardTitle = this._element.querySelector(".card__title");
    this._cardLikeButton = this._element.querySelector(".card__like-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._addCardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
