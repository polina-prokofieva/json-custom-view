import { createSimpleDOMElement } from './general';
import styles from '../assets/style.module.less';

let tableHeaders = [];

const generateTableHeaders = data => {
  data.forEach(item => {
    tableHeaders = [...new Set([...tableHeaders, ...Object.keys(item)])];
  });
};

const renderTableHeader = () => {
  const headerFragment = document.createDocumentFragment();
  const headerElement = createSimpleDOMElement('thead');
  const rowElement = createSimpleDOMElement('tr');

  tableHeaders.forEach(header => {
    headerCellElement = createSimpleDOMElement('th', header);
    rowElement.appendChild(headerCellElement);
  });

  headerElement.appendChild(rowElement);
  headerFragment.appendChild(headerElement);

  return headerFragment;
};

const renderTableBody = data => {
  const bodyFragment = document.createDocumentFragment();
  const bodyElement = createSimpleDOMElement('tbody');

  data.forEach(row => {
    const rowElement = createSimpleDOMElement('tr');

    tableHeaders.forEach(cell => {
      const bodyCellElement = createSimpleDOMElement('td', row[cell] || '-');
      rowElement.appendChild(bodyCellElement);
    });

    bodyElement.appendChild(rowElement);
  });

  bodyFragment.appendChild(bodyElement);

  return bodyFragment;
};

export const renderTable = data => {
  const tableElement = createSimpleDOMElement(
    'table',
    null,
    styles.arrayElements
  );

  generateTableHeaders(data);

  const tableHeader = renderTableHeader();
  const tableBody = renderTableBody(data);
  tableElement.appendChild(tableHeader);
  tableElement.appendChild(tableBody);

  return tableElement;
};
