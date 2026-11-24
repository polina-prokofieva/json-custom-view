/**
 * @jest-environment jsdom
 */
import { beforeEach, describe, expect, it } from '@jest/globals';
import { generate } from '../src/api';

const addresses = [
  { city: 'Kyiv', street: 'Khreshchatyk' },
  { city: 'Lviv', street: 'Rynok' },
];

let container;

const render = (data, settings) => {
  generate(data, container, settings);
  return container.lastElementChild;
};

const keyTexts = (element) =>
  [...element.querySelectorAll(':scope > .field > .key')].map((key) =>
    key.textContent.replace(/:$/, '')
  );

beforeEach(() => {
  container = document.createElement('div');
});

describe('render the root array as a table', () => {
  it('renders a table when the last root key is in arraysAsTable', () => {
    const main = render(
      { addresses },
      { root: 'addresses', arraysAsTable: ['addresses'] }
    );

    expect(main.classList).toContain('main');
    expect(main.classList).toContain('opened');
    const table = main.querySelector('table');
    expect(table).not.toBeNull();
    expect(
      [...table.querySelectorAll('th')].map((th) => th.textContent)
    ).toStrictEqual(['city', 'street']);
    expect(table.querySelectorAll('tbody tr')).toHaveLength(2);
  });

  it('renders a table for the whole data with arraysAsTable [""]', () => {
    const main = render(addresses, { arraysAsTable: [''] });

    expect(main.classList).toContain('main');
    expect(main.querySelector('table')).not.toBeNull();
  });

  it('does not render a table for an array of plain values', () => {
    const main = render(['a', 'b'], { arraysAsTable: [''] });

    expect(main.querySelector('table')).toBeNull();
    expect(main.classList).toContain('main');
  });
});

describe('render the root array as a list', () => {
  it('keeps the main class', () => {
    const main = render(addresses, {});

    expect(main.classList).toContain('main');
    expect(main.querySelector('table')).toBeNull();
    expect(keyTexts(main)).toStrictEqual(['0', '1']);
  });

  it('uses keysForArrays of the last root key for element keys', () => {
    const main = render(
      { addresses },
      { root: 'addresses', keysForArrays: { addresses: 'city' } }
    );

    expect(keyTexts(main)).toStrictEqual(['Kyiv', 'Lviv']);
  });

  it('uses keysForArrays[""] when there is no root', () => {
    const main = render(addresses, { keysForArrays: { '': 'city' } });

    expect(keyTexts(main)).toStrictEqual(['Kyiv', 'Lviv']);
  });
});

describe('render a root object', () => {
  it('keeps the main class', () => {
    const main = render({ a: 1, b: 'two' }, {});

    expect(main.classList).toContain('main');
    expect(keyTexts(main)).toStrictEqual(['a', 'b']);
  });
});
