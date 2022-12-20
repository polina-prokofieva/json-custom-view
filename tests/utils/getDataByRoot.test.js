import { describe, expect } from '@jest/globals';
import { getDataByRoot } from '../../src/utils/getDataByRoot';

describe('getDataByRoot first level', () => {
  const twoLevelsData = {
    first: true,
    second: false,
    third: {
      p1: 123,
      p2: null,
      p3: false,
      p4: 0,
      p5: 'zero',
      p6: 'something else',
    },
    fourth: 123456,
    fifth: 'test string',
  };

  it('Test invalid cases', () => {
    expect(getDataByRoot({}, '')).toStrictEqual({});
    expect(getDataByRoot(twoLevelsData, '')).toStrictEqual(twoLevelsData);
    expect(getDataByRoot({}, 'first')).toBe(undefined);
    expect(getDataByRoot(twoLevelsData, 'ex')).toBe(undefined);
  });

  it('Get simple values from first level root', () => {
    expect(getDataByRoot(twoLevelsData, 'first')).toBe(true);
    expect(getDataByRoot(twoLevelsData, 'second')).toBe(false);
    expect(getDataByRoot(twoLevelsData, 'fourth')).toBe(123456);
    expect(getDataByRoot(twoLevelsData, 'fifth')).toBe('test string');
  });

  it('Get object from first level root', () => {
    expect(getDataByRoot(twoLevelsData, 'third')).toStrictEqual({
      p1: 123,
      p2: null,
      p3: false,
      p4: 0,
      p5: 'zero',
      p6: 'something else',
    });
  });

  const twoLevelsDataWithArray = {
    first: true,
    second: false,
    third: [12, 23, 34, 45, 56, 67],
    fourth: 123456,
    fifth: 'test string',
  };

  it('Get array from first level root', () => {
    expect(getDataByRoot(twoLevelsDataWithArray, 'third')).toStrictEqual([
      12, 23, 34, 45, 56, 67,
    ]);
  });
});

describe('getDataByRoot second level', () => {
  const twoLevelsData = {
    first: true,
    second: false,
    third: {
      p1: 123,
      p2: null,
      p3: false,
      p4: 0,
      p5: 'zero',
      p6: 'something else',
    },
    fourth: 123456,
    fifth: 'test string',
  };

  it('get simple value from second level object', () => {
    expect(getDataByRoot(twoLevelsData, ['third', 'p1'])).toBe(123);
    expect(getDataByRoot(twoLevelsData, ['third', 'p2'])).toBe(null);
    expect(getDataByRoot(twoLevelsData, ['third', 'p3'])).toBe(false);
    expect(getDataByRoot(twoLevelsData, ['third', 'p44'])).toBe(undefined);
  });

  const simpleDataWithArray = {
    p1: true,
    p2: [23, 34, 45, 56, 67, 78],
  };

  const dataWithArray = {
    first: true,
    second: false,
    third: {
      p1: 123,
      lbo_options: [
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
      ],
      p6: 'something else',
    },
    fourth: 123456,
    fifth: 'test string',
  };

  it('Data with arrays', () => {
    expect(getDataByRoot(simpleDataWithArray, ['p2', 3])).toStrictEqual(56);
    expect(getDataByRoot(simpleDataWithArray, ['p2', '3'])).toStrictEqual(56);
    expect(getDataByRoot(dataWithArray, 'third')).toStrictEqual(
      dataWithArray.third
    );
    expect(
      getDataByRoot(dataWithArray, ['third', 'lbo_options', 1])
    ).toStrictEqual({
      '@name': 'w/o Leather Seats',
      '@code': '076',
      '#text': '-25',
    });
  });
  expect(
    getDataByRoot(dataWithArray, ['third', 'lbo_options', 1, '@name'])
  ).toStrictEqual('w/o Leather Seats');
});
