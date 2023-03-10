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

//START - Reusable data

function openModal(modal) {
  modal.classList.add("modal__open");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", keyHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal__open");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", keyHandler);
}

const imagePopUp = document.querySelector(".image-pop-up");
const imagePopUpImage = document.querySelector(".image-pop-up__image");
const imagePopUpCloseIcon = document.querySelector(".image-pop-up__close-icon");
const imagePopUpTitle = document.querySelector(".image-pop-up__title");
imagePopUpCloseIcon.addEventListener("click", function () {
  closeModal(imagePopUp);
});

// END - Reusable data

// START - Modal box toggle
const editButton = document.querySelector(".profile-info__edit-button");
const profileModal = document.querySelector("#profile-modal");
const profileModalCloseButton =
  profileModal.querySelector(".modal__close-icon");

profileModalCloseButton.addEventListener("click", function () {
  closeModal(profileModal);
  console.log("Modal has been closed");
});
//END - Modal box toggle

// START - Form fields
const profileName = document.querySelector(".profile-info__name");
const profileSubtitle = document.querySelector(".profile-info__subtitle");
const inputName = document.querySelector(".modal__name");
const inputDescription = document.querySelector(".modal__description");

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileSubtitle.textContent;
}

editButton.addEventListener("click", function () {
  fillProfileForm();
  openModal(profileModal);
  console.log("Modal has been opened");
});
//END - Form fields

//START - Editing your name and about me
const profileFormElement = profileModal.querySelector(".modal__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputDescription.value;
  closeModal(profileModal);
  console.log("Modal has been closed 2");
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
//END - Editing your name and about me

//START: Rendering cards with a forEach method
const galleryCards = document.querySelector(".gallery__cards");

function createCard(data) {
  console.log(data);
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = data.name;
  const cardImage = data.link;
  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;

  //START: Adding the button's click function
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeImage = cardElement.querySelector(".card__button");

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button-active");
    console.log("Like button has been pressed");
  });
  //END: Adding the button's click function

  //START: Adding the delete button's click function
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest(".card");
    listItem.remove();
    console.log("Card has been deleted");
  });
  //END: Adding the delete button's click function

  //START: Opening a picture modal
  function handleImagePopUp() {
    imagePopUpImage.src = cardImage;
    imagePopUpImage.alt = cardTitle;
    imagePopUpTitle.textContent = cardTitle;

    console.log(imagePopUpImage.src);
    console.log(imagePopUpImage.alt);
    console.log(imagePopUpTitle.textContent);

    //START: Removing the picture modal

    openModal(imagePopUp);
  }

  //END: Removing the picture modal

  const imageOnCard = cardElement.querySelector(".card__image");

  imageOnCard.addEventListener("click", handleImagePopUp);
  //END: Opening a picture modal

  return cardElement;
}

function renderCard(data) {
  const card = createCard(data);
  galleryCards.prepend(card);
}

initialCards.forEach(function (data) {
  renderCard(data);
});
//END: Rendering cards with a forEach method

//START: New item modal box open
const addButton = document.querySelector(".add-button");
const newItemModal = document.querySelector(".new-item-modal");

addButton.addEventListener("click", function () {
  openModal(newItemModal);
  console.log("Modal has been opened 4");
});
//END: New item modal box open

//START: New item modal box close
const newItemCloseButton = document.querySelector(
  ".new-item-modal__close-icon"
);

newItemCloseButton.addEventListener("click", function () {
  closeModal(newItemModal);
  console.log("Modal has been closed");
});
//END: New item modal box close

//START: Adding a card
const newItemTitle = document.querySelector(".new-item-modal__title");
const newItemImageLink = document.querySelector(".new-item-modal__image-link");
const newItemButton = document.querySelector(".new-item-modal__button");
const newItemModalForm = document.querySelector(".new-item-modal__form");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newData = { name: newItemTitle.value, link: newItemImageLink.value };
  console.log(newData);
  newItemModalForm.reset();
  closeModal(newItemModal);
  galleryCards.prepend(createCard(newData));
  disableSubmitButton(newItemButton, {
    formSubmitInactive: "form__submit_inactive",
  });
}

newItemModalForm.addEventListener("submit", handleCardFormSubmit);
//END: Adding a card

function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

function keyHandler(e) {
  if (e.key === "Escape") {
    console.log("ESCAPE");
    const openedModal = document.querySelector(".modal__open");
    closeModal(openedModal);
  }
}
