import { describe, expect } from '@jest/globals';
import { isArrayOfObjects } from '../../src/render/renderTable';

describe('isArrayOfObjects', () => {
  it('should check correctly simple values', () => {
    expect(isArrayOfObjects([1, 2, 3])).toBeFalsy();
    expect(isArrayOfObjects(['1', '2', '3'])).toBeFalsy();
    expect(isArrayOfObjects(['1', null, '3'])).toBeFalsy();
    expect(isArrayOfObjects([1, '2', true])).toBeFalsy();
  });

  it('should check arrays of arrays', () => {
    expect(isArrayOfObjects([[], ['2'], [true]])).toBeFalsy();
  });

  it('should check arrays of objects', () => {
    expect(
      isArrayOfObjects([
        {
          '@name': 'Running Boards',
          '@code': '137',
          '#text': '1000',
        },
        {
          '@name': 'w/o Leather Seats',
          '@code': '076',
          '#text': '-25',
        },
        {
          '@name': 'Luggage Rack',
          '@code': '043',
          '#text': '0',
        },
      ])
    ).toBeTruthy();
    expect(
      isArrayOfObjects([
        {
          '@name': 'Running Boards',
          '@code': '137',
          '#text': '1000',
        },
        {
          '@name': 'w/o Leather Seats',
          '@code': '076',
          '#text': '-25',
        },
        null,
        1,
        2,
        3,
        {
          '@name': 'Luggage Rack',
          '@code': '043',
          '#text': '0',
        },
      ])
    ).toBeFalsy();
  });
});
