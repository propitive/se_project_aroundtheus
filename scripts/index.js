// import "./index.css";

// import all of the classes
import { initialCards, selectors } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

// create instances of the classes
const CardPreviewPopup = new PopupWithImage({
  popupSelector: selectors.previewPopup,
});

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

const FormPreviewPopup = new PopupWithForm({
  popupSelector: selectors.profileModal,
  handleFormSubmit: (formData) => {
    const cardEl = new Card(formData, selectors.cardSection);
    CardSection.addItem(cardEl.getView());
  },
});

// initialize all my instances
CardSection.renderItems(initialCards);
CardPreviewPopup.setEventListeners();
FormPreviewPopup.setEventListeners();

// all the rest
