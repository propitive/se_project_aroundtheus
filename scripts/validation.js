const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.formInputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.formInputErrorActive);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.formInputTypeError);
  errorElement.classList.remove(config.formInputErrorActive);
  errorElement.textContent = "";
};

const toggleInputError = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.formInput)
  );
  const buttonElement = formElement.querySelector(config.formSubmit);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleInputError(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.form));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

const formConfig = {
  formInputTypeError: "form__input_type_error",
  formInputErrorActive: "form__input-error_active",
  formInput: ".form__input",
  formSubmit: ".form__submit",
  formSubmitInactive: "form__submit_inactive",
  form: ".form",
};

enableValidation(formConfig);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    enableSubmitButton(buttonElement, config);
  }
}

function disableSubmitButton(buttonElement, config) {
  buttonElement.classList.add(config.formSubmitInactive);
  buttonElement.disabled = true;
}

function enableSubmitButton(buttonElement, config) {
  buttonElement.classList.remove(config.formSubmitInactive);
  buttonElement.disabled = false;
}