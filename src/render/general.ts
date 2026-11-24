import { notifications } from '../notifications';
import { getSettings } from '../settings';
import {
  generateKeyForInnerArray,
  renderObject,
  renderSimpleValue,
} from './object';
import { ObjectValueType, ValueType } from '../types';
import { onKeyPress } from '../keyboardNavigation';
import styles from '../assets/style.module.less';
import { getLastRootKey, isRootTable } from '../utils/root';
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

  if (attributes) {
    Object.keys(attributes).forEach((key: string) =>
      element.setAttribute(key, attributes[key])
    );
  }

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

/**
 * Appends the notifications block to `rootElement` when there are
 * notifications and `showNotifications` is on.
 */
export const renderNotificationsInto = (rootElement: HTMLElement): void => {
  const { showNotifications } = getSettings();

  if (showNotifications && notifications.length) {
    rootElement.appendChild(renderNotifications());
  }
};

/**
 * Builds the element for already converted data without attaching it to
 * the document. It may throw for data it cannot render.
 */
export const renderData = (convertedData: ValueType): HTMLElement => {
  let mainElement: HTMLElement;

  if (convertedData && typeof convertedData === 'object') {
    if (isRootTable(convertedData)) {
      mainElement = renderTableValue(convertedData as ObjectValueType[]);
      mainElement.classList.add(styles.main, styles.array, styles.opened);
    } else if (Array.isArray(convertedData)) {
      mainElement = renderObject(
        convertedData,
        styles.main,
        generateKeyForInnerArray(getLastRootKey(), 'array')
      );
    } else {
      mainElement = renderObject(convertedData);
    }
  } else {
    mainElement = renderSingleValue(
      convertedData as string | boolean | number | null
    );
  }

  // Listen on the generated element, not on document: the listener goes
  // away with the element, so repeated generate() calls don't leak handlers.
  mainElement.addEventListener('keydown', (evt) => onKeyPress(evt, mainElement));

  return mainElement;
};
