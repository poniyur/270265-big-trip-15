const typeIconSrcLink = {
  'sightseeing': 'img/icons/sightseeing.png',
  'taxi': 'img/icons/taxi.png',
  'flight': 'img/icons/flight.png',
  'drive': 'img/icons/drive.png',
  'check-in': 'img/icons/check-in.png',
  'check-out': 'img/icons/check-out.png',
  'train': 'img/icons/train.png',
  'ship': 'img/icons/ship.png',
  'bus': 'img/icons/bus.png',
  'restaurant': 'img/icons/restaurant.png',
  'transport': 'img/icons/transport.png',
};

const typeNames = {
  'sightseeing': 'Sightseeing',
  'taxi': 'Taxi',
  'flight': 'Flight',
  'drive': 'Drive',
  'check-in': 'Check-in',
  'check-out': 'Check-out',
  'train': 'Train',
  'ship': 'Ship',
  'bus': 'Bus',
  'restaurant': 'Restaurant',
  'transport': 'Transport',
};

const OFFER_TYPES = {
  'taxi': ['Order Uber', 'Upgrade to a business class', 'Choose the radio station', 'Drive faster', 'Talk about life', 'Don\'t crush', 'Drive the car yourself'],
  'bus': ['Choose the radio station', 'Drive faster', 'Don\'t crush', 'Drive the bus yourself'],
  'train': ['Buy linens', 'Stay alone in the car', 'Drive the train yourself', 'Toss up coals'],
  'ship': ['Drive the ship yourself', 'Save Leo', 'Add breakfast'],
  'drive': ['Rent a car', 'Offer 2', 'Offer 3', 'Offer 4', 'Offer 5', 'Offer 6', 'Offer 7'],
  'flight': ['Add luggage', 'Switch to comfort', 'Switch to spaccship', 'Drive the airplane yourself', 'Jump from a parachute'],
  'check-in': ['Add breakfast', 'Offer 2', 'Offer 3', 'Offer 4', 'Offer 5', 'Offer 6', 'Offer 7'],
  'sightseeing': ['Book tickets', 'Lunch in city', 'Offer 3', 'Offer 5', 'Offer 6'],
  'restaurant': ['Cook with Gordon Ramsi', 'Dine on the veranda', 'Offer 3', 'Offer 4'],
};

const getIconSrc = (type) => typeIconSrcLink[type];

const getTypeLabel = (type) => typeNames[type];

const getOffersByType = (type) => OFFER_TYPES[type];

/*
Возможно сюда засуну методы для рабоыт с датами
*/

export {getIconSrc, getTypeLabel, getOffersByType};
