import { describe, expect } from '@jest/globals';
import { transform } from '../../src/transform';

const data = {
  dt_lender_id: 'CMB',
  credit_type: {
    '@type': 'joint',
  },
  app_type: {
    at_type: 'personal',
  },
  product_type: {
    '@type': 'retail',
    '@paymentcall': 'no',
  },
};

const data02 = {
  Bespoke: {
    ToBeDefined: [
      {
        name: 'Harry',
        surname: 'Potter',
      },
      {
        name: 'Hermiona',
        surname: 'Grainger',
      },
    ],
  },
  somevalue: null,
};

describe('Root', () => {
  it('root as simple string', () => {
    expect(transform(data, { root: 'app_type' })).toStrictEqual({
      at_type: 'personal',
    });
    expect(transform(data, { root: 'product_type' })).toStrictEqual({
      '@type': 'retail',
      '@paymentcall': 'no',
    });
    expect(transform(data02, { root: 'Bespoke' })).toStrictEqual({
      ToBeDefined: [
        {
          name: 'Harry',
          surname: 'Potter',
        },
        {
          name: 'Hermiona',
          surname: 'Grainger',
        },
      ],
    });
  });

  it('root as array of keys', () => {
    expect(transform(data02, { root: ['Bespoke'] })).toStrictEqual({
      ToBeDefined: [
        {
          name: 'Harry',
          surname: 'Potter',
        },
        {
          name: 'Hermiona',
          surname: 'Grainger',
        },
      ],
    });
    expect(
      transform(data02, { root: ['Bespoke', 'ToBeDefined'] })
    ).toStrictEqual([
      {
        name: 'Harry',
        surname: 'Potter',
      },
      {
        name: 'Hermiona',
        surname: 'Grainger',
      },
    ]);

    expect(
      transform(data02, { root: ['Bespoke', 'ToBeDefined', 1] })
    ).toStrictEqual({
      name: 'Hermiona',
      surname: 'Grainger',
    });
  });

  it('root as string with path', () => {
    expect(transform(data02, { root: 'Bespoke.ToBeDefined[1]' })).toStrictEqual(
      {
        name: 'Hermiona',
        surname: 'Grainger',
      }
    );
  });
});
