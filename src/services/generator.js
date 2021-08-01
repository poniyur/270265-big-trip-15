import { getRandomValueFromArray, getRandomPositiveInt, shuffleArray } from './utils.js';
import dayjs from 'dayjs';

// options
const COUNT = 20;

// trip/point options
let pointId = 0;
const nextPointDate = dayjs().add(getRandomPositiveInt(10), 'day');
const TRIP_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DESTIONATIONS = ['Harrington Park', 'Atmore', 'Halsey', 'Bylas', 'North Mankato', 'Newburyport', 'Juliaetta', 'Oketo', 'Luray', 'Sailor Springs', 'Teton Village', 'Ponemah', 'Arden', 'Minorca', 'Boulder', 'Little Valley', 'Candlewood Lake', 'Grand Coteau', 'Tupelo', 'Wiggins', 'Marlette', 'Riverland', 'Haiku', 'Fleetwood', 'Joy', 'Judson', 'Belen', 'Weigelstown', 'New Braunfels', 'Neck City', 'Port Vincent', 'Ellisburg', 'Onida', 'Baumstown', 'Huguley', 'Jenkinsburg', 'Roseboro', 'Obion', 'Missouri City', 'Marco Island', 'Hope', 'Smithers', 'Highland Heights', 'Salt Creek', 'Baidland', 'Gulf Park Estates', 'Oakes', 'Greenland', 'Seaside', 'Williston Park'];


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


// funcs

const generateOfferList = (type) => {
  let offerCount = getRandomPositiveInt(5);

  const list = [];
  const offerTitles = shuffleArray(OFFER_TYPES[type]);

  while(offerCount--) {

    const title = offerTitles.pop();
    if( !title ) {
      break;
    }

    list.push({
      title,
      price: getRandomPositiveInt(25) * 10,
    });
  }

  return list;
};

const getPointDates = () => {
  const dates = [];
  dates.push(nextPointDate.clone());
  dates.push(nextPointDate.add(getRandomPositiveInt(120), 'm').clone());

  nextPointDate.add(getRandomPositiveInt(200), 'm');
  return dates;
};

// const generatePointDates
const generatePoint = () => {
  const type = getRandomValueFromArray(TRIP_TYPES);

  const dates = getPointDates();

  const point = {
    id: ++pointId,
    type,
    destination: getRandomValueFromArray(DESTIONATIONS),
    basePrice: getRandomPositiveInt(200) * 10,
    dateFrom: dates[0],
    dateTo: dates[1],
    isFavorite: Math.random() < 0.75,
    offers: generateOfferList(type),
  };

  return point;
};


const generatePointList = () => [...new Array(COUNT)].map(() => generatePoint());

export {generatePointList};
