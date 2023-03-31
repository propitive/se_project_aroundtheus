import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = this._popupElement.querySelectorAll(".form__input");
    this._popupForm = this._popupElement.querySelector(".form");
  }

  close() {
    // modifies parent method
    // reset the form when PopupWithForm is closed

    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    // collects data from all the input fields
    // returns the data as an object

    // create an empty object
    const formValues = {};

    // add the values of the fields to this object
    this._formInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });

    // return the values object
    return formValues;
  }

  setEventListeners() {
    // modifies parent method
    // add the submit event handles to the form
    // add the click event listener to the close icon

    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
      this._popupForm.reset();
    });
  }
}
