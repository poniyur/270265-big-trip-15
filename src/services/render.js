import View from '../mvp/view.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {

  if( container instanceof View ) {
    container = container.getElement();
  }

  if( element instanceof View ) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof View) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof View) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const createElement = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

export const remove = (component) => {
  if (!(component instanceof View)) {
    throw new Error('Can remove only View components');
  }

  component.getElement().remove();
  component.removeElement();
};
