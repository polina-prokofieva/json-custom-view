import { describe, expect } from '@jest/globals';
import { transform } from '../../src/transform';
import {
  isSingle,
  splitSingleFieldsToOneLevel,
} from '../../src/utils/splitFields';

describe('Split single keys to one level', () => {
  it('Check is there is only one field', () => {
    expect(isSingle([123])).toBe(true);
    expect(isSingle([{}])).toBe(true);
    expect(isSingle([{}, {}])).toBe(false);
    expect(isSingle([123, 234])).toBe(false);
    expect(isSingle([])).toBe(false);

    expect(isSingle({})).toBe(false);
    expect(isSingle({ key: 123 })).toBe(true);
    expect(isSingle({ key: 123, key2: '234' })).toBe(false);
  });

  it('Split single keys to one level', () => {
    expect(
      splitSingleFieldsToOneLevel('person', {
        name: 'Polina',
      })
    ).toStrictEqual({
      key: 'person > name',
      value: 'Polina',
    });

    expect(
      splitSingleFieldsToOneLevel('person', {
        name: {
          first: 'Polina',
        },
      })
    ).toStrictEqual({
      key: 'person > name > first',
      value: 'Polina',
    });

    expect(
      splitSingleFieldsToOneLevel('one', {
        two: {
          three: {
            four: {
              five: 'value',
            },
          },
        },
      })
    ).toStrictEqual({
      key: 'one > two > three > four > five',
      value: 'value',
    });

    expect(splitSingleFieldsToOneLevel('animal', ['cat'])).toStrictEqual({
      key: 'animal',
      value: 'cat',
    });

    expect(splitSingleFieldsToOneLevel('animal', [[[['cat']]]])).toStrictEqual({
      key: 'animal',
      value: 'cat',
    });

    expect(splitSingleFieldsToOneLevel('animal', [{ age: 3 }])).toStrictEqual({
      key: 'animal > age',
      value: 3,
    });

    expect(
      splitSingleFieldsToOneLevel('animal', [{ age: [[[3]]] }])
    ).toStrictEqual({
      key: 'animal > age',
      value: 3,
    });

    expect(
      splitSingleFieldsToOneLevel('people', [{ name: { first: [['Polina']] } }])
    ).toStrictEqual({
      key: 'people > name > first',
      value: 'Polina',
    });

    expect(
      splitSingleFieldsToOneLevel('people', { name: [{ first: [['Polina']] }] })
    ).toStrictEqual({
      key: 'people > name > first',
      value: 'Polina',
    });
  });
});

describe('Transforming objects with splitting single fields', () => {
  const data01 = {
    people: [
      {
        name: {
          first: [['Polina']],
        },
        occupation: null,
      },
    ],
    animals: [[['cat'], []]],
  };

  const data02 = {
    people: [
      {
        name: {
          first: [['Polina']],
        },
      },
    ],
    animals: [[['cat'], []]],
  };

  const data03 = {
    people: [{ name: 'Harry Potter' }],
  };

  const settings01 = {
    hidePropertiesByValue: [null, 0, ''],
    hideEmpty: true,
    isSplitSingleFields: true,
  };

  it('Transform objcets 1', () => {
    expect(transform({ animals: [[['cat']]] }, settings01)).toStrictEqual({
      animals: 'cat',
    });

    expect(transform({ animals: [[['cat'], []]] }, settings01)).toStrictEqual({
      animals: 'cat',
    });

    expect(transform(data03, settings01)).toStrictEqual({
      'people > name': 'Harry Potter',
    });

    expect(transform(data02, settings01)).toStrictEqual({
      'people > name > first': 'Polina',
      animals: 'cat',
    });
  });

  it('Transform objcets 2', () => {
    expect(
      transform(data01, { hideEmpty: false, isSplitSingleFields: true })
    ).toStrictEqual({
      people: {
        'name > first': 'Polina',
        occupation: null,
      },
      animals: ['cat', []],
    });
  });

  it('Transform objcets 3', () => {
    expect(
      transform(data01, {
        hidePropertiesByValue: [null, 0, ''],
        hideEmpty: false,
        isSplitSingleFields: true,
      })
    ).toStrictEqual({
      'people > name > first': 'Polina',
      animals: ['cat', []],
    });
  });
});
