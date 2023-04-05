export const editButton = document.querySelector(".profile-info__edit-button");

export const profileName = document.querySelector(".profile-info__name");
export const profileSubtitle = document.querySelector(
  ".profile-info__subtitle"
);
export const inputName = document.querySelector(".modal__name");
export const inputDescription = document.querySelector(".modal__description");

export const addButton = document.querySelector(".add-button");

export const initialCards = [
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

export const selectors = {
  cardSection: ".gallery__cards",
  cardTemplate: ".card-template",
  previewPopup: ".image-pop-up",
  profileModal: ".profile-modal",
  addCardModal: ".new-item-modal",
};

export const formConfig = {
  formInputTypeErrorClass: "form__input_type_error",
  formInputErrorActiveClass: "form__input-error_active",
  formInputSelector: ".form__input",
  formSubmitSelector: ".form__submit",
  formSubmitInactiveClass: "form__submit_inactive",
  formSelector: ".form",
};
