const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enableValidation.formInputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.formInputErrorActive);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(enableValidation.formInputTypeError);
  errorElement.classList.remove(enableValidation.formInputErrorActive);
  errorElement.textContent = "";
};

const toggleInputError = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleInputError(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation({
  formInputTypeError: "form__input_type_error",
  formInputErrorActive: "form__input-error_active",
  formInput: ".form__input",
  formSubmit: ".form__submit",
  formSubmitInactive: "form__submit_inactive",
  form: ".form",
});

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    enableSubmitButton(buttonElement);
  }
}

function disableSubmitButton(buttonElement) {
  buttonElement.classList.add("form__submit_inactive");
  buttonElement.disabled = true;
}

function enableSubmitButton(buttonElement) {
  buttonElement.classList.remove("form__submit_inactive");
  buttonElement.disabled = false;
}

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
