import View from './view.js';

export default class SmartView extends View {

  constructor(data = {}) {
    super();
    this._data = data;
  }

  restoreHandlers() {
    throw new Error('You must overwrite method "restoreHandlers" in extended class');
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  updateData(update, justDataUpdating = false) {
    if( !update ) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if( justDataUpdating ) {
      return;
    }

    this.updateElement();
  }

}
