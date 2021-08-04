const getOffersSum = (offers) => {
  let sum = 0;
  offers.forEach((offer) => {
    if( offer.isChecked ) {
      sum += offer.price;
    }
  });
  return sum;
};

const renderTripInfo = (points) => {

  const startPoint = points.shift();

  const destinations = [startPoint.destination];
  const startDate = startPoint.dateFrom;
  let finishDate = undefined;
  let total = startPoint.basePrice + getOffersSum(startPoint.offers);

  if(points) {
    points.forEach((point) => {
      if( destinations[length.destinations - 1] !== point.destination ) {
        destinations.push(point.destination);
      }
      total += point.basePrice + getOffersSum(point.offers);
    });

    const endPoint = points.pop();
    finishDate = endPoint.dateTo;
  }

  const title = destinations.join(' &mdash; ');
  let viewDate = startDate.format('MMM DD');

  const sameDay = finishDate ?
    startDate.day() === finishDate.day() &&
    startDate.month() === finishDate.month() &&
    startDate.year() === finishDate.year()
    : true;

  if( finishDate && !sameDay) {
    if( finishDate.month() === startDate.month() ) {
      viewDate += `&nbsp;&mdash;&nbsp;${finishDate.format('DD')}`;
    } else {
      viewDate += `&nbsp;&mdash;&nbsp;${finishDate.format('MMM DD')}`;
    }
  }

  return /*html*/`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>

        <p class="trip-info__dates">${viewDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
      </p>
    </section>
  `;


};

export {renderTripInfo};


