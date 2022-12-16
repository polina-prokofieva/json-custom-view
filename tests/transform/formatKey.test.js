import { describe, expect } from '@jest/globals';
import { transform } from '../../source/transform';

const snakeCaseData = {
  first_name: 'Harry',
  second_name: 'Potter',
};

const camelCaseData = {
  firstName: 'Harry',
  secondName: 'Potter',
};

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

describe('Format keys', () => {
  it('Snake case', () => {
    expect(transform(snakeCaseData, { isFormatKeys: true })).toEqual({
      'first name': 'Harry',
      'second name': 'Potter',
    });
    expect(transform(snakeCaseData, { isFormatKeys: false })).toEqual({
      first_name: 'Harry',
      second_name: 'Potter',
    });
  });

  it('Camel case', () => {
    expect(transform(camelCaseData, { isFormatKeys: true })).toEqual({
      'first Name': 'Harry',
      'second Name': 'Potter',
    });
    expect(transform(camelCaseData, { isFormatKeys: false })).toEqual({
      firstName: 'Harry',
      secondName: 'Potter',
    });
  });

  it('complicated', () => {
    expect(transform(data, { isFormatKeys: true })).toEqual({
      'dt lender id': 'CMB',
      'credit type': {
        '@type': 'joint',
      },
      'app type': {
        'at type': 'personal',
      },
      'product type': {
        '@type': 'retail',
        '@paymentcall': 'no',
      },
    });
  });
});

describe('Format keys and remove some keys', () => {
  it('Format and Remove', () => {
    expect(
      transform(snakeCaseData, {
        isFormatKeys: true,
        hidePropertiesByKey: ['first_name'],
      })
    ).toEqual({ 'second name': 'Potter' });

    expect(
      transform(snakeCaseData, {
        isFormatKeys: true,
        hidePropertiesByKey: ['first name'],
      })
    ).toEqual({ 'first name': 'Harry', 'second name': 'Potter' });

    expect(
      transform(data, {
        isFormatKeys: true,
        hidePropertiesByKey: ['app_type'],
      })
    ).toEqual({
      'dt lender id': 'CMB',
      'credit type': {
        '@type': 'joint',
      },
      'product type': {
        '@type': 'retail',
        '@paymentcall': 'no',
      },
    });

    expect(
      transform(data, {
        isFormatKeys: true,
        hidePropertiesByKey: ['app type'],
      })
    ).toEqual({
      'dt lender id': 'CMB',
      'credit type': {
        '@type': 'joint',
      },
      'app type': {
        'at type': 'personal',
      },
      'product type': {
        '@type': 'retail',
        '@paymentcall': 'no',
      },
    });
  });
});
