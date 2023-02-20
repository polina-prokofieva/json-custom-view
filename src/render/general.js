import { isObject } from '../utils/isObject';
import { notifications } from '../notifications';
import { getSettings } from '../settings';
import { renderObject } from './object';
import styles from '../assets/style.module.less';

export const createSimpleDOMElement = (tag, value = '', classNameOrOptions) => {
  const element = document.createElement(tag);
  element.innerHTML = value;

  if (!classNameOrOptions) return element;

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
