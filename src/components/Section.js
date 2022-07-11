export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element) {
    this._container.append(element);
  }

  // addItem(item) {
  //   this._renderer(item);
  // }

  renderItems() {
    // this._clear();
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
