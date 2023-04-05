import "./index.css";
import {
  initialCards,
  selectors,
  formConfig,
  editButton,
  inputName,
  inputDescription,
  addButton,
} from "../utils/constants";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

const cardPreviewPopup = new PopupWithImage({
  popupSelector: selectors.previewPopup,
});

cardPreviewPopup.setEventListeners();

const EditUserProfileModal = new PopupWithForm({
  popupSelector: selectors.profileModal,
  handleFormSubmit: (info) => {
    userInfo.setUserInfo(info);
  },
});

EditUserProfileModal.setEventListeners();

const createCard = (item) => {
  const card = new Card(item, selectors.cardTemplate, ({ name, link }) => {
    cardPreviewPopup.open({ name, link });
  });

  return card.getView();
};

const cardSection = new Section(
  {
    renderer: (data) => {
      cardSection.addItem(createCard(data));
    },
    items: initialCards,
  },

  selectors.cardSection
);

cardSection.renderItems();

const AddCardModal = new PopupWithForm({
  popupSelector: selectors.addCardModal,
  handleFormSubmit: (data) => {
    cardSection.addItem(createCard(data));
  },
});

AddCardModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile-info__name",
  descriptionSelector: ".profile-info__subtitle",
});

editButton.addEventListener("click", function () {
  const info = userInfo.getUserInfo();
  EditUserProfileModal.setInputValues(info);
  editFormValidator.resetValidation();
  EditUserProfileModal.open();
});

addButton.addEventListener("click", function () {
  addFormValidator.resetValidation();
  AddCardModal.open();
});
