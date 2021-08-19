import TripInfoView from '../views/trip-info.js';
import FilterView from '../views/filter.js';
import NavigationView from '../views/navigation.js';
import SortView from '../views/sort.js';
import PointListView from '../views/point-list.js';
import PointPresenter from './point.js';

import {render, RenderPosition} from '../services/render.js';

export default class Trip {

  constructor(options) {
    this._points = options.points.slice();

    this._headerContainer = options.headerContainer;
    this._navigationContainer = this._headerContainer.querySelector('.trip-controls__navigation');
    this._filterContainer = this._headerContainer.querySelector('.trip-controls__filters');

    this._bodyContainer = options.bodyContainer;

    this._infoComponent = new TripInfoView(this._points);
    this._navigationComponent = new NavigationView();
    this._filterComponent = new FilterView();
    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();
  }

  run() {
    this._renderMain();
  }

  _renderInfo() {
    render(this._headerContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNav() {
    render( this._navigationContainer, this._navigationComponent, RenderPosition.BEFOREEND );
  }

  _renderFilter() {
    render( this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND );
  }

  _renderSort() {
    render( this._bodyContainer, this._sortComponent, RenderPosition.AFTERBEGIN );
  }

  _renderPointList() {
    render( this._bodyContainer, this._pointListComponent, RenderPosition.BEFOREEND );
    this._points.forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderPoint(point) {

    const pointPresenter = new PointPresenter({
      container: this._pointListComponent,
      data: point,
    });

    pointPresenter.run();
  }

  _renderMain() {
    this._renderInfo();
    this._renderNav();
    this._renderFilter();
    this._renderSort();
    this._renderPointList();
  }

}
