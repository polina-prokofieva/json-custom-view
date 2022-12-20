import { isObject } from './utils/isObject.js';

const createSimpleDOMElement = (tag, value = '', classNameOrOptions) => {
  const element = document.createElement(tag);
  element.innerHTML = value;

  if (isObject(classNameOrOptions)) {
    for (let param in classNameOrOptions) {
      element[param] = classNameOrOptions[param];
    }
  } else {
    const classNames = Array.isArray(classNameOrOptions)
      ? classNameOrOptions.join(' ')
      : classNameOrOptions;

    element.className = classNames;
  }

  return element;
};

const renderSimpleValue = (key, value) => {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(createSimpleDOMElement('span', key, 'key'));
  fragment.appendChild(createSimpleDOMElement('span', ': ', 'value'));
  fragment.appendChild(createSimpleDOMElement('span', value, 'value'));

  return fragment;
};

export const render = (convertedData, rootElement) => {
  const mainElement = createSimpleDOMElement('div', null, {
    className: 'main',
  });

  for (const key in convertedData) {
    const value = convertedData[key];
    const objectElement = createSimpleDOMElement('div', null, [
      'field',
      typeof value,
    ]);

    objectElement.appendChild(renderSimpleValue(key, value));
    mainElement.appendChild(objectElement);
  }

  rootElement.appendChild(mainElement);
};
