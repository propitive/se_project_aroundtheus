import { openModal } from "./utils.js";

export default class Card {
  constructor({ initialCards, handleImageClick }, cardSelector) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () =>
      this._handleLikeIcon()
    );

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());

    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, name: this._name })
    );
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
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardLikeButton = this._element.querySelector(".card__like-button");

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").alt = this._name;
    this._element.querySelector(".card__image").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
