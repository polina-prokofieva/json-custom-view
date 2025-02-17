import { notifications } from '../notifications';
import { getSettings } from '../settings';
import { generateKeyForInnerArray, renderObject, renderSimpleValue } from './object';
import { ObjectValueType, ValueType } from '../types';
import { onKeyPress } from '../keyboardNavigation';
import styles from '../assets/style.module.less';
import { isRootTable } from '../utils/root';
import { renderTableValue } from './renderTable';

export const createSimpleDOMElement = (
  tag: string,
  value: string = '',
  classNames?: string | string[],
  attributes?: { [key: string]: string }
): HTMLElement => {
  const element = document.createElement(tag);
  element.innerHTML = value;

  if (!classNames && !attributes) return element;

  const classNamesValue = Array.isArray(classNames)
    ? classNames.join(' ')
    : classNames;

  element.className = classNamesValue;

  attributes &&
    Object.keys(attributes).forEach((key: string) =>
      element.setAttribute(key, attributes[key])
    );

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

  let mainElement: HTMLElement;

  if (convertedData && typeof convertedData === 'object') {
    if (Array.isArray(convertedData)) {

      if (isRootTable()) {
        mainElement = renderTableValue(convertedData as ObjectValueType[]);
        mainElement.classList.add(styles.array, styles.opened);
      } else {
        const specialKeysForInnerArray = generateKeyForInnerArray(
          '',
          'array',
        );
    
        mainElement = renderObject(
          convertedData,
          styles.cell,
          specialKeysForInnerArray
        );
      }
    } else {
      mainElement = renderObject(convertedData);
    }
  } else {
    mainElement = renderSingleValue(
      convertedData as string | boolean | number | null
    );
  }
  rootElement.appendChild(mainElement);

  document.addEventListener('keydown', (evt) => onKeyPress(evt, mainElement));
};
