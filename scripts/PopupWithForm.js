import { inputName, inputDescription } from "./index.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".form__input");
  }

  close() {
    // modifies parent method
    // reset the form when PopupWithForm is closed

    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    // return {
    //   name: inputName.value,
    //   description: inputDescription.value,
    // };

    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
      console.log(input);
    });

    console.log(this._formValues);

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
    console.log(this._inputList);
  }

  setEventListeners() {
    // modifies parent method
    // add the submit event handles to the form
    // add the click event listener to the close icon

    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
      this._popupElement.classList.remove("modal__open");
    });
  }
}
