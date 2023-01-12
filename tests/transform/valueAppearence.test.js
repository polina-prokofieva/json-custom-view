import { describe, expect, test } from '@jest/globals';
import { valueAppearence } from '../../src/utils/appearence';
import { nullAndBoolSettings } from '../../data/settings';
import { transform } from '../../src/transform';
import { dataWithObjectsInArray } from '../../data/dataExamples';
import { setSettings } from '../../src/settings';

describe('Convert booleans and null values', () => {
  it('Convert bool to "yes" and "no" and null to "-"', () => {
    setSettings(nullAndBoolSettings);
    expect(valueAppearence(false, nullAndBoolSettings)).toBe('No');
    expect(valueAppearence(true, nullAndBoolSettings)).toBe('Yes');
    expect(valueAppearence(null, nullAndBoolSettings)).toBe('-');
    expect(valueAppearence('value', nullAndBoolSettings)).toBe('value');
  });
});

describe('Convert data with changing nulls', () => {
  it('Convert data with null', () => {
    setSettings(nullAndBoolSettings);
    const transformed = transform(dataWithObjectsInArray);

    expect(transformed).toStrictEqual({
      id: 'sdkjfsjf20348',
      people: [
        {
          name: 'Polina',
          age: '-',
          occupation: 'developer',
        },
        {
          name: 'Igor',
          age: 7,
          occupation: 'scholler',
        },
        {
          name: 'Yurij',
          age: '-',
          occupation: '-',
        },
      ],
    });

    expect(transformed.people[2].age).toBe('-');
    expect(transformed.people[0].age).toBe('-');
    expect(transformed.people[2].occupation).toBe('-');
    expect(transformed.people[0].name).toBe('Polina');
    expect(transformed.people[1].age).toBe(7);
  });
});
