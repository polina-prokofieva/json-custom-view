import { describe, expect } from '@jest/globals';
import { convertKey } from '../../source/utils/formatKeys';

describe('Convert Camel Case to separated words', () => {
  it('Invalid values', () => {
    expect(convertKey(null)).toEqual(null);
    expect(convertKey('')).toEqual('');
    expect(convertKey(undefined)).toEqual(null);
    expect(convertKey(0)).toEqual(null);
  });

  it('Single word', () => {
    expect(convertKey('Single')).toEqual('Single');
    expect(convertKey(' Single')).toEqual('Single');
    expect(convertKey(' Single    ')).toEqual('Single');
  });

  it('Two words', () => {
    expect(convertKey('TwoWords')).toEqual('Two Words');
    expect(convertKey('Two-Words')).toEqual('Two Words');
    expect(convertKey('Two_Words')).toEqual('Two Words');
    expect(convertKey('Two.Words')).toEqual('Two Words');
    expect(convertKey('Two Words')).toEqual('Two Words');
    expect(convertKey(' TwoWords')).toEqual('Two Words');
    expect(convertKey('TwoWords  ')).toEqual('Two Words');
    expect(convertKey('   Two  Words  ')).toEqual('Two Words');
  });

  it('Two words with Abbr', () => {
    expect(convertKey('ABCSomeText')).toEqual('ABC Some Text');
    expect(convertKey('SomeTextABC')).toEqual('Some Text ABC');
    expect(convertKey('SomeABCText')).toEqual('Some ABC Text');
    expect(convertKey('SomeABC Text')).toEqual('Some ABC Text');
    expect(convertKey('Some ABCText')).toEqual('Some ABC Text');
    expect(convertKey('ABC')).toEqual('ABC');
  });

  it('More word and partially separated', () => {
    expect(convertKey('SomeLongLongLongKey')).toEqual(
      'Some Long Long Long Key'
    );
    expect(convertKey('Some LongLong LongKey')).toEqual(
      'Some Long Long Long Key'
    );
    expect(convertKey('SomeLong LongLongABCKey')).toEqual(
      'Some Long Long Long ABC Key'
    );
  });

  it('Complicated keys', () => {
    expect(convertKey('Camel@Case#')).toEqual('Camel Case');
    expect(convertKey('$#@Camel@Case#')).toEqual('Camel Case');
    expect(convertKey('$#@Camel@Case# word')).toEqual('Camel Case word');
    expect(convertKey('$#@Camel@Case# snake_case')).toEqual(
      'Camel Case snake case'
    );
    expect(convertKey('CamelCaseSnake_case')).toEqual('Camel Case Snake case');
    expect(convertKey('CamelCaseKebab-case')).toEqual('Camel Case Kebab case');
    expect(convertKey('CamelCaseKebab-caseSnake_case')).toEqual(
      'Camel Case Kebab case Snake case'
    );
  });
});
