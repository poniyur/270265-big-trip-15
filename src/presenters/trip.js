import TripInfoView from '../views/trip-info.js';
import FilterView from '../views/filter.js';
import NavigationView from '../views/navigation.js';
import SortView from '../views/sort.js';
import PointListView from '../views/point-list.js';
import PointPresenter from './point.js';

import {render, RenderPosition} from '../services/render.js';

export default class Trip {

  constructor(options) {
    this._pointMap = options.points.reduce((acc, point) => acc.set(point.id, point), new Map());
    this._headerContainer = options.headerContainer;
    this._navigationContainer = this._headerContainer.querySelector('.trip-controls__navigation');
    this._filterContainer = this._headerContainer.querySelector('.trip-controls__filters');

    this._bodyContainer = options.bodyContainer;

    this._infoComponent = new TripInfoView(Array.from(this._pointMap.values()));
    this._navigationComponent = new NavigationView();
    this._filterComponent = new FilterView();
    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();

    this._pointPresenterMap = new Map();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleStateChange = this._handleStateChange.bind(this);

  }

  run() {
    this._renderMain();
  }

  _handlePointChange(updatedPoint) {
    this._pointMap.set(updatedPoint.id, updatedPoint);
    this._pointPresenterMap.get(updatedPoint.id).run();
  }

  _handleStateChange() {
    this._pointPresenterMap.forEach((presenter) => presenter.resetView());
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
    this._pointMap.forEach((point) => {
      this._renderPoint(point);
    });
  }

  _clearPointList() {
    this._pointPresenterMap.forEach((presenter) => presenter.destroy());
    this._pointPresenterMap.clear();
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this._pointListComponent,
      data: point,
      change: this._handlePointChange,
      changeState: this._handleStateChange,
    });

    pointPresenter.run();
    this._pointPresenterMap.set(point.id, pointPresenter);
  }

  _renderMain() {
    this._renderInfo();
    this._renderNav();
    this._renderFilter();
    this._renderSort();
    this._renderPointList();
  }

}
