import "./index.css";
import {
  initialCards,
  selectors,
  formConfig,
  editButton,
  addButton,
  avatarButton,
} from "../utils/constants";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "bc327ce1-4668-42e6-9a70-be158cef63f8",
    "Content-Type": "application/json",
  },
});

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

const editUserProfileModalNew = new PopupWithForm({
  popupSelector: selectors.profileModal,
  handleFormSubmit: (values) => {
    editUserProfileModalNew.renderLoading(true);
    api
      .updateProfileInfo(values)
      .then((data) => {
        userInfo.setUserInfo(data);
        editUserProfileModalNew.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editUserProfileModalNew.renderLoading(false, "Save");
      });
  },
});

editUserProfileModalNew.setEventListeners();

// const editUserProfileModal = new PopupWithForm({
//   popupSelector: selectors.profileModal,
//   handleFormSubmit: (info) => {
//     userInfo.setUserInfo(info);
//   },
// });

// editUserProfileModal.setEventListeners();

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

const addCardModal = new PopupWithForm({
  popupSelector: selectors.addCardModal,
  handleFormSubmit: (data) => {
    cardSection.addItem(createCard(data));
  },
});

addCardModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile-info__name",
  descriptionSelector: ".profile-info__subtitle",
  userAvatar: ".profile__avatar",
});

window.onload = () => {
  avatarButton.setEventListeners("click", function () {
    avatarPopup.open();
  });
};

const avatarPopup = new PopupWithForm({
  popupSelector: selectors.changeAvatarForm,
  handleFormSubmit: (values) => {
    avatarPopup.renderLoading(true);
    api
      .updateProfileAvatar(values.avatar)
      .then((data) => {
        userInfo.setAvatar(data);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarPopup.renderLoading(false, "save");
      });
  },
});

avatarPopup.setEventListeners();

editButton.addEventListener("click", function () {
  const info = userInfo.getUserInfo();
  // editUserProfileModal.setInputValues(info);
  editFormValidator.resetValidation();
  // editUserProfileModal.open();
  editUserProfileModalNew.setInputValues(info);
  editUserProfileModalNew.open();
});

addButton.addEventListener("click", function () {
  addFormValidator.resetValidation();
  addCardModal.open();
});
