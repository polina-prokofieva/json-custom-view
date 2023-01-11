import { describe, expect } from '@jest/globals';
import { convertByMask } from '../../src/utils/formatKeys';

describe('Generate key for array element', () => {
  const simpleElement = {
    name: 'Running Boards',
    code: '137',
    text: '1000',
  };

  it('Generate simple key', () => {
    expect(convertByMask(simpleElement, 'name')).toStrictEqual(
      'Running Boards'
    );
    expect(convertByMask(simpleElement, 'code')).toStrictEqual('137');
  });

  it('Generate complicated key (one level)', () => {
    expect(convertByMask(simpleElement, '{name} | {code}')).toStrictEqual(
      'Running Boards | 137'
    );
    expect(
      convertByMask(simpleElement, '{name} | {code} | {text}')
    ).toStrictEqual('Running Boards | 137 | 1000');
  });

  const twoLevelsElement = {
    type: 'current',
    emp_status: {
      type: 'employed',
    },
    occupation: 'DEVELOPER',
    salary: {
      type: 'annual',
      text: '50000',
    },
  };

  const moreLevelsElement = {
    name: 'Running Boards',
    code: '137',
    text: '1000',
    address: {
      type: 'current',
      street: {
        no: '1201',
        name: 'EAST ROAD',
      },
    },
  };

  it('More levels', () => {
    expect(
      convertByMask(
        twoLevelsElement,
        '{type} | {emp_status.type} | {salary.type}'
      )
    ).toStrictEqual('current | employed | annual');

    expect(
      convertByMask(
        moreLevelsElement,
        '{name} + {address.type} * {address.street.no} !!!'
      )
    ).toStrictEqual('Running Boards + current * 1201 !!!');
  });
});
