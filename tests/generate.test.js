/**
 * @jest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { generate } from '../src/api';
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
    expect(consoleError).toHaveBeenCalled();
  });

  it('does not throw when the root points to a missing key', () => {
    expect(() =>
      generate({ a: 1 }, container, { root: 'missing' })
    ).not.toThrow();
    expect(container.querySelector('.main').textContent).toBe('undefined');
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
