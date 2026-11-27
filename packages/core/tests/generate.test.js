/**
 * @jest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { generate } from '../src/api/api';
import { clearSettings } from '../src/settings';

const invalidJson = '{ "a": 1, "include": ["src"], }';

let container;
let consoleError;

beforeEach(() => {
  clearSettings();
  container = document.createElement('div');
  consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  consoleError.mockRestore();
});

const getParseErrorMessage = () => {
  try {
    JSON.parse(invalidJson);
  } catch (error) {
    return error.message;
  }
};

describe('generate with invalid input', () => {
  it('does not throw on invalid JSON and renders only the error notification', () => {
    expect(() => generate(invalidJson, container)).not.toThrow();

    expect(container.children).toHaveLength(1);
    const notifications = container.querySelector('.notifications');
    expect(notifications).not.toBeNull();
    const error = notifications.querySelector('.error');
    expect(error.textContent).toBe(getParseErrorMessage());
    expect(container.querySelector('.main')).toBeNull();
    expect(consoleError).toHaveBeenCalledWith(getParseErrorMessage());
  });

  it('renders nothing on invalid JSON when showNotifications is false', () => {
    expect(() =>
      generate(invalidJson, container, { showNotifications: false })
    ).not.toThrow();

    expect(container.children).toHaveLength(0);
    expect(consoleError).toHaveBeenCalledWith(getParseErrorMessage());
  });

  it('does not throw when the node is missing', () => {
    expect(() => generate({ a: 1 })).not.toThrow();
    expect(() => generate({ a: 1 }, null, {})).not.toThrow();
    expect(() => generate(invalidJson, undefined)).not.toThrow();
    expect(() => generate({ a: 1 }, '#main')).not.toThrow();
    expect(consoleError).toHaveBeenCalledTimes(4);
  });

  it('reports errors thrown after parsing and renders no data', () => {
    // capitalizeKeys fails on an empty key inside transform
    expect(() =>
      generate({ '': 1 }, container, { capitalizeKeys: true })
    ).not.toThrow();

    expect(container.children).toHaveLength(1);
    expect(container.querySelector('.notifications .error')).not.toBeNull();
    expect(container.querySelector('.main')).toBeNull();
    expect(consoleError).toHaveBeenCalledTimes(1);
  });

  it('reports an error when the root points to a missing key', () => {
    expect(() =>
      generate({ a: 1 }, container, { root: 'missing' })
    ).not.toThrow();

    expect(container.querySelector('.notifications .error').textContent).toBe(
      'There is no data at root "missing".'
    );
    expect(container.querySelector('.main')).toBeNull();
  });

  it('reports an error when a nested root is missing', () => {
    expect(() =>
      generate({ a: 1 }, container, { root: 'missing.deeper' })
    ).not.toThrow();

    expect(container.querySelector('.notifications .error')).not.toBeNull();
    expect(container.querySelector('.main')).toBeNull();
  });

  it('reports an error when there is no data', () => {
    expect(() => generate(undefined, container)).not.toThrow();

    expect(container.querySelector('.notifications .error').textContent).toBe(
      'There is no data to render.'
    );
    expect(container.querySelector('.main')).toBeNull();
  });

  it('recovers on the next call with valid data', () => {
    generate(invalidJson, container);
    container.innerHTML = '';
    generate('{ "a": 1 }', container);

    expect(container.querySelector('.notifications')).toBeNull();
    expect(container.querySelector('.main .key').textContent).toBe('a:');
  });
});

describe('generate with valid input (regression)', () => {
  it('renders an object from a JSON string', () => {
    generate('{ "a": 1, "b": "text" }', container);

    expect(container.children).toHaveLength(1);
    const values = [...container.querySelectorAll('.main > .field > .value')];
    expect(values.map((value) => value.textContent)).toEqual(['1', 'text']);
  });

  it('renders warnings before the data', () => {
    generate({ a: 1 }, container, { arraysAsTable: 'a' });

    const [notifications, main] = container.children;
    expect(container.children).toHaveLength(2);
    expect(notifications.className).toBe('notifications');
    expect(notifications.querySelector('.warning').textContent).toBe(
      '"arraysAsTable" should be an array'
    );
    expect(main.className).toBe('main');
    expect(main.querySelector('.field > .key').textContent).toBe('a:');
  });

  it('works without a settings object', () => {
    generate({ a: true }, container);

    expect(container.querySelector('.notifications')).toBeNull();
    expect(container.querySelector('.main > .field > .value').textContent).toBe(
      'true'
    );
  });

  it.each([
    ['a number', 42, '42', 'number'],
    ['a string', '"hello"', 'hello', 'string'],
    ['a boolean', false, 'false', 'boolean'],
    ['null', null, 'null', 'object'],
  ])('renders %s at the root', (_, data, text, className) => {
    generate(data, container);

    const main = container.querySelector('.main');
    expect(main.textContent).toBe(text);
    expect(main.firstElementChild.className).toBe(className);
  });

  it('renders null values inside an object', () => {
    generate({ a: null }, container);

    const field = container.querySelector('.main > .field');
    expect(field.classList.contains('null')).toBe(true);
    expect(field.querySelector(':scope > .value').textContent).toBe('null');
  });
});

describe('keyboard navigation listeners', () => {
  const countKeydownCalls = (spy) =>
    spy.mock.calls.filter(([type]) => type === 'keydown').length;

  it('does not add keydown listeners to document on repeated calls', () => {
    const documentAdd = jest.spyOn(document, 'addEventListener');
    const elementAdd = jest.spyOn(HTMLElement.prototype, 'addEventListener');

    for (let i = 0; i < 3; i++) {
      container.innerHTML = '';
      generate({ a: 1, b: { c: 2 } }, container);
    }

    expect(countKeydownCalls(documentAdd)).toBe(0);
    // One listener per generated main element, which is dropped with it.
    expect(countKeydownCalls(elementAdd)).toBe(3);

    documentAdd.mockRestore();
    elementAdd.mockRestore();
  });

  it('does not add a keydown listener when nothing is rendered', () => {
    const elementAdd = jest.spyOn(HTMLElement.prototype, 'addEventListener');

    generate(invalidJson, container);

    expect(countKeydownCalls(elementAdd)).toBe(0);
    elementAdd.mockRestore();
  });

  it('still moves focus with the arrow keys', () => {
    document.body.appendChild(container);
    generate({ a: 1, b: { c: 2 } }, container);

    const [first, second] = container.querySelectorAll('.main > .field > .key');
    first.focus();
    first.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
    );

    expect(document.activeElement).toBe(second);
    container.remove();
  });

  it('ignores arrow keys pressed outside the view', () => {
    const outside = document.createElement('input');
    document.body.append(outside, container);
    generate({ a: 1, b: 2 }, container);

    outside.focus();
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      cancelable: true,
    });
    outside.dispatchEvent(event);

    expect(document.activeElement).toBe(outside);
    expect(event.defaultPrevented).toBe(false);
    outside.remove();
    container.remove();
  });
});

describe('generate return value', () => {
  it('returns isRendered: true and no errors for valid data', () => {
    expect(generate({ a: 1 }, container)).toEqual({
      isRendered: true,
      errors: [],
    });
  });

  it('does not list warnings as errors', () => {
    expect(generate({ a: 1 }, container, { arraysAsTable: 'a' })).toEqual({
      isRendered: true,
      errors: [],
    });
  });

  it('returns the parse error for invalid JSON', () => {
    expect(generate(invalidJson, container)).toEqual({
      isRendered: false,
      errors: [getParseErrorMessage()],
    });
  });

  it('returns the error even when showNotifications is false', () => {
    expect(
      generate(invalidJson, container, { showNotifications: false })
    ).toEqual({
      isRendered: false,
      errors: [getParseErrorMessage()],
    });
  });

  it.each([
    ['missing', undefined],
    ['null', null],
    ['a selector string', '#main'],
  ])('returns an error when the node is %s', (_, node) => {
    expect(generate({ a: 1 }, node)).toEqual({
      isRendered: false,
      errors: [
        'The second parameter of the "generate" function should be a node element.',
      ],
    });
  });

  it('returns the no-data error for a missing root', () => {
    expect(generate({ a: 1 }, container, { root: 'missing' })).toEqual({
      isRendered: false,
      errors: ['There is no data at root "missing".'],
    });
  });

  it('returns the no-data error when there is no data', () => {
    expect(generate(undefined, container)).toEqual({
      isRendered: false,
      errors: ['There is no data to render.'],
    });
  });

  it('returns a single error when rendering fails after parsing', () => {
    const result = generate({ '': 1 }, container, { capitalizeKeys: true });

    expect(result.isRendered).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBe(
      container.querySelector('.notifications .error').textContent
    );
  });

  it('does not carry errors over between calls', () => {
    generate(invalidJson, container);
    container.innerHTML = '';

    expect(generate({ a: 1 }, container)).toEqual({
      isRendered: true,
      errors: [],
    });
  });
});
