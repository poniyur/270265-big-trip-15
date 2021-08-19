import { generatePointList } from './services/generator.js';

import TripPresenter from './presenters/trip.js';


const tripPresenter = new TripPresenter({
  headerContainer: document.querySelector('.trip-main'),
  bodyContainer: document.querySelector('.trip-events'),
  points: generatePointList(),
});

tripPresenter.run();

