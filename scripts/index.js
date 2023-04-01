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

// import all of the classes
import { initialCards, selectors } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// create instances of the classes
const CardPreviewPopup = new PopupWithImage({
  popupSelector: selectors.previewPopup,
});

CardPreviewPopup.setEventListeners();

const CardSection = new Section(
  {
    renderer: (data) => {
      const cardEl = new Card(
        {
          data,
          handleImageClick: (imgData) => {
            CardPreviewPopup.open(imgData);
          },
        },
        selectors.cardTemplate
      );
      CardSection.addItem(cardEl.getView());
    },
    items: initialCards,
  },
  selectors.cardSection
);

CardSection.renderItems(initialCards);

const EditUserProfileModal = new PopupWithForm({
  popupSelector: selectors.profileModal,
  handleFormSubmit: (formData) => {
    const cardEl = new Card(
      {
        data: formData,
        handleImageClick: userInfo.setUserInfo({
          name: inputName.value,
          description: inputDescription.value,
        }),
      },
      selectors.cardSection
    );
    CardSection.addItem(cardEl.getView());
  },
});

EditUserProfileModal.setEventListeners();

const AddCardModal = new PopupWithForm({
  popupSelector: selectors.addCardModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

AddCardModal.setEventListeners();

const userInfo = new UserInfo({
  name: profileName,
  description: profileSubtitle,
});

function handleProfileFormSubmit(data) {
  const title = data.title;
  const description = data.description;
  userInfo.setUserInfo({
    name: title,
    description: description,
  });
  EditUserProfileModal.close();
}

function handleAddFormSubmit(inputValues) {
  const card = {
    name: inputValues.title,
    link: inputValues.link,
  };
  addCardModal.close();
}

const fillUserForm = ({ name, description }) => {
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
};

// initialize all my instances

editButton.addEventListener("click", function () {
  // const { name, description } = userInfo.getUserInfo();
  // fillUserForm({ name, description });
  // EditUserProfileModal.setInputValues(userInfo.getUserInfo());
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
