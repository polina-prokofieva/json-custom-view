import { isObject } from './utils/isObject.js';
import styles from './assets/style.module.less';

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

const toggleVisibility = objectElement => {
  objectElement.classList.toggle(styles.opened);

  if (!objectElement.classList.contains(styles.opened)) {
    const allOpenedChildren = objectElement.querySelectorAll(
      `.${styles.opened}`
    );

    allOpenedChildren.forEach(element => {
      element.classList.remove(styles.opened);
    });
  }
};

const renderObject = (data, className = styles.main) => {
  const mainElement = createSimpleDOMElement('div', null, className);

  for (const key in data) {
    const value = data[key];
    const type = Array.isArray(value) ? 'array' : typeof value;

    const objectElement = createSimpleDOMElement('div', null, [
      styles.field,
      styles[type],
    ]);

    const { keyElement, fragment } = renderField(key, value);

    objectElement.appendChild(fragment);
    keyElement.addEventListener('click', () => toggleVisibility(objectElement));

    mainElement.appendChild(objectElement);
  }

  return mainElement;
};

const renderField = (key, value) => {
  const fragment = document.createDocumentFragment();
  const keyElement = createSimpleDOMElement('span', key, styles.key);

  fragment.appendChild(keyElement);

  if (typeof value === 'object') {
    fragment.appendChild(renderObject(value, styles.value));
  } else {
    fragment.appendChild(createSimpleDOMElement('span', ': ', styles.value));
    fragment.appendChild(createSimpleDOMElement('span', value, styles.value));
  }

  return { keyElement, fragment };
};

export const render = (convertedData, rootElement) => {
  const mainElement = renderObject(convertedData);

  rootElement.appendChild(mainElement);
};
