export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._data = data;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // this._element.addEventListener("click", () => {
    //   this._handleLikeIcon();
    // });

    // this._element.addEventListener("click", () => {
    //   this._handleDeleteCard();
    // });

    this._element.addEventListener("click", this._handleLikeIcon);
    this._element.addEventListener("click", this._handleDeleteCard);
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .toggle("card__like-button-active");
    console.log("Like button has been pressed");
  }

  _handleDeleteCard() {
    this._element.closest(".card").remove();
    console.log("Card has been deleted");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();
    console.log(this._element);
    this._cardLikeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._addCardTitle = this._element.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._addCardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
