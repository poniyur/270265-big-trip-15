export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

export const getRandomValueFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomPositiveInt = (max) => getRandomInt(1, max);

export const shuffleArray = (arr) => {
  const randomSortFunc = () => Math.random() - 0.5;
  return arr.sort(randomSortFunc);
};
