import { isObject } from './utils/isObject.js';
import { notifications } from './notifications.js';
import { convertByMask } from './utils/formatKeys.js';
import { getSettings } from './settings.js';
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

const renderObject = (data, className = styles.main, specialKeys) => {
  const settings = getSettings();
  const mainElement = createSimpleDOMElement('div', null, className);

  for (const key in data) {
    const value = data[key];
    const type = Array.isArray(value) ? 'array' : typeof value;

    const objectElement = createSimpleDOMElement('div', null, [
      styles.field,
      styles[type],
    ]);

    const { keysForArrays, keysDict, keysOldToNew } = settings;
    const oldKey = keysDict[key];

    const specialKeysForInnerArray =
      keysForArrays && keysForArrays[oldKey] && type === 'array'
        ? keysForArrays[oldKey]
        : null;

    const specialKey = specialKeys
      ? convertByMask(value, specialKeys, keysOldToNew)
      : key;

    const { keyElement, fragment } = renderField(
      specialKey,
      value,
      specialKeysForInnerArray
    );

    objectElement.appendChild(fragment);
    keyElement.addEventListener('click', () => toggleVisibility(objectElement));

    mainElement.appendChild(objectElement);
  }

  return mainElement;
};

const renderField = (key, value, specialKeysForInnerArray) => {
  const fragment = document.createDocumentFragment();
  const keyElement = createSimpleDOMElement('span', key, styles.key);

  fragment.appendChild(keyElement);

  if (typeof value === 'object') {
    fragment.appendChild(
      renderObject(value, styles.value, specialKeysForInnerArray)
    );
  } else {
    fragment.appendChild(createSimpleDOMElement('span', ': ', styles.value));
    fragment.appendChild(createSimpleDOMElement('span', value, styles.value));
  }

  return { keyElement, fragment };
};

const renderNotifications = () => {
  const notificationsElement = createSimpleDOMElement(
    'div',
    null,
    styles.notifications
  );

  notifications.forEach(({ type, text }) => {
    notificationsElement.appendChild(
      createSimpleDOMElement('div', text, styles[type])
    );
  });

  return notificationsElement;
};

export const render = (convertedData, rootElement) => {
  const settings = getSettings();
  const { showNotifications } = settings;

  if (showNotifications && notifications.length) {
    rootElement.appendChild(renderNotifications());
  }

  const mainElement = renderObject(convertedData);
  rootElement.appendChild(mainElement);
};
