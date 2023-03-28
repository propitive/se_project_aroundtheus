import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openModal, closeModal } from "./utils.js";

// START - Cards being listed
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];
// END - Cards being listed

/* START: Elements */

const galleryCards = document.querySelector(".gallery__cards");

const imagePopUp = document.querySelector(".image-pop-up");
const imagePopUpImage = document.querySelector(".image-pop-up__image");
const imagePopUpCloseIcon = document.querySelector(".image-pop-up__close-icon");
const imagePopUpTitle = document.querySelector(".image-pop-up__title");

const editButton = document.querySelector(".profile-info__edit-button");
const profileModal = document.querySelector("#profile-modal");
const profileModalCloseButton =
  profileModal.querySelector(".modal__close-icon");
const profileFormElement = profileModal.querySelector(".modal__form");

const profileName = document.querySelector(".profile-info__name");
const profileSubtitle = document.querySelector(".profile-info__subtitle");
const inputName = document.querySelector(".modal__name");
const inputDescription = document.querySelector(".modal__description");

const addButton = document.querySelector(".add-button");
const newItemModal = document.querySelector(".new-item-modal");

const newItemTitle = document.querySelector(".new-item-modal__title");
const newItemImageLink = document.querySelector(".new-item-modal__image-link");
const newItemButton = document.querySelector(".new-item-modal__button");
const newItemModalForm = document.querySelector(".new-item-modal__form");

const newItemCloseButton = document.querySelector(
  ".new-item-modal__close-icon"
);

const cardTitle = document.querySelector("#card__title");
const cardSelector = document.querySelector("#card").content;

/* END: Elements  */

/* START: Validation */

const formConfig = {
  formInputTypeErrorClass: "form__input_type_error",
  formInputErrorActiveClass: "form__input-error_active",
  formInputSelector: ".form__input",
  formSubmitSelector: ".form__submit",
  formSubmitInactiveClass: "form__submit_inactive",
  formSelector: ".form",
};

const editFormValidator = new FormValidator(
  formConfig,
  document.querySelector(".modal__form")
);
const addFormValidator = new FormValidator(
  formConfig,
  document.querySelector(".new-item-modal__form")
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* END: Validation */

/* START: Functions */

const renderCard = (cardData, wrapper) => {
  const card = new Card(cardData, cardSelector);
  wrapper.prepend(card.getView());
};

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileSubtitle.textContent;
}

/* END: Functions */

/* START: Event Handlers */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputDescription.value;
  closeModal(profileModal);
}

/* END: Event Handlers */

/* START: Event Listener */

editButton.addEventListener("click", function () {
  fillProfileForm();
  openModal(profileModal);
});

addButton.addEventListener("click", function () {
  openModal(newItemModal);
});

profileModalCloseButton.addEventListener("click", function () {
  closeModal(profileModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

newItemCloseButton.addEventListener("click", function () {
  closeModal(newItemModal);
});

imagePopUpCloseIcon.addEventListener("click", function () {
  closeModal(imagePopUp);
});

newItemModalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = newItemTitle.value;
  const link = newItemImageLink.value;
  renderCard({ name, link }, galleryCards);
  closeModal(newItemModal);
  newItemModalForm.reset();
});

initialCards.forEach((data) => renderCard(data, galleryCards));

/* END: Event Listener */
