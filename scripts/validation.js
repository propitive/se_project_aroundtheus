const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formObjects.formInputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObjects.formInputErrorActive);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formObjects.formInputTypeError);
  errorElement.classList.remove(formObjects.formInputErrorActive);
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

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formObjects.form));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
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
  buttonElement.classList.add(formObjects.formSubmitInactive);
  buttonElement.disabled = true;
}

function enableSubmitButton(buttonElement) {
  buttonElement.classList.remove(formObjects.formSubmitInactive);
  buttonElement.disabled = false;
}


