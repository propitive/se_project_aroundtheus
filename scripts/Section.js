export default class Section {
  constructor({ items, renderer }, cardListEl) {
    this._items = items;
    this._renderer = renderer;
    this._cardList = cardListEl;
  }

  renderItems() {
    // use this._renderer to create the elements for rendering

    this._items.forEach((item) => this._renderer(item));
  }

  addItem(item) {
    // take the item and render it into this._element
    this._cardList.prepend(item);
  }
}
