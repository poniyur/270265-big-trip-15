import { generatePointList } from './service/generator.js';

import TripPresenter from './presenter/trip.js';
import Points from './model/points.js';


const points = generatePointList();

const pointsModel = new Points();
pointsModel.set(points);

const tripPresenter = new TripPresenter({
  headerContainer: document.querySelector('.trip-main'),
  bodyContainer: document.querySelector('.trip-events'),
  pointsModel,
});

tripPresenter.run();

