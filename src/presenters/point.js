import PointView from '../views/point.js';
import PointEditView from '../views/point-edit.js';

import {render, replace, RenderPosition, remove} from '../services/render.js';


const STATE = {
  DEFAULT: 1,
  EDIT: 2,
};

export default class Point {

  constructor(options) {

    this._data = options.data;
    this._container = options.container;
    this._change = options.change;

    this._state = STATE.DEFAULT;
    this._component = null;
    this._editComponent = null;

    this._handleToggleClick = this._handleToggleClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  run() {

    const prevComponent = this._component;
    const prevEditComponent = this._editComponent;

    this._component = new PointView(this._data);
    this._component.setToggleClickHandler(this._handleToggleClick);
    this._component.setFavoriteClickHandler(this._handleFavoriteClick);

    this._editComponent = new PointEditView(this._data);
    this._editComponent.setToggleClickHandler(this._handleToggleClick);

    if( prevComponent === null || prevEditComponent === null ) {
      render(this._container, this._component, RenderPosition.BEFOREEND);
      return;
    }

    if( this._state === STATE.DEFAULT ) {
      replace(this._component, prevComponent);
    } else if( this._state === STATE.EDIT ) {
      replace(this._editComponent, prevEditComponent);
    }

    remove(prevComponent);
    remove(prevEditComponent);
  }

  _handleToggleClick() {
    if( this._state === STATE.DEFAULT ) {
      this._state = STATE.EDIT;
      replace(this._editComponent, this._component);
    } else {
      this._state = STATE.DEFAULT;
      replace(this._component, this._editComponent);
    }
  }

  _handleFavoriteClick() {
    this._data.isFavorite = !this._data.isFavorite;
    this._change(this._data);
  }

  destroy() {
    remove(this._component);
    remove(this._editComponent);
  }

}
