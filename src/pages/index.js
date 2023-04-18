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
import PopupWithConfirmation from "../components/PopupWithConfirmation";

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

const userInfo = new UserInfo({
  nameSelector: ".profile-info__name",
  descriptionSelector: ".profile-info__subtitle",
  userAvatar: ".profile__avatar",
});

const deleteCardPopup = new PopupWithConfirmation(".confirm-popup");
deleteCardPopup.setEventListeners();
let cardSection;
let userId;

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

function createCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    selectors.cardTemplate,
    (cardName, cardLink) => {
      cardPreviewPopup.open(cardName, cardLink);
    },

    (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        deleteCardPopup.renderLoading(true);
        api.deleteUserCard(cardId).then(() => {
          card.deleteCard();
          deleteCardPopup.renderLoading(false);
          deleteCardPopup.close();
        });
      });
    },

    (cardId) => {
      if (card.isLiked()) {
        api
          .removeCardLikes(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addCardLikes(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card;
}

api.getAPIInfo().then(([userData, userCards]) => {
  console.log(userData);
  console.log(userCards);
  userId = userData._id;
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData.avatar);
  cardSection = new Section(
    {
      items: userCards,
      renderer: (cardData) => {
        const newCard = createCard(cardData);
        cardSection.addItem(newCard.getView());
      },
    },
    selectors.cardSection
  );
  cardSection.renderItems();
});

// const createCard = (item) => {
//   const card = new Card(item, selectors.cardTemplate, ({ name, link }) => {
//     cardPreviewPopup.open({ name, link });
//   });

//   return card.getView();
// };

// const cardSection = new Section(
//   {
//     renderer: (data) => {
//       cardSection.addItem(createCard(data));
//     },
//     items: initialCards,
//   },

//   selectors.cardSection
// );

// cardSection.renderItems();

const addCardPopup = new PopupWithForm({
  popupSelector: selectors.addCardModal,
  handleFormSubmit: (values) => {
    addCardPopup.renderLoading(true);
    api
      .addNewCard(values)
      .then((cardData) => {
        const addCard = createCard(cardData);
        addCardPopup.close();
        cardSection.addItem(addCard.getView());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardPopup.renderLoading(false, "Create");
      });
  },
});

addCardPopup.setEventListeners();

// const addCardModal = new PopupWithForm({
//   popupSelector: selectors.addCardModal,
//   handleFormSubmit: (data) => {
//     cardSection.addItem(createCard(data));
//   },
// });

// addCardModal.setEventListeners();

avatarButton.addEventListener("click", function () {
  avatarPopup.open();
});

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
  addCardPopup.open();
});
