import { createElement } from '../services/utils.js';

const getTripInfoTemplate = (data) => /*html*/`
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${data.title}</h1>

      <p class="trip-info__dates">${data.viewDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${data.total}</span>
    </p>
  </section>
`;

const getOffersSum = (offers) => {
  let sum = 0;
  offers.forEach((offer) => {
    if( offer.isChecked ) {
      sum += offer.price;
    }
  });
  return sum;
};

const calculateDataFromPoints = (points) => {
  const startPoint = points.shift();

  const destinations = [startPoint.destination];
  const startDate = startPoint.dateFrom;
  let finishDate = undefined;
  let total = startPoint.basePrice + getOffersSum(startPoint.offers);

  if(points) {
    points.forEach((point) => {
      total += point.basePrice + getOffersSum(point.offers);
    });

    const endPoint = points.pop();
    finishDate = endPoint.dateTo;
    destinations.push(endPoint.destination);
  }

  const title = destinations.join(' &mdash; ');
  let viewDate = startDate.format('MMM DD');

  const sameDay = finishDate ?
    startDate.day() === finishDate.day() &&
    startDate.month() === finishDate.month() &&
    startDate.year() === finishDate.year()
    : true;

  if( finishDate && !sameDay) {
    const viewFormat = finishDate.month() === startDate.month() ? 'DD' : 'MMM DD';
    viewDate += `&nbsp;&mdash;&nbsp;${finishDate.format(viewFormat)}`;
  }

  return {title, viewDate, total};
};


export default class TripInfo {
  constructor(points) {
    this._data.data = calculateDataFromPoints(points);
    this._element = null;
  }

  getTemplate() {
    return getTripInfoTemplate(this._data.data);
  }

  getElement() {
    if( !this._element ) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
