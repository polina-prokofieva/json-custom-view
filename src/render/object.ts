import { createSimpleDOMElement } from './general';
import { convertByMask } from '../utils/formatKeys';
import { renderTable } from './renderTable';
import { getSettings, getOldKey } from '../settings';
import styles from '../assets/style.module.less';

export const toggleVisibility = (objectElement: HTMLElement): void => {
  objectElement.classList.toggle(styles.opened);

  if (!objectElement.classList.contains(styles.opened)) {
    const allOpenedChildren = objectElement.querySelectorAll(
      `.${styles.opened}`
    );

    allOpenedChildren.forEach((element) => {
      element.classList.remove(styles.opened);
    });
  }
};

export const generateKeyForInnerArray = (
  key: string,
  type:
    | 'array'
    | 'string'
    | 'object'
    | 'number'
    | 'boolean'
    | 'undefined'
    | 'bigint'
    | 'symbol'
    | 'function'
): string | null => {
  const settings = getSettings();
  const oldKey = getOldKey(key);
  const { keysForArrays } = settings;

  return keysForArrays && keysForArrays[oldKey] && type === 'array'
    ? keysForArrays[oldKey]
    : null;
};

export const renderObject = (
  data: any,
  className: string = styles.main,
  specialKeys?: string
): HTMLElement => {
  const settings = getSettings();
  const mainElement = createSimpleDOMElement('div', null, className);

  for (const key in data) {
    const value = data[key];
    const type = Array.isArray(value) ? 'array' : typeof value;

    const objectElement = createSimpleDOMElement('div', null, [
      styles.field,
      styles[value === null ? 'null' : type],
    ]);

    const { arraysAsTable, keysOldToNew } = settings;
    const oldKey = getOldKey(key);

    const specialKeyForInnerArray: string | null = generateKeyForInnerArray(
      key,
      type
    );

    const specialKey = specialKeys
      ? convertByMask(value, specialKeys, keysOldToNew)
      : key;

    const { keyElement, fragment } = renderField(specialKey, value, {
      specialKeyForInnerArray,
      renderAsTable:
        type === 'array' && arraysAsTable && arraysAsTable.includes(oldKey),
    });

    objectElement.appendChild(fragment);
    keyElement.addEventListener('click', () => toggleVisibility(objectElement));

    mainElement.appendChild(objectElement);
  }

  return mainElement;
};

const renderField = (
  key: string,
  value: any,
  {
    specialKeyForInnerArray,
    renderAsTable,
  }: { specialKeyForInnerArray: string | null; renderAsTable: boolean }
): { keyElement: HTMLElement; fragment: DocumentFragment } => {
  const fragment = document.createDocumentFragment();
  const keyElement = createSimpleDOMElement('span', key, styles.key);

  fragment.appendChild(keyElement);

  if (typeof value === 'object' && value !== null) {
    const renderedValue = renderAsTable
      ? renderTable(value)
      : renderObject(value, styles.value, specialKeyForInnerArray);
    fragment.appendChild(renderedValue);
  } else {
    const valueForRender = value === null ? 'null' : value;
    fragment.appendChild(createSimpleDOMElement('span', ': ', styles.value));
    fragment.appendChild(
      createSimpleDOMElement('span', valueForRender, styles.value)
    );
  }

  return { keyElement, fragment };
};
