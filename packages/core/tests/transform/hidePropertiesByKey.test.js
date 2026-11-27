import { describe, expect } from '@jest/globals';
import { transform } from '../../src/transform';
import { simple, twoLevelsData, deep } from '../data/dataExamples';
import { setSettings } from '../../src/settings';

describe('Single level', () => {
  setSettings({
    hidePropertiesByKey: ['sixth'],
  });
  it('Remove field w/ "sixth" key', () => {
    const transformed = transform(simple);

    expect(transformed).toMatchObject({
      first: 123,
      second: false,
      third: true,
      fourth: null,
      fifth: 0,
      seventh: false,
      eighth: 0,
      ninth: null,
      tenth: 'zero',
      eleventh: 'valid value',
    });

    expect(transformed.sixth).toBeUndefined();

    expect(transformed.fifth).toBeDefined();
    expect(transformed.third).toBeDefined();
    expect(transformed.fourth).toBeDefined();
    expect(transformed.eighth).toBeDefined();
  });

  it('Remove fields w/ keys "first", "fourth" and "ninth"', () => {
    setSettings({
      hidePropertiesByKey: ['first', 'fourth', 'ninth'],
    });
    const transformed = transform(simple);

    expect(transformed).toMatchObject({
      second: false,
      third: true,
      fifth: 0,
      sixth: 'zero',
      seventh: false,
      eighth: 0,
      tenth: 'zero',
      eleventh: 'valid value',
    });

    expect(transformed.first).toBeUndefined();
    expect(transformed.fourth).toBeUndefined();
    expect(transformed.ninth).toBeUndefined();

    expect(transformed.second).toBeDefined();
    expect(transformed.third).toBeDefined();
    expect(transformed.fifth).toBeDefined();
    expect(transformed.tenth).toBeDefined();
    expect(transformed.eleventh).toBeDefined();
  });
});

describe('Two levels', () => {
  it('Remove fields "first" and "sixth"', () => {
    setSettings({
      hidePropertiesByKey: ['first', 'sixth'],
    });
    const converted = transform(twoLevelsData);

    expect(converted).toStrictEqual({
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
      fifth: {
        second: false,
        third: true,
        fourth: 'something else',
        fifth: null,
        seventh: 'string',
        eighth: null,
        ninth: 0,
        tenth: 'zero',
      },
    });

    expect(converted.first).toBeUndefined();
    expect(converted.sixth).toBeUndefined();
    expect(converted.fifth.first).toBeUndefined();
    expect(converted.fifth.sixth).toBeUndefined();

    expect(converted.third).toBeDefined();
    expect(converted.third.p1).toBeDefined();
    expect(converted.third.p6).toBeDefined();
    expect(converted.fourth).toBeDefined();
    expect(converted.fifth).toBeDefined();
  });
});

describe('Deep', () => {
  it('Remove fields "second" and "sixth"', () => {
    setSettings({
      hidePropertiesByKey: ['second', 'sixth'],
    });
    const converted = transform(deep);

    expect(converted).toStrictEqual({
      first: 123,
      third: {
        first: 123,
        third: {
          first: {
            first: 123,
            third: {
              first: {
                first: 123,
                third: true,
              },
              third: {
                first: {
                  first: 123,
                  third: true,
                },
                third: true,
              },
            },
          },
          third: true,
        },
      },
    });

    expect(converted.second).toBeUndefined();
    expect(converted.third.second).toBeUndefined();
    expect(converted.third.third.second).toBeUndefined();
    expect(converted.third.third.first.third.first.second).toBeUndefined();
    expect(converted.third.third.first.third.first.second).toBeUndefined();
    expect(converted.third.third.second).toBeUndefined();
  });
});

describe('Remove fields by key and value', () => {
  it('Remove false and "third"', () => {
    setSettings({
      hidePropertiesByValue: [null],
      hidePropertiesByKey: ['second'],
    });
    const converted = transform(twoLevelsData);

    expect(converted).toStrictEqual({
      first: true,
      third: {
        p1: 123,
        p3: false,
        p4: 0,
        p5: 'zero',
        p6: 'something else',
      },
      fourth: 123456,
      fifth: {
        first: true,
        third: true,
        fourth: 'something else',
        sixth: false,
        seventh: 'string',
        ninth: 0,
        tenth: 'zero',
      },
      sixth: 'normal value',
    });

    expect(converted.second).toBeUndefined();
    expect(converted.third.p2).toBeUndefined();
    expect(converted.fifth.second).toBeUndefined();
    expect(converted.fifth.fifth).toBeUndefined();
    expect(converted.fifth.eighth).toBeUndefined();

    expect(converted.third).toBeDefined();
    expect(converted.third.p1).toBeDefined();
    expect(converted.third.p6).toBeDefined();
    expect(converted.fourth).toBeDefined();
    expect(converted.fifth).toBeDefined();
  });
});
