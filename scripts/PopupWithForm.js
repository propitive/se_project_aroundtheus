import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
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

    // get all field elements
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".form__input")
    );

    // create an empty object
    this._formValues = {};

    // add the values of the fields to this object
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // return the values object
    return this._formValues;
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
    });
  }
}
