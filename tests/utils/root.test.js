import { describe, expect, it } from '@jest/globals';
import { setSettings } from '../../src/settings';
import { getDataByRoot, getLastRootKey } from '../../src/utils/root';
import { isRootTable } from '../../src/utils/root';

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

describe('getDataByRoot first level', () => {
  it('Test invalid cases', () => {
    setSettings({ root: '' });
    expect(getDataByRoot({})).toStrictEqual({});
    expect(getDataByRoot(twoLevelsData)).toStrictEqual(twoLevelsData);
    setSettings({ root: 'first' });
    expect(getDataByRoot({})).toBe(undefined);
    setSettings({ root: 'ex' });
    expect(getDataByRoot(twoLevelsData)).toBe(undefined);
  });

  it('Get simple values from first level root', () => {
    setSettings({ root: 'first' });
    expect(getDataByRoot(twoLevelsData)).toBe(true);
    setSettings({ root: 'second' });
    expect(getDataByRoot(twoLevelsData)).toBe(false);
    setSettings({ root: 'fourth' });
    expect(getDataByRoot(twoLevelsData)).toBe(123456);
    setSettings({ root: 'fifth' });
    expect(getDataByRoot(twoLevelsData)).toBe('test string');
  });

  it('Get object from first level root', () => {
    setSettings({ root: 'third' });
    expect(getDataByRoot(twoLevelsData)).toStrictEqual({
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
    setSettings({ root: 'third' });
    expect(getDataByRoot(twoLevelsDataWithArray, 'third')).toStrictEqual([
      12,
      23,
      34,
      45,
      56,
      67,
    ]);
  });
});

describe('getDataByRoot second level', () => {
  it('get simple value from second level object', () => {
    setSettings({ root: ['third', 'p1'] });
    expect(getDataByRoot(twoLevelsData)).toBe(123);
    setSettings({ root: ['third', 'p2'] });
    expect(getDataByRoot(twoLevelsData)).toBe(null);
    setSettings({ root: ['third', 'p3'] });
    expect(getDataByRoot(twoLevelsData)).toBe(false);
    setSettings({ root: ['third', 'p44'] });
    expect(getDataByRoot(twoLevelsData)).toBe(undefined);
  });

  const simpleDataWithArray = {
    p1: true,
    p2: [23, 34, 45, 56, 67, 78],
  };

  it('Data with arrays', () => {
    setSettings({ root: ['p2', 3] });
    expect(getDataByRoot(simpleDataWithArray)).toStrictEqual(56);
    setSettings({ root: ['p2', '3'] });
    expect(getDataByRoot(simpleDataWithArray)).toStrictEqual(56);
    setSettings({ root: 'third' });
    expect(getDataByRoot(dataWithArray)).toStrictEqual(dataWithArray.third);
    setSettings({ root: ['third', 'lbo_options', 1] });
    expect(getDataByRoot(dataWithArray)).toStrictEqual({
      '@name': 'w/o Leather Seats',
      '@code': '076',
      '#text': '-25',
    });
    setSettings({ root: ['third', 'lbo_options', 1, '@name'] });
    expect(getDataByRoot(dataWithArray)).toStrictEqual('w/o Leather Seats');
  });
});

describe('getDataByRoot from string as path', () => {
  it('object elements', () => {
    setSettings({ root: 'third.lbo_options' });
    expect(getDataByRoot(dataWithArray)).toStrictEqual([
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
    ]);
  });
  it('object elements', () => {
    setSettings({ root: 'third.lbo_options[1]' });
    expect(getDataByRoot(dataWithArray)).toStrictEqual({
      '@name': 'w/o Leather Seats',
      '@code': '076',
      '#text': '-25',
    });
  });
});

describe('getLastRootKey', () => {
  it('should return empty string if the root is ""', () => {
    setSettings({ root: '' });
    expect(getLastRootKey()).toStrictEqual('');
  });
  it('should return the last key of the root', () => {
    setSettings({ root: ['one', 'two', 3, 'four'] });
    expect(getLastRootKey()).toStrictEqual('four');
  });
  it('should return the last key of the root', () => {
    setSettings({ root: ['one', 'two', 3] });
    expect(getLastRootKey()).toStrictEqual(3);
  });
});


describe('isRootTable', () => {
  it('should return false if `arraysAsTable` is not present', () => {
    setSettings({ root: '' });
    expect(isRootTable()).toStrictEqual(false);
    setSettings({ root: 'first' });
    expect(isRootTable()).toStrictEqual(false);
    setSettings({ root: ['first'] });
    expect(isRootTable()).toStrictEqual(false);
    setSettings({ root: ['first', 'second'] });
    expect(isRootTable()).toStrictEqual(false);
  });

  it('should return true if root is "" and `arraysAsTable` is [""]', () => {
    setSettings({ root: '', arraysAsTable: [''] });
    expect(isRootTable()).toStrictEqual(true);
    setSettings({ root: [''], arraysAsTable: [''] });
    expect(isRootTable()).toStrictEqual(true);
    setSettings({ root: undefined, arraysAsTable: [''] });
    expect(isRootTable()).toStrictEqual(true);
  });

  it('should return true if root is "first" and `arraysAsTable` is ["first"]', () => {
    setSettings({ root: 'first', arraysAsTable: ['first'] });
    expect(isRootTable()).toStrictEqual(true);
    setSettings({ root: ['first'], arraysAsTable: ['first'] });
    expect(isRootTable()).toStrictEqual(true);
  });

  it('should return false if root is "first" and `arraysAsTable` is ["second"]', () => {
    setSettings({ root: 'first', arraysAsTable: ['second'] });
    expect(isRootTable()).toStrictEqual(false);
    setSettings({ root: ['first'], arraysAsTable: ['second'] });
    expect(isRootTable()).toStrictEqual(false);
  });

  it('should return true if root is "first" and `arraysAsTable` is ["first", "second"]', () => {
    setSettings({ root: 'first', arraysAsTable: ['first', 'second'] });
    expect(isRootTable()).toStrictEqual(true);
    setSettings({ root: ['first'], arraysAsTable: ['first', 'second'] });
    expect(isRootTable()).toStrictEqual(true);
  });

  it('should return true if root is array with more that one value and `arraysAsTable` contain the last key', () => {
    setSettings({ root: ['first', 'second'], arraysAsTable: ['second'] });
    expect(isRootTable()).toStrictEqual(true);
    setSettings({ root: ['first', 'second', 'third'], arraysAsTable: ['third'] });
    expect(isRootTable()).toStrictEqual(true);
  });
});
