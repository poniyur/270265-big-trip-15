import { generatePointList } from './services/generator.js';

import TripPresenter from './presenters/trip.js';
import Points from './model/points.js';


const points = generatePointList();

const pointsModel = new Points;
pointsModel.set(points);

const tripPresenter = new TripPresenter({
  headerContainer: document.querySelector('.trip-main'),
  bodyContainer: document.querySelector('.trip-events'),
  pointsModel,
});

tripPresenter.run();

