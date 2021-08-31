import { getRandomValueFromArray, getRandomPositiveInt } from './utils.js';
import { getOffersByType, DESTINATIONS, TRIP_TYPES } from './point-helper';
import dayjs from 'dayjs';

// options
const COUNT = 10;
const PHOTO_COUNT = 4;
const DESCRIPTION_LENGTH = 5;

// trip/point options
let pointId = 0;
let nextPointDate = dayjs().add(getRandomPositiveInt(10), 'day');

const fishText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

// funcs

const generateOfferList = (type) => {

  const list = [];
  const offers = getOffersByType(type);
  let offerId = 1;

  offers.forEach((offer) => {
    list.push({
      id: offerId++,
      title: offer,
      price: getRandomPositiveInt(25) * 10,
      isChecked: Math.random() > 0.7,
    });
  });

  return list;
};

const getPointDates = () => {
  const dates = [];
  dates.push(nextPointDate.clone());
  nextPointDate = nextPointDate.add(getRandomPositiveInt(120), 'm');
  dates.push(nextPointDate.clone());

  nextPointDate = nextPointDate.add(getRandomPositiveInt(30), 'm');
  return dates;
};

const getDescription = () => {

  const text = [];
  const list = fishText.split('. ');
  let count = getRandomPositiveInt(DESCRIPTION_LENGTH);
  while( count-- ) {
    text.push(getRandomValueFromArray(list));
  }
  text.push('');

  return text.join('. ');
};

const getPhotos = () => {

  const photos = [];
  let count = getRandomPositiveInt(PHOTO_COUNT);
  while( count-- ) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

// const generatePointDates
const generatePoint = () => {
  const type = getRandomValueFromArray(TRIP_TYPES);

  const dates = getPointDates();

  return {
    id: ++pointId,
    type,
    destination: getRandomValueFromArray(DESTINATIONS),
    basePrice: getRandomPositiveInt(20) * 10,
    dateFrom: dates[0],
    dateTo: dates[1],
    isFavorite: Math.random() > 0.75,
    offers: generateOfferList(type),
    description: getDescription(),
    photos: getPhotos(),
  };
};


const generatePointList = () => [...new Array(COUNT)].map(() => generatePoint());

export {generatePointList, getDescription, getPhotos};
