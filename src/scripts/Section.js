export default class Section {
  constructor({ renderer, items }, containerSelector) {
    this._renderer = renderer;
    this._initialArray = items;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // use this._renderer to create the elements for rendering

    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    // take the item and render it into this._element

    this._container.prepend(element);
  }
}
