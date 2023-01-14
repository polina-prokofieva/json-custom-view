import { createSimpleDOMElement } from './general';
import { convertByMask } from '../utils/formatKeys.js';
import { renderTable } from './renderTable.js';
import { getSettings } from '../settings.js';
import styles from '../assets/style.module.less';

export const toggleVisibility = objectElement => {
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

export const renderObject = (data, className = styles.main, specialKeys) => {
  const settings = getSettings();
  const mainElement = createSimpleDOMElement('div', null, className);

  for (const key in data) {
    const value = data[key];
    const type = Array.isArray(value) ? 'array' : typeof value;

    const objectElement = createSimpleDOMElement('div', null, [
      styles.field,
      styles[type],
    ]);

    const { arraysAsTable, keysForArrays, keysDict, keysOldToNew } = settings;
    const oldKey = keysDict[key] || key;

    const specialKeysForInnerArray =
      keysForArrays && keysForArrays[oldKey] && type === 'array'
        ? keysForArrays[oldKey]
        : null;

    const specialKey = specialKeys
      ? convertByMask(value, specialKeys, keysOldToNew)
      : key;

    const { keyElement, fragment } = renderField(specialKey, value, {
      specialKeysForInnerArray,
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
  key,
  value,
  { specialKeysForInnerArray, renderAsTable }
) => {
  const fragment = document.createDocumentFragment();
  const keyElement = createSimpleDOMElement('span', key, styles.key);

  fragment.appendChild(keyElement);

  if (typeof value === 'object') {
    const renderedValue = renderAsTable
      ? renderTable(value)
      : renderObject(value, styles.value, specialKeysForInnerArray);
    fragment.appendChild(renderedValue);
  } else {
    fragment.appendChild(createSimpleDOMElement('span', ': ', styles.value));
    fragment.appendChild(createSimpleDOMElement('span', value, styles.value));
  }

  return { keyElement, fragment };
};
