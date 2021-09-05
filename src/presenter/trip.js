import TripInfoView from '../view/trip-info.js';
import FilterView from '../view/filter.js';
import NavigationView from '../view/navigation.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import PointPresenter from './point.js';

import {render, RenderPosition} from '../service/render.js';

export default class Trip {

  constructor(options) {
    this._pointsModel = options.pointsModel;
    this._headerContainer = options.headerContainer;
    this._navigationContainer = this._headerContainer.querySelector('.trip-controls__navigation');
    this._filterContainer = this._headerContainer.querySelector('.trip-controls__filters');

    this._bodyContainer = options.bodyContainer;

    this._infoComponent = new TripInfoView(this._getPoints());
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

  _getPoints() {
    return this._pointsModel.get();
  }

  _handlePointChange(updatedPoint) {
    this._pointMap.set(updatedPoint.id, updatedPoint); // TODO СУКА
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
    this._getPoints().forEach((point) => {
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
