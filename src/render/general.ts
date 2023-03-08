import { notifications } from '../notifications';
import { getSettings } from '../settings';
import { renderObject, renderSimpleValue } from './object';
import { ValueType } from '../types';
import styles from '../assets/style.module.less';

export const createSimpleDOMElement = (
  tag: string,
  value: string = '',
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

const renderSingleValue = (
  value: number | string | boolean | null
): HTMLElement => {
  const valueElement = createSimpleDOMElement('div', '', styles[typeof value]);
  valueElement.appendChild(renderSimpleValue(value));

  const mainElement = createSimpleDOMElement('div', '', styles.main);
  mainElement.appendChild(valueElement);

  return mainElement;
};

export const render = (
  convertedData: ValueType,
  rootElement: HTMLElement
): void => {
  const settings = getSettings();
  const { showNotifications } = settings;

  if (showNotifications && notifications.length) {
    rootElement.appendChild(renderNotifications());
  }

  let mainElement;

  if (convertedData && typeof convertedData === 'object') {
    mainElement = renderObject(convertedData);
  } else {
    mainElement = renderSingleValue(
      convertedData as string | boolean | number | null
    );
  }
  rootElement.appendChild(mainElement);
};
