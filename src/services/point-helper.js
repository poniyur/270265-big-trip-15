const typeIconSrcLink = {
  'Sightseeing': 'img/icons/sightseeing.png',
  'Taxi': 'img/icons/taxi.png',
  'Flight': 'img/icons/flight.png',
  'Drive': 'img/icons/drive.png',
  'Check-in': 'img/icons/check-in.png',
  'Check-out': 'img/icons/check-out.png',
  'Train': 'img/icons/train.png',
  'Ship': 'img/icons/ship.png',
  'Bus': 'img/icons/bus.png',
  'Restaurant': 'img/icons/restaurant.png',
};

const getIconSrc = (type) => typeIconSrcLink[type];

/*
Возможно сюда засуну методы для рабоыт с датами
*/

export {getIconSrc};
