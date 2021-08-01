import { createNavigationTemplate } from './views/navigation.js';
import { createFilterTemplate } from './views/filter.js';
import { createTripInfoTemplate } from './views/trip-info.js';
import { createSortTemplate } from './views/sort.js';
import { createTripListTemplate } from './views/trip-list.js';
// import { createTripAddTemplate } from './views/trip-add.js';
// import { createTripEditTemplate } from './views/trip-edit.js';
// import { createStatTemplate } from './view/trip-edit.js';
// import { generatePointList } from './services/generator.js';

// console.log(generatePointList());

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


// const tripsListContainer = tripsContainer.querySelector('.trip-events__list');
// renderStart( tripsListContainer, createTripEditTemplate() );
// renderStart( tripsListContainer, createTripAddTemplate() );
