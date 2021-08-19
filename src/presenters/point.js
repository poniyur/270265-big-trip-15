import PointView from '../views/point.js';
import PointEditView from '../views/point-edit.js';

import {render, replace, RenderPosition} from '../services/render.js';


const STATE = {
  NORM: 1,
  EDIT: 2,
};

export default class Point {

  constructor(options) {

    this._state = STATE.NORM;
    this._data = options.data;
    this._container = options.container;

    this._component = null;
    this._editComponent = null;

    this._handleToggleClick = this._handleToggleClick.bind(this);
  }

  run() {
    this._component = new PointView(this._data);
    this._editComponent = new PointEditView(this._data);

    this._component.setToggleClickHandler(this._handleToggleClick);
    this._editComponent.setToggleClickHandler(this._handleToggleClick);

    render(this._container, this._component, RenderPosition.BEFOREEND, true);
  }

  _handleToggleClick() {
    if( this._state === STATE.NORM ) {
      this._state = STATE.EDIT;
      replace(this._editComponent, this._component);
    } else {
      this._state = STATE.NORM;
      replace(this._component, this._editComponent);
    }
  }

}
