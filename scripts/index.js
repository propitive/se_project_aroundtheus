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

function handleImageClick() {
  cardData.open(imagePopUp);
}

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileSubtitle.textContent;
}

function deleteCardIcon(evt) {
  evt.target.closest(".card").remove();
}

function disableButton(button) {
  button.classList.add("form__submit_inactive");
  button.disabled = true;
}

/* END: Functions */

/* START: Event Handlers */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputDescription.value;
  closeModal(profileModal);
  console.log("Modal has been closed 2");
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardTitle.textContent = newItemTitle.value;
  imagePopUpImage.src = newItemImageLink;
  imagePopUpImage.alt = newItemImageLink;
  closeModal(newItemModal);
}

/* END: Event Handlers */

/* START: Event Listener */

editButton.addEventListener("click", function () {
  fillProfileForm();
  openModal(profileModal);
  console.log("Modal has been opened");
});

addButton.addEventListener("click", function () {
  openModal(newItemModal);
  console.log("Modal has been opened 4");
});

profileModalCloseButton.addEventListener("click", function () {
  closeModal(profileModal);
  console.log("Modal has been closed");
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

newItemCloseButton.addEventListener("click", function () {
  closeModal(newItemModal);
  console.log("Modal has been closed");
});

imagePopUpCloseIcon.addEventListener("click", function () {
  closeModal(imagePopUp);
  console.log("Image pop up modal has been closed");
});

newItemModalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = newItemTitle.value;
  const link = newItemImageLink.value;
  renderCard({ name, link }, galleryCards);
  closeModal(newItemModal);
  newItemModalForm.reset();
  disableButton(newItemButton);
});

initialCards.forEach((data) => renderCard(data, galleryCards));

/* END: Event Listener */

export { openModal };

// function createCard(data) {
//   console.log(data);
//   const cardTemplate = document.querySelector("#card").content;
//   const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

//   const cardTitle = data.name;
//   const cardImage = data.link;
//   cardElement.querySelector(".card__image").src = cardImage;
//   cardElement.querySelector(".card__image").alt = cardTitle;
//   cardElement.querySelector(".card__title").textContent = cardTitle;

//START: Adding the button's click function
// const cardLikeButton = cardElement.querySelector(".card__like-button");
// const cardLikeImage = cardElement.querySelector(".card__button");

// cardLikeButton.addEventListener("click", function () {
//   cardLikeButton.classList.toggle("card__like-button-active");
//   console.log("Like button has been pressed");
// });
//END: Adding the button's click function

//START: Adding the delete button's click function
// const deleteButton = cardElement.querySelector(".card__delete-button");

// deleteButton.addEventListener("click", function () {
//   const listItem = deleteButton.closest(".card");
//   listItem.remove();
//   console.log("Card has been deleted");
// });
//END: Adding the delete button's click function

//   function handleImagePopUp() {
//     imagePopUpImage.src = cardImage;
//     imagePopUpImage.alt = cardTitle;
//     imagePopUpTitle.textContent = cardTitle;

//     console.log(imagePopUpImage.src);
//     console.log(imagePopUpImage.alt);
//     console.log(imagePopUpTitle.textContent);

//     openModal(imagePopUp);
//   }

//   const imageOnCard = cardElement.querySelector(".card__image");
//   imageOnCard.addEventListener("click", handleImagePopUp);

//   return cardElement;
// }

// function renderCard(data) {
//   const card = createCard(data);
//   galleryCards.prepend(card);
// } LINE 74-76

// function handleCardFormSubmit(evt) {
//   evt.preventDefault();
//   const newData = { name: newItemTitle.value, link: newItemImageLink.value };
//   console.log(newData);
//   newItemModalForm.reset();
//   closeModal(newItemModal);
//   galleryCards.prepend(createCard(newData));
//   disableSubmitButton(newItemButton, {
//     formSubmitInactive: "form__submit_inactive",
//   });
// } LINE 93-98

// function openModal(modal) {
//   modal.classList.add("modal__open");
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);
//   document.addEventListener("keydown", keyHandler);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal__open");
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);
//   document.removeEventListener("keydown", keyHandler);
// }

// function closeModalOnRemoteClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closeModal(evt.target);
//   }
// }

// function keyHandler(e) {
//   if (e.key === "Escape") {
//     console.log("ESCAPE");
//     const openedModal = document.querySelector(".modal__open");
//     closeModal(openedModal);
//   }
// }
