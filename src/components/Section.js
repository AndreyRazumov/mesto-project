export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  // Принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.append(element);
  }

  // setItem(item) {
  //   this._renderer(item);
  // }

  //Отрисовка всех элементов
  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
