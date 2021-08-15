import { generatePointList } from './services/generator.js';
import {render, replace, RenderPosition} from './services/render.js';

import TripInfoView from './views/trip-info.js';
import FilterView from './views/filter.js';
import NavigationView from './views/navigation.js';
import SortView from './views/sort.js';
import PointListView from './views/point-list.js';
import PointView from './views/point.js';
import PointEditView from './views/point-edit.js';

const tripMainContainer = document.querySelector('.trip-main');
const navContainer = tripMainContainer.querySelector('.trip-controls__navigation');
const filterContainer = tripMainContainer.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripsContainer = siteMainElement.querySelector('.trip-events');

const points = generatePointList();

render( tripMainContainer, new TripInfoView(points), RenderPosition.AFTERBEGIN );
render( navContainer, new NavigationView(), RenderPosition.BEFOREEND );
render( filterContainer, new FilterView(), RenderPosition.BEFOREEND );
render( tripsContainer, new SortView(), RenderPosition.AFTERBEGIN );

const pointListComponent = new PointListView();
render( tripsContainer, pointListComponent, RenderPosition.BEFOREEND );
const pointsContainer = tripsContainer.querySelector('.trip-events__list');

points.forEach((point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  pointComponent.setEditClickHandler(() => replace(pointEditComponent, pointComponent));
  pointEditComponent.setToggleClickHandler(() => replace(pointComponent, pointEditComponent));

  render( pointsContainer, pointComponent, RenderPosition.AFTERBEGIN );
});


