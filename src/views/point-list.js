import { createElement } from '../services/utils.js';

const getPointListTemplate = () =>/*html*/`
  <ul class="trip-events__list">
  </ul>
`;

export default class PointList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getPointListTemplate();
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


