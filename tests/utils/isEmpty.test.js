import { describe, expect } from '@jest/globals';
import { isEmptyObjectOrArray } from '../../src/utils/isEmpty';

describe('Is Empty Object or Array', () => {
  it('check simple values', () => {
    expect(isEmptyObjectOrArray(null)).toBe(false);
    expect(isEmptyObjectOrArray()).toBe(false);
    expect(isEmptyObjectOrArray(undefined)).toBe(false);
    expect(isEmptyObjectOrArray(123456)).toBe(false);
    expect(isEmptyObjectOrArray('some text')).toBe(false);
  });

  it('check objects', () => {
    expect(isEmptyObjectOrArray({})).toBe(true);
    expect(isEmptyObjectOrArray({ key: 'value' })).toBe(false);
  });

  it('check array', () => {
    expect(isEmptyObjectOrArray([])).toBe(true);
    expect(isEmptyObjectOrArray([2, 3, 4])).toBe(false);
  });
});
