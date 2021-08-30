import SmartView from '../mvp/smart-view.js';
import {getIconSrc, getTypeLabel, getOffersByType} from '../services/point-helper.js';
import { getRandomPositiveInt } from '../services/utils.js';


const renderEventTypeList = (type) => {

  const queue = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const html = [`
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
  `];

  queue.forEach((_type) => {
    const checked = _type === type ? 'checked' : '';
    html.push(`
      <div class="event__type-item">
        <input id="event-type-${_type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${_type}" ${checked}>
        <label class="event__type-label  event__type-label--${_type}" for="event-type-${_type}-1">${getTypeLabel(_type)}</label>
      </div>
    `);
  });

  html.push(`
      </fieldset>
    </div>
  `);

  return html.join('\n');

};

const getViewTime = (dayjsDate) => dayjsDate.format('DD/MM/YY hh:mm');

const renderOffersSection = (offers) => {
  const htmlChecked = [];
  const htmlUnchecked = [];
  offers.forEach((offer) => {
    const html = /*html*/`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${offer.id}" type="checkbox" name="event-offer-comfort" ${offer.isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-comfort-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
    if( offer.isChecked ) {
      htmlChecked.push(html);
    } else {
      htmlUnchecked.push(html);
    }
  });

  return /*html*/`
    <div class="event__available-offers">
      ${htmlChecked.join('\n')}
      ${htmlUnchecked.join('\n')}
    </div>
  `;
};

const getPointEditTemplate = (data) =>/*html*/`
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${getIconSrc(data.type)}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          ${renderEventTypeList(data.type)}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${data.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${data.destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="${data.destination}"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getViewTime(data.dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getViewTime(data.dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${data.basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${renderOffersSection(data.offers)}
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${data.description}</p>
        </section>
      </section>
    </form>
  </li>
`;

export default class PointEdit extends SmartView {

  constructor(data) {
    super(data);

    this._toggleClickHandler = this._toggleClickHandler.bind(this);

    this._formChangeHandler = this._formChangeHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);


    this._innerHandlers = {
      'event-type' : this._changeTypeHandler,
    };

    this.restoreHandlers();
  }

  restoreHandlers(withOuterHandlers = false) {
    this
      .getElement()
      .querySelector('.event--edit')
      .addEventListener('change', this._formChangeHandler);

    if( withOuterHandlers ) {
      this.setToggleClickHandler(this._callback.toggle);
    }
  }

  getTemplate() {
    return getPointEditTemplate(this._data);
  }

  _toggleClickHandler(evt) {
    evt.preventDefault();
    this._callback.toggle();
  }

  setToggleClickHandler(callback) {
    this._callback.toggle = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._toggleClickHandler);
  }

  // inner handlers

  _formChangeHandler(evt) {

    let needToRestoreHandlers = false;

    const name = evt.target.getAttribute('name');

    if( name in this._innerHandlers ) {
      needToRestoreHandlers = this._innerHandlers[name](evt);
    }

    if( needToRestoreHandlers ) {
      this.restoreHandlers(true);
    }
  }

  _changeTypeHandler(evt) {
    evt.preventDefault();

    const newType = evt.target.value;

    if( this._data.type !== newType ) {

      const offersList = [];
      const offers = getOffersByType(this._data.type);
      let offerId = 1;

      offers.forEach((offer) => {
        offersList.push({
          id: offerId++,
          title: offer,
          price: getRandomPositiveInt(25) * 10, //
          isChecked: false,
        });
      });

      this.updateData({
        type: newType,
        offers: offersList,
      });

      return true;
    }

    return false;
  }

}
