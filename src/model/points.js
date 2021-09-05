import Model from '../mvp/model.js';

export default class Points extends Model {
  constructor() {
    super();
    this._points = [];
  }

  set(points) {
    this._points = points.slice();
  }

  get() {
    return this._points;
  }
}
