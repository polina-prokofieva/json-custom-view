import { createSimpleDOMElement } from './general';
import { renderObject } from './object';
import { generateKeyForInnerArray } from './object';
import { getSettings, getOldKey } from '../settings';
import { ObjectValueType, ValueType } from '../types';
import { isObject } from '../utils/isObject';
import styles from '../assets/style.module.less';

export const isArrayOfObjects = (data: ValueType[]): boolean => {
  return data.every((item) => isObject(item));
};

const renderTableHeader = (headers: string[]): DocumentFragment => {
  const headerFragment = document.createDocumentFragment();
  const headerElement = createSimpleDOMElement('thead');
  const rowElement = createSimpleDOMElement('tr');

  headers.forEach((header) => {
    const headerCellElement = createSimpleDOMElement('th', header);
    rowElement.appendChild(headerCellElement);
  });

  headerElement.appendChild(rowElement);
  headerFragment.appendChild(headerElement);

  return headerFragment;
};

const renderTableBody = (
  data: ObjectValueType[],
  headers: string[]
): DocumentFragment => {
  const bodyFragment = document.createDocumentFragment();
  const bodyElement = createSimpleDOMElement('tbody');

  data.forEach((row: ObjectValueType) => {
    const rowElement = createSimpleDOMElement('tr');

    headers.forEach((cell: string) => {
      const bodyCellElement = renderTableCell(cell, row[cell]);
      rowElement.appendChild(bodyCellElement);
    });

    bodyElement.appendChild(rowElement);
  });

  bodyFragment.appendChild(bodyElement);

  return bodyFragment;
};

const renderTableCell = (key: string, cellValue: ValueType): HTMLElement => {
  const settings = getSettings();

  if (typeof cellValue !== 'object') {
    return createSimpleDOMElement('td', cellValue ? cellValue.toString() : '-');
  }

  const { arraysAsTable } = settings;
  const oldKey = getOldKey(key);
  let cellContentElement;

  if (
    Array.isArray(cellValue) &&
    isArrayOfObjects(cellValue) &&
    arraysAsTable &&
    arraysAsTable.includes(oldKey)
  ) {
    cellContentElement = renderTable(cellValue as ObjectValueType[]);
  } else {
    const specialKeysForInnerArray = generateKeyForInnerArray(
      key,
      typeof cellValue
    );

    cellContentElement = renderObject(
      cellValue,
      styles.cell,
      specialKeysForInnerArray
    );
  }

  const cellElement = createSimpleDOMElement('td');
  cellElement.appendChild(cellContentElement);

  return cellElement;
};

export const renderTable = (data: ObjectValueType[]): HTMLElement => {
  const tableElement = createSimpleDOMElement('table', null, [
    styles.arrayElements,
    styles.tableValue,
  ]);

  let headers: string[] = [];

  data.forEach((item: ObjectValueType) => {
    headers = [...new Set([...headers, ...Object.keys(item)])];
  });

  const tableHeader = renderTableHeader(headers);
  const tableBody = renderTableBody(data, headers);
  tableElement.appendChild(tableHeader);
  tableElement.appendChild(tableBody);

  return tableElement;
};

export const renderTableValue = (data: ObjectValueType[]): HTMLElement => {
  const tableValueElement = createSimpleDOMElement(
    'div',
    null,
    styles.tableValue
  );

  tableValueElement.appendChild(renderTable(data));

  return tableValueElement;
};
