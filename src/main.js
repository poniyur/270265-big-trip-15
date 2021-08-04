import { createNavigationTemplate } from './views/navigation.js';
import { createFilterTemplate } from './views/filter.js';
import { renderTripInfo } from './views/trip-info.js';
import { createSortTemplate } from './views/sort.js';
import { render as renderPoints } from './views/point-list.js';
import { renderEditPoint } from './views/point-edit.js';
import { generatePointList } from './services/generator.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderStart = (container, template) => render(container, template, 'afterbegin');
const renderEnd = (container, template) => render(container, template, 'beforeend');

const tripMainContainer = document.querySelector('.trip-main');
const navContainer = tripMainContainer.querySelector('.trip-controls__navigation');
const filterContainer = tripMainContainer.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripsContainer = siteMainElement.querySelector('.trip-events');


const points = generatePointList();

renderStart( tripMainContainer, renderTripInfo(points) );
renderEnd( navContainer, createNavigationTemplate() );
renderEnd( filterContainer, createFilterTemplate() );
renderStart( tripsContainer, createSortTemplate() );

const firstPoint = points.shift();
renderEnd( tripsContainer, renderPoints(points) );

const tripsListContainer = tripsContainer.querySelector('.trip-events__list');
renderStart( tripsListContainer, renderEditPoint(firstPoint) );
