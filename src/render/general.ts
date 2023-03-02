import { isObject } from '../utils/isObject';
import { notifications } from '../notifications';
import { getSettings } from '../settings';
import { renderObject } from './object';
import styles from '../assets/style.module.less';

export const createSimpleDOMElement = (
  tag: string,
  value = '',
  classNames?: string | string[]
): HTMLElement => {
  const element = document.createElement(tag);
  element.innerHTML = value;

  if (!classNames) return element;

  const classNamesValue = Array.isArray(classNames)
    ? classNames.join(' ')
    : classNames;

  element.className = classNamesValue;

  return element;
};

const renderNotifications = (): HTMLElement => {
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

export const render = (convertedData: any, rootElement: HTMLElement): void => {
  const settings = getSettings();
  const { showNotifications } = settings;

  if (showNotifications && notifications.length) {
    rootElement.appendChild(renderNotifications());
  }

  const mainElement = renderObject(convertedData);
  rootElement.appendChild(mainElement);
};
