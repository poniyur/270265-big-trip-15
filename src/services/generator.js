import { getRandomValueFromArray, getRandomPositiveInt, shuffleArray } from './utils.js';
import dayjs from 'dayjs';

// options
const COUNT = 20;
const PHOTO_COUNT = 4;
const DESCRIPTION_LENGTH = 5;

// trip/point options
let pointId = 0;
let nextPointDate = dayjs().add(getRandomPositiveInt(10), 'day');
const TRIP_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DESTINATIONS = ['Harrington Park', 'Atmore', 'Halsey', 'Bylas', 'North Mankato', 'Newburyport', 'Juliaetta', 'Oketo', 'Luray', 'Sailor Springs', 'Teton Village', 'Ponemah', 'Arden', 'Minorca', 'Boulder', 'Little Valley', 'Candlewood Lake', 'Grand Coteau', 'Tupelo', 'Wiggins', 'Marlette', 'Riverland', 'Haiku', 'Fleetwood', 'Joy', 'Judson', 'Belen', 'Weigelstown', 'New Braunfels', 'Neck City', 'Port Vincent', 'Ellisburg', 'Onida', 'Baumstown', 'Huguley', 'Jenkinsburg', 'Roseboro', 'Obion', 'Missouri City', 'Marco Island', 'Hope', 'Smithers', 'Highland Heights', 'Salt Creek', 'Baidland', 'Gulf Park Estates', 'Oakes', 'Greenland', 'Seaside', 'Williston Park'];


// offer options
const OFFER_TYPES = {
  'Taxi': ['Order Uber', 'Upgrade to a business class', 'Choose the radio station', 'Drive faster', 'Talk about life', 'Don\'t crush', 'Drive the car yourself'],
  'Bus': ['Choose the radio station', 'Drive faster', 'Don\'t crush', 'Drive the bus yourself'],
  'Train': ['Buy linens', 'Stay alone in the car', 'Drive the train yourself', 'Toss up coals'],
  'Ship': ['Drive the ship yourself', 'Save Leo', 'Add breakfast'],
  'Drive': ['Rent a car', 'Offer 2', 'Offer 3', 'Offer 4', 'Offer 5', 'Offer 6', 'Offer 7'],
  'Flight': ['Add luggage', 'Switch to comfort', 'Switch to spaccship', 'Drive the airplane yourself', 'Jump from a parachute'],
  'Check-in': ['Add breakfast', 'Offer 2', 'Offer 3', 'Offer 4', 'Offer 5', 'Offer 6', 'Offer 7'],
  'Sightseeing': ['Book tickets', 'Lunch in city', 'Offer 3', 'Offer 5', 'Offer 6'],
  'Restaurant': ['Cook with Gordon Ramsi', 'Dine on the veranda', 'Offer 3', 'Offer 4'],
};

const fishText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';


// funcs

const generateOfferList = (type) => {
  let offerCount = getRandomPositiveInt(5);

  const list = [];
  const offerTitles = shuffleArray(OFFER_TYPES[type]);
  let offerId = 1;

  while(offerCount--) {

    const title = offerTitles.pop();
    if( !title ) {
      break;
    }

    list.push({
      id: offerId++,
      title,
      price: getRandomPositiveInt(25) * 10,
      isChecked: Math.random() > 0.5,
    });
  }

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

export {generatePointList};
