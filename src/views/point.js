import {getIconSrc} from '../services/point-helper.js';
import View from '../mvp/view.js';

const getViewTime = (dayjsDate) => {

  const minutes = dayjsDate.minute();
  const step = 5;
  const offset = minutes % step;

  const roundedMinutes = (offset >= step/2) ? minutes + step - offset : minutes - offset;

  return dayjsDate.minute(roundedMinutes);
};

const getViewDuration = (diffInMunutes) => {

  const durationHours = Math.floor(diffInMunutes / 60);
  const durationMinutes = diffInMunutes - 60 * durationHours;

  return durationHours > 0 ?
    `${durationHours}H ${durationMinutes}M`
    : `${durationMinutes}M`;
};

const getViewOffers = (offers) => {

  offers = offers.filter((offer) => offer.isChecked);

  if( !offers ) {
    return '';
  }

  const html = [];
  offers.forEach((offer) => {
    html.push(/*html*/`
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `);
  });

  return html.join('\n');
};

const getPointTemplate = (point) => {
  const viewDateFrom = getViewTime(point.dateFrom);
  const viewDateTo = getViewTime(point.dateTo);
  const viewDuration = getViewDuration(viewDateTo.diff(viewDateFrom, 'm'));
  const favoriteClass = point.isFavorite === true ? 'event__favorite-btn--active' : '';


  return /*html*/`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${viewDateFrom.format('YYYY-MM-DD')}">${viewDateFrom.format('MMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${getIconSrc([point.type])}" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.type} ${point.destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${viewDateFrom.format('YYYY-MM-DDThh:mm')}">${viewDateFrom.format('hh:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${viewDateTo.format('YYYY-MM-DDThh:mm')}">${viewDateTo.format('hh:mm')}</time>
          </p>
          <p class="event__duration">${viewDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getViewOffers(point.offers)}
        </ul>
        <button class="event__favorite-btn ${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class Point extends View {
  constructor(point) {
    super();
    this._point = point;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return getPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._editClickHandler);
  }
}
