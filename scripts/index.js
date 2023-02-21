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

//START: Rendering cards with a for loop
/*
const galleryCards = document.querySelector(".gallery__cards");

function getCardElement(data) {
  console.log(data);
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = data.name;
  const cardImage = data.link;
  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;
  return cardElement;
}

for (let i = 0; i <= initialCards.length; i++) {
  const data = initialCards[i];
  const card = getCardElement(data);
  galleryCards.append(card);
} */
//END: Rendering cards with a for loop

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
  const card = cardElement
  galleryCards.append(card);
  return cardElement;
})
//END: Rendering cards with a forEach method