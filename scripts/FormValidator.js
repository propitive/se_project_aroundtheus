class FormValidator {
  constructor(formConfig, formElement) {
    this._inputSelector = formConfig.formSelector;
    this._submitButtonSelector = formConfig.formSubmit;
    this._inactiveButtonClass = formConfig.formSubmitInactive;
    this._inputErrorClass = formConfig.formInputTypeError;
    this._errorClass = formConfig.formInputErrorActive;

    this._form = formElement;
  }

  _setEventListeners() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];

    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    const isFormValid = this._checkFormValidity();

    if (!isFormValid) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _checkFormValidity = () => {
    this._inputList.every((input) => input.validity.valid);
  };

  _hasInvalidInput() {
    return this._inputErrorClass.some((inputEl) => !inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}

const formConfig = {
  formInputTypeError: "form__input_type_error",
  formInputErrorActive: "form__input-error_active",
  formInput: ".form__input",
  formSubmit: ".form__submit",
  formSubmitInactive: "form__submit_inactive",
  form: ".form",
};

export default FormValidator;
