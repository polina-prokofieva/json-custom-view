import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  isNodeElement,
  getNoDataMessage,
  reportError,
} from '../src/api/helpers';
import { clearSettings, setSettings } from '../src/settings';
import { clearNotifications, notifications } from '../src/notifications';

describe('isNodeElement', () => {
  it('returns true for an object with an appendChild method', () => {
    expect(isNodeElement({ appendChild: () => {} })).toBe(true);
  });

  it.each([
    ['undefined', undefined],
    ['null', null],
    ['a string selector', '#main'],
    ['a number', 1],
    ['an empty object', {}],
    ['an object with a non-function appendChild', { appendChild: true }],
  ])('returns false for %s', (_, value) => {
    expect(isNodeElement(value)).toBe(false);
  });
});

describe('getNoDataMessage', () => {
  beforeEach(() => {
    clearSettings();
  });

  it('returns the generic message when no root is set', () => {
    expect(getNoDataMessage()).toBe('There is no data to render.');
  });

  it('includes a single-key root in the message', () => {
    setSettings({ root: 'missing' });
    expect(getNoDataMessage()).toBe('There is no data at root "missing".');
  });

  it('joins a nested string root with dots', () => {
    setSettings({ root: 'a[0].b' });
    expect(getNoDataMessage()).toBe('There is no data at root "a.0.b".');
  });

  it('joins an array root with dots', () => {
    setSettings({ root: ['a', 'b'] });
    expect(getNoDataMessage()).toBe('There is no data at root "a.b".');
  });
});

describe('reportError', () => {
  let consoleError;

  beforeEach(() => {
    clearNotifications();
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it('adds an Error message as an error notification and logs it', () => {
    reportError(new Error('Something went wrong'));

    expect(notifications).toEqual([
      { type: 'error', text: 'Something went wrong' },
    ]);
    expect(consoleError).toHaveBeenCalledWith('Something went wrong');
  });

  it('reports a string as is', () => {
    reportError('Plain message');

    expect(notifications).toEqual([{ type: 'error', text: 'Plain message' }]);
    expect(consoleError).toHaveBeenCalledWith('Plain message');
  });

  it('converts other values to a string', () => {
    reportError(42);

    expect(notifications).toEqual([{ type: 'error', text: '42' }]);
    expect(consoleError).toHaveBeenCalledWith('42');
  });
});
