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

// START - Modal box toggle
const editButton = document.querySelector(".profile-info__edit-button");
const closeButton = document.querySelector(".modal__close_icon");
const modal = document.querySelector(".modal");

closeButton.addEventListener("click", function () {
  modal.classList.remove("modal__open");
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
  modal.classList.add("modal__open");
  console.log("Modal has been opened");
});
//END - Form fields

//START - Editing your name and about me
const profileFormElement = document.querySelector(".modal");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputDescription.value;
  modal.classList.remove("modal__open");
  console.log("Modal has been closed");
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
//END - Editing your name and about me

//START: Rendering cards with a forEach method
const galleryCards = document.querySelector(".gallery__cards");

initialCards.forEach(function (data) {
  console.log(data);
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = data.name;
  const cardImage = data.link;
  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;
  const card = cardElement;
  galleryCards.append(card);

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
    const footer = document.querySelector(".footer");
    const imagePopUpTemplate = document.querySelector("#image-pop-up").content;
    const imagePopUpElement = imagePopUpTemplate
      .querySelector(".image-pop-up")
      .cloneNode(true);

    imagePopUpElement.querySelector(".image-pop-up__image").src = cardImage;
    imagePopUpElement.querySelector(".image-pop-up__image").alt = cardTitle;
    imagePopUpElement.querySelector(".image-pop-up__title").textContent =
      cardTitle;

    const imagePopUp = imagePopUpElement;
    footer.after(imagePopUp);

    console.log(imagePopUpElement.querySelector(".image-pop-up__image").src);
    console.log(imagePopUpElement.querySelector(".image-pop-up__image").alt);
    console.log(
      imagePopUpElement.querySelector(".image-pop-up__title").textContent
    );
  }

  const imageOnCard = cardElement.querySelector(".card__image");

  imageOnCard.addEventListener("click", handleImagePopUp);
  //END: Opening a picture modal

  //START: Removing the picture modal
  /* const divInImagePopUpTemplate =
    imagePopUpElement.querySelector(".image-pop-up"); 
  const imagePopUpCloseButton = imagePopUpElement.querySelector(
    ".image-pop-up__close-icon"
  );

  imagePopUpCloseButton.addEventListener("click", function () {
    const imageThatIsPoppedUp = imagePopUpCloseButton.closest(".image-pop-up");
    imageThatIsPoppedUp.remove();
  }); */
  //END: Removing the picture modal

  return cardElement;
});
//END: Rendering cards with a forEach method

//START: New item modal box open
const addButton = document.querySelector(".add-button");
const newItemModal = document.querySelector(".new-item-modal");

addButton.addEventListener("click", function () {
  newItemModal.classList.add("new-item-modal__open");
  console.log("Modal has been opened");
});
//END: New item modal box open

//START: New item modal box close
const newItemCloseButton = document.querySelector(
  ".new-item-modal__close-icon"
);

newItemCloseButton.addEventListener("click", function () {
  newItemModal.classList.remove("new-item-modal__open");
  console.log("Modal has been closed");
});
//END: New item modal box close

//START: Adding a card
const newItemTitle = document.querySelector(".new-item-modal__title");
const newItemImageLink = document.querySelector(".new-item-modal__image-link");
const newItemButton = document.querySelector(".new-item-modal__button");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const newItemTitleText = newItemTitle.value;
  const newItemLinkText = newItemImageLink.value;
  cardElement.querySelector(".card__image").src = newItemLinkText;
  cardElement.querySelector(".card__image").alt = newItemTitleText;
  cardElement.querySelector(".card__title").textContent = newItemTitleText;
  const card = cardElement;
  galleryCards.prepend(card);
  console.log(newItemTitleText);
  console.log(newItemLinkText);
  console.log(cardElement);

  //START: Adding the like button's click function
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeImage = cardElement.querySelector(".card__button");

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button-active");
    console.log("Like button has been pressed");
  });
  //END: Adding the like button's click function

  //START: Adding the delete button's click function
  const deleteButton = document.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest(".card");
    listItem.remove();
    console.log("Card has been deleted");
  });
  //END: Adding the delete button's click function

  return cardElement;
}

newItemButton.addEventListener("click", handleCardFormSubmit);
//END: Adding a card

//START: Adding the delete button's click function
//END: Adding the delete button's click function
