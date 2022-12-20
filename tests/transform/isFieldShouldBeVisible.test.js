import { describe, expect, test } from '@jest/globals';
import { isFieldShouldBeVisible } from '../../src/utils/converting';
import {
  removeFalseFields,
  hideFalseAndNull,
  hideByValue,
  hideBySeveralValues,
  removeByKeyAndValue,
} from '../../data/settings';

describe('Check if field should be hidden', () => {
  it('No hiding settings', () => {
    expect(isFieldShouldBeVisible('someKey', 'someValue', {})).toBe(true);
  });

  it('Hide false', () => {
    expect(isFieldShouldBeVisible('someKey', false, removeFalseFields)).toBe(
      false
    );
    expect(isFieldShouldBeVisible('someKey', 'value', removeFalseFields)).toBe(
      true
    );
    expect(isFieldShouldBeVisible('someKey', false, hideFalseAndNull)).toBe(
      false
    );
    expect(isFieldShouldBeVisible('someKey', 'value', hideFalseAndNull)).toBe(
      true
    );
  });

  it('Hide "second" key', () => {
    expect(isFieldShouldBeVisible('someKey', 'someValue', hideByValue)).toBe(
      true
    );
    expect(isFieldShouldBeVisible('second', 'someValue', hideByValue)).toBe(
      false
    );
    expect(
      isFieldShouldBeVisible('someKey', 'someValue', hideBySeveralValues)
    ).toBe(true);
    expect(
      isFieldShouldBeVisible('second', 'someValue', hideBySeveralValues)
    ).toBe(false);
  });

  it('Hide by key and value', () => {
    expect(
      isFieldShouldBeVisible('someKey', 'someValue', removeByKeyAndValue)
    ).toBe(true);
    expect(
      isFieldShouldBeVisible('second', 'someValue', removeByKeyAndValue)
    ).toBe(false);
    expect(isFieldShouldBeVisible('someKey', null, removeByKeyAndValue)).toBe(
      false
    );
    expect(isFieldShouldBeVisible('second', null, removeByKeyAndValue)).toBe(
      false
    );
  });
});
