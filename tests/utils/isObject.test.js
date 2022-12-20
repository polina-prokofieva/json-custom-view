import { describe, expect } from '@jest/globals';
import { isObject } from '../../src/utils/isObject';
import { dataWithObjectsInArray } from '../../data/dataExamples';

describe('Test is Object function', () => {
  it('objects', () => {
    expect(isObject({})).toBeTruthy;
    expect(isObject({ name: 'Polina' })).toBeTruthy;
    expect(isObject(dataWithObjectsInArray)).toBeTruthy;
  });

  it('check for null', () => {
    expect(isObject(null)).toBeFalsy;
  });

  it('check for string', () => {
    expect(isObject('')).toBeFalsy;
    expect(isObject('Some text')).toBeFalsy;
  });

  it('check for number', () => {
    expect(isObject(0)).toBeFalsy;
    expect(isObject(123)).toBeFalsy;
  });

  it('check for boolian', () => {
    expect(isObject(false)).toBeFalsy;
    expect(isObject(true)).toBeFalsy;
  });

  it('check for Array', () => {
    expect(isObject([])).toBeFalsy;
    expect(isObject(dataWithObjectsInArray.people)).toBeFalsy;
  });
});
