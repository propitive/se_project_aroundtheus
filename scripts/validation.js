const showInputError = (formElement, inputElement, errorMessage, formObjects) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formObjects.formInputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObjects.formInputErrorActive);
};

const hideInputError = (formElement, inputElement, formObjects) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formObjects.formInputTypeError);
  errorElement.classList.remove(formObjects.formInputErrorActive);
  errorElement.textContent = "";
};

const toggleInputError = (formElement, inputElement, formObjects) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement, formObjects) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formObjects.formInput)
  );
  const buttonElement = formElement.querySelector(formObjects.formSubmit);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleInputError(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formObjects) => {
  const formList = Array.from(document.querySelectorAll(formObjects.form));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, formObjects);
  });
};

const formObjects = {
  formInputTypeError: "form__input_type_error",
  formInputErrorActive: "form__input-error_active",
  formInput: ".form__input",
  formSubmit: ".form__submit",
  formSubmitInactive: "form__submit_inactive",
  form: ".form",
};

enableValidation(formObjects);

function hasInvalidInput(inputList, formObjects) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, formObjects) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    enableSubmitButton(buttonElement);
  }
}

function disableSubmitButton(buttonElement, formObjects) {
  buttonElement.classList.add(formObjects.formSubmitInactive);
  buttonElement.disabled = true;
}

function enableSubmitButton(buttonElement, formObjects) {
  buttonElement.classList.remove(formObjects.formSubmitInactive);
  buttonElement.disabled = false;
}


