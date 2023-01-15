import { createSimpleDOMElement } from './general';
import { renderObject } from './object';
import { generateKeysForInnerArray } from './object';
import { getSettings, getOldKey } from '../settings';
import styles from '../assets/style.module.less';

const renderTableHeader = headers => {
  const headerFragment = document.createDocumentFragment();
  const headerElement = createSimpleDOMElement('thead');
  const rowElement = createSimpleDOMElement('tr');

  headers.forEach(header => {
    headerCellElement = createSimpleDOMElement('th', header);
    rowElement.appendChild(headerCellElement);
  });

  headerElement.appendChild(rowElement);
  headerFragment.appendChild(headerElement);

  return headerFragment;
};

const renderTableBody = (data, headers) => {
  const bodyFragment = document.createDocumentFragment();
  const bodyElement = createSimpleDOMElement('tbody');

  data.forEach(row => {
    const rowElement = createSimpleDOMElement('tr');

    headers.forEach(cell => {
      const bodyCellElement = renderTableCell(cell, row[cell]);
      rowElement.appendChild(bodyCellElement);
    });

    bodyElement.appendChild(rowElement);
  });

  bodyFragment.appendChild(bodyElement);

  return bodyFragment;
};

const renderTableCell = (key, cellValue) => {
  const settings = getSettings();
  const type = Array.isArray(cellValue) ? 'array' : typeof cellValue;

  if (typeof cellValue !== 'object') {
    return createSimpleDOMElement('td', cellValue || '-');
  }

  const { arraysAsTable } = settings;
  const oldKey = getOldKey(key);
  let cellContentElement;

  if (type === 'array' && arraysAsTable && arraysAsTable.includes(oldKey)) {
    cellContentElement = renderTable(cellValue);
  } else {
    const specialKeysForInnerArray = generateKeysForInnerArray(key, type);

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

export const renderTable = data => {
  const tableElement = createSimpleDOMElement(
    'table',
    null,
    styles.arrayElements
  );

  let headers = [];

  data.forEach(item => {
    headers = [...new Set([...headers, ...Object.keys(item)])];
  });

  const tableHeader = renderTableHeader(headers);
  const tableBody = renderTableBody(data, headers);
  tableElement.appendChild(tableHeader);
  tableElement.appendChild(tableBody);

  return tableElement;
};
