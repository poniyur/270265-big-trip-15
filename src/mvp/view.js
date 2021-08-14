import { createElement } from '../services/utils.js';

export default class View {
  constructor() {

    if( new.target === View ) {
      throw new Error('Can\'t create object. View is abstract class');
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error('You must overwrite method "getTemplate" in extended class');
  }

  getElement() {
    if( !this._element ) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

