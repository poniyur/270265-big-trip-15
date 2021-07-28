import { createNavigationTemplate } from './view/navigation.js';
import { createFilterTemplate } from './view/filter.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createSortTemplate } from './view/sort.js';
import { createTripListTemplate } from './view/trip-list.js';
import { createTripAddTemplate } from './view/trip-add.js';
import { createTripEditTemplate } from './view/trip-edit.js';
// import { createStatTemplate } from './view/trip-edit.js';

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

renderStart( tripMainContainer, createTripInfoTemplate() );
renderEnd( navContainer, createNavigationTemplate() );
renderEnd( filterContainer, createFilterTemplate() );
renderStart( tripsContainer, createSortTemplate() );
renderEnd( tripsContainer, createTripListTemplate() );


const tripsListContainer = tripsContainer.querySelector('.trip-events__list');
renderStart( tripsListContainer, createTripEditTemplate() );
renderStart( tripsListContainer, createTripAddTemplate() );
