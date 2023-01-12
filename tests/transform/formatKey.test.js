import { describe, expect } from '@jest/globals';
import { transform } from '../../src/transform';
import { setSettings } from '../../src/settings';

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
    setSettings({ isFormatKeys: true });
    expect(transform(snakeCaseData)).toEqual({
      'first name': 'Harry',
      'second name': 'Potter',
    });

    setSettings({ isFormatKeys: false });
    expect(transform(snakeCaseData)).toEqual({
      first_name: 'Harry',
      second_name: 'Potter',
    });
  });

  it('Camel case', () => {
    setSettings({ isFormatKeys: true });
    expect(transform(camelCaseData)).toEqual({
      'first Name': 'Harry',
      'second Name': 'Potter',
    });

    setSettings({ isFormatKeys: false });
    expect(transform(camelCaseData)).toEqual({
      firstName: 'Harry',
      secondName: 'Potter',
    });
  });

  it('complicated', () => {
    setSettings({ isFormatKeys: true });
    expect(transform(data)).toEqual({
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
    setSettings({
      isFormatKeys: true,
      hidePropertiesByKey: ['first_name'],
    });
    expect(transform(snakeCaseData)).toEqual({ 'second name': 'Potter' });

    setSettings({
      isFormatKeys: true,
      hidePropertiesByKey: ['first name'],
    });
    expect(transform(snakeCaseData)).toEqual({
      'first name': 'Harry',
      'second name': 'Potter',
    });

    setSettings({
      isFormatKeys: true,
      hidePropertiesByKey: ['app_type'],
    });
    expect(transform(data)).toEqual({
      'dt lender id': 'CMB',
      'credit type': {
        '@type': 'joint',
      },
      'product type': {
        '@type': 'retail',
        '@paymentcall': 'no',
      },
    });

    setSettings({
      isFormatKeys: true,
      hidePropertiesByKey: ['app type'],
    });
    expect(transform(data)).toEqual({
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
