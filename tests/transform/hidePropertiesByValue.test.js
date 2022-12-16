import { describe, expect, test } from '@jest/globals';
import { transform } from '../../source/transform';
import { removeFalseFields, removeNullFields } from '../../data/settings';
import {
  simple,
  twoLevelsData,
  deep,
  dataWithArray,
  dataWithObjectsInArray,
} from '../../data/dataExamples';

describe('Single level', () => {
  it('Remove field w/ false values', () => {
    const transformed = transform(simple, removeFalseFields);

    expect(transformed).toMatchObject({
      first: 123,
      third: true,
      fourth: null,
      fifth: 0,
      sixth: 'zero',
      eighth: 0,
      ninth: null,
      tenth: 'zero',
      eleventh: 'valid value',
    });

    expect(transformed.second).toBeUndefined();
    expect(transformed.seventh).toBeUndefined();

    expect(transformed.fifth).toBeDefined();
    expect(transformed.third).toBeDefined();
    expect(transformed.fourth).toBeDefined();
    expect(transformed.eighth).toBeDefined();
  });

  it('Remove field w/ null values', () => {
    const transformed = transform(simple, removeNullFields);

    expect(transformed).toMatchObject({
      first: 123,
      second: false,
      third: true,
      fifth: 0,
      sixth: 'zero',
      seventh: false,
      eighth: 0,
      tenth: 'zero',
      eleventh: 'valid value',
    });

    expect(transformed.fourth).toBeUndefined();
    expect(transformed.ninth).toBeUndefined();

    expect(transformed.second).toBeDefined();
    expect(transformed.third).toBeDefined();
    expect(transformed.eighth).toBeDefined();
    expect(transformed.fifth).toBeDefined();
  });

  it('Remove field w/ 0 values', () => {
    const transformed = transform(simple, {
      hidePropertiesByValue: [0],
    });

    expect(transformed).toMatchObject({
      first: 123,
      second: false,
      third: true,
      fourth: null,
      sixth: 'zero',
      seventh: false,
      ninth: null,
      tenth: 'zero',
      eleventh: 'valid value',
    });

    expect(transformed.fifth).toBeUndefined();
    expect(transformed.eighth).toBeUndefined();

    expect(transformed.first).toBeDefined();
    expect(transformed.second).toBeDefined();
    expect(transformed.fourth).toBeDefined();
    expect(transformed.eleventh).toBeDefined();
  });

  it('Remove field w/ false, 0 and "zero" values', () => {
    const transformed = transform(simple, {
      hidePropertiesByValue: [false, 0, 'zero'],
    });

    expect(transformed).toMatchObject({
      first: 123,
      third: true,
      fourth: null,
      ninth: null,
      eleventh: 'valid value',
    });

    expect(transformed.second).toBeUndefined();
    expect(transformed.fifth).toBeUndefined();
    expect(transformed.sixth).toBeUndefined();
    expect(transformed.seventh).toBeUndefined();
    expect(transformed.eighth).toBeUndefined();
    expect(transformed.tenth).toBeUndefined();

    expect(transformed.first).toBeDefined();
    expect(transformed.third).toBeDefined();
    expect(transformed.fourth).toBeDefined();
    expect(transformed.ninth).toBeDefined();
    expect(transformed.eleventh).toBeDefined();
  });
});

describe('Two levels', () => {
  it('Remove false (only) fields from two levels (objects)', () => {
    const converted = transform(twoLevelsData, removeFalseFields);
    expect(converted).toMatchObject({
      first: true,
      third: {
        p1: 123,
        p2: null,
        p4: 0,
        p5: 'zero',
        p6: 'something else',
      },
      fourth: 123456,
      fifth: {
        first: true,
        third: true,
        fourth: 'something else',
        fifth: null,
        seventh: 'string',
        eighth: null,
        ninth: 0,
        tenth: 'zero',
      },
      sixth: 'normal value',
    });

    expect(converted.second).toBeUndefined();
    expect(converted.third.p3).toBeUndefined();
    expect(converted.fifth.sixth).toBeUndefined();
    expect(converted.first).toBeDefined();
    expect(converted.third).toBeDefined();
    expect(converted.third.p1).toBeDefined();
    expect(converted.third.p6).toBeDefined();
    expect(converted.fourth).toBeDefined();
    expect(converted.fifth).toBeDefined();
    expect(converted.sixth).toBeDefined();
  });
});

describe('Deep', () => {
  it('Remove false (only) fields from deep levels (objects)', () => {
    const converted = transform(deep, removeFalseFields);
    expect(converted).toMatchObject({
      first: 123,
      third: {
        first: 123,
        third: {
          first: {
            first: 123,
            third: {
              first: {
                first: 123,
                second: {
                  first: 123,
                  third: {
                    first: 123,
                    third: true,
                  },
                },
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
    expect(
      converted.third.third.first.third.first.second.second
    ).toBeUndefined();
    expect(
      converted.third.third.first.third.first.second.third.second
    ).toBeUndefined();
    expect(converted.third.third.second).toBeUndefined();
  });
});

describe('Hide field by value in arrays', () => {
  it('Hide null array elements', () => {
    const converted = transform(dataWithArray, removeNullFields);
    expect(converted).toMatchObject({
      first: true,
      third: [123, , false, 0, 'zero', 'something else'],
    });
  });

  it('Hide null in object in array', () => {
    const converted = transform(dataWithObjectsInArray, removeNullFields);

    expect(converted).toMatchObject({
      id: 'sdkjfsjf20348',
      people: [
        {
          name: 'Polina',
          occupation: 'developer',
        },
        {
          name: 'Igor',
          age: 7,
          occupation: 'scholler',
        },
        {
          name: 'Yurij',
        },
      ],
    });

    expect(converted.people[0].age).toBeUndefined();
    expect(converted.people[2].age).toBeUndefined();
    expect(converted.people[2].occupation).toBeUndefined();

    expect(Array.isArray(converted.people)).toBe(true);
  });
});
