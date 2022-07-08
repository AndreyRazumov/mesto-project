export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }

  addItem(item) {
    this._renderer(item);
  }

  renderer() {
    this._clear();
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
