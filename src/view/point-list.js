import View from '../mvp/view.js';

const getPointListTemplate = () =>/*html*/`
  <ul class="trip-events__list">
  </ul>
`;

export default class PointList extends View {

  getTemplate() {
    return getPointListTemplate();
  }

}


