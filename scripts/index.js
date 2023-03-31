// constants
const galleryCards = document.querySelector(".gallery__cards");

const imagePopUpModal = document.querySelector(".image-pop-up");
const imagePopUpImage = document.querySelector(".image-pop-up__image");
const imagePopUpCloseIcon = document.querySelector(".image-pop-up__close-icon");
const imagePopUpTitle = document.querySelector(".image-pop-up__title");

const editButton = document.querySelector(".profile-info__edit-button");
const profileModal = document.querySelector("#profile-modal");
export const profileModalCloseButton =
  profileModal.querySelector(".modal__close-icon");
const profileFormElement = profileModal.querySelector(".modal__form");

export const profileName = document.querySelector(".profile-info__name");
export const profileSubtitle = document.querySelector(
  ".profile-info__subtitle"
);
const inputName = document.querySelector(".modal__name");
const inputDescription = document.querySelector(".modal__description");

const addButton = document.querySelector(".add-button");
const newItemModal = document.querySelector(".new-item-modal");

const newItemTitle = document.querySelector(".new-item-modal__title");
const newItemImageLink = document.querySelector(".new-item-modal__image-link");
const newItemButton = document.querySelector(".new-item-modal__button");
const newItemModalForm = document.querySelector(".new-item-modal__form");

export const newItemCloseButton = document.querySelector(
  ".new-item-modal__close-icon"
);

const cardTitle = document.querySelector("#card__title");
const cardSelector = document.querySelector("#card").content;

const formConfig = {
  formInputTypeErrorClass: "form__input_type_error",
  formInputErrorActiveClass: "form__input-error_active",
  formInputSelector: ".form__input",
  formSubmitSelector: ".form__submit",
  formSubmitInactiveClass: "form__submit_inactive",
  formSelector: ".form",
};

const userInfo = new UserInfo({
  nameSelector: ".modal__name",
  descriptionSelector: ".modal__description",
});

const editFormPopup = new PopupWithForm(
  selectors.profileModal,
  submitEditProfile
);

const imagePopUp = new PopupWithImage("#card");

const addFormPopup = new PopupWithForm(selectors.newItemModal, submitAddCard);

// import all of the classes
import { initialCards, selectors } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// create instances of the classes

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  galleryCards
);

section.renderItems();

function renderCard(initialCards) {
  const card = new Card(
    {
      initialCards,
      handleImageClick: (initialCards) => {
        const image = {
          name: initialCards.name,
          link: initialCards.src,
        };
        imagePopup.open(image.name, image.link);
      },
    },
    cardSelector
  ).renderCard();

  section.addItem(card);
}

const editFormValidator = new FormValidator(
  formConfig,
  document.querySelector(".modal__form")
);
const addFormValidator = new FormValidator(
  formConfig,
  document.querySelector(".new-item-modal__form")
);

// initialize all my instances
editFormValidator.enableValidation();
addFormValidator.enableValidation();
editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
imagePopUp.setEventListeners();

// all the rest

editButton.addEventListener("click", function () {
  editFormPopup.open();
  const { description, name } = userInfo.getUserInfo();
  inputName.value = name;
  inputDescription.value = description;
});

addButton.addEventListener("click", function () {
  addFormPopup.open();
});

function submitEditProfile(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    description: inputValues.description,
  });
}

function submitAddCard(inputValues) {
  renderCard(inputValues);
}

/*
const EditUserProfileModal = new PopupWithForm({
  popupSelector: selectors.profileModal,
  handleFormSubmit: (formData) => {
    // 1. get values from form inputs
    // call userInfo.setUserInfo({ name: input.value, description: input2.value  })
  },
});
*/
