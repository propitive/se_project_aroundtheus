// constants
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

export const profileName = document.querySelector(".profile-info__name");
export const profileSubtitle = document.querySelector(
  ".profile-info__subtitle"
);
export const inputName = document.querySelector(".modal__name");
export const inputDescription = document.querySelector(".modal__description");

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

// import all of the classes
import { initialCards, selectors } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// create instances of the classes

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

const CardPreviewPopup = new PopupWithImage({
  popupSelector: selectors.previewPopup,
});

CardPreviewPopup.setEventListeners();

const EditUserProfileModal = new PopupWithForm({
  popupSelector: selectors.profileModal,
  handleFormSubmit: (info) => {
    console.log(info);
    userInfo.setUserInfo(info);
  },
});

EditUserProfileModal.setEventListeners();

const createCard = (item) => {
  console.log(item);
  const card = new Card(item, selectors.cardTemplate, (title, link) => {
    CardPreviewPopup.open(title, link);
  });

  return card.getView();
};

const renderedCardItems = new Section(
  {
    renderer: (data) => {
      console.log(data);
      renderedCardItems.addItem(createCard(data));
    },
    items: initialCards,
  },

  selectors.cardSection
);

renderedCardItems.renderItems();

const AddCardModal = new PopupWithForm({
  popupSelector: selectors.addCardModal,
  handleFormSubmit: (data) => {
    console.log(data);
    renderedCardItems.addItem(createCard(data)); //THIS IS WHY THE BLACK BOX APPEARS
  },
});

AddCardModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile-info__name",
  descriptionSelector: ".profile-info__subtitle",
});

const fillUserForm = ({ name, description }) => {
  inputName.value = name;
  inputDescription.value = description;
};

editButton.addEventListener("click", function () {
  const info = userInfo.getUserInfo();
  EditUserProfileModal.setInputValues(info);
  const { name, description } = userInfo.getUserInfo();
  fillUserForm({ name, description });
  EditUserProfileModal.open();
});

addButton.addEventListener("click", function () {
  AddCardModal.open();
});

// all the rest

/*
const EditUserProfileModal = new PopupWithForm({
  popupSelector: selectors.profileModal,
  handleFormSubmit: (formData) => {
    // 1. get values from form inputs
    // call userInfo.setUserInfo({ name: input.value, description: input2.value  })
  },
});
*/

// function handleProfileFormSubmit(data) {
//   const title = data.title;
//   const description = data.description;
//   userInfo.setUserInfo({
//     name: title,
//     description: description,
//   });
//   EditUserProfileModal.close();
// }

// function handleAddFormSubmit(inputValues) {
//   const card = {
//     name: inputValues.title,
//     link: inputValues.link,
//   };
//   addCardModal.close();
// }

// const AddCardModal = new PopupWithForm({
//   popupSelector: selectors.addCardModal,
//   handleFormSubmit: (data) => {
//     const cardEl = new Card(
//       {
//         data,
//         handleImageClick: (imgData) => {
//           CardPreviewPopup.open(imgData);
//         },
//       },
//       selectors.cardTemplate
//     );
//     CardSection.addItem(cardEl.getView());
//   },
// });

// const CardSection = new Section(
//   {
//     renderer: (data) => {
//       const cardEl = new Card(
//         {
//           data,
//           handleImageClick: (imgData) => {
//             CardPreviewPopup.open(imgData);
//           },
//         },
//         selectors.cardTemplate
//       );
//       CardSection.addItem(cardEl.getView());
//     },
//     items: initialCards,
//   },
//   selectors.cardSection
// );

// CardSection.renderItems(initialCards);
