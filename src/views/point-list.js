import {render as renderPoint} from './point.js';

const render = (points) => {

  const htmlPoints = [];
  points.forEach((point) => {
    htmlPoints.push(renderPoint(point));
  });

  return `
    <ul class="trip-events__list">
      ${htmlPoints.join('\n')}
    </ul>
  `;
};

export {render};


