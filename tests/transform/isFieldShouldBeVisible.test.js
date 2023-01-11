import { describe, expect, test } from '@jest/globals';
import { isFieldShouldBeVisible } from '../../src/utils/converting';
import {
  removeFalseFields,
  hideFalseAndNull,
  hideByValue,
  hideBySeveralValues,
  removeByKeyAndValue,
} from '../../data/settings';
import { setSettings } from '../../src/api';

describe('Check if field should be hidden', () => {
  it('No hiding settings', () => {
    expect(isFieldShouldBeVisible('someKey', 'someValue', {})).toBe(true);
  });

  it('Hide false', () => {
    setSettings(removeFalseFields);
    expect(isFieldShouldBeVisible('someKey', false)).toBe(false);
    expect(isFieldShouldBeVisible('someKey', 'value')).toBe(true);

    setSettings(hideFalseAndNull);
    expect(isFieldShouldBeVisible('someKey', false)).toBe(false);
    expect(isFieldShouldBeVisible('someKey', 'value')).toBe(true);
  });

  it('Hide "second" key', () => {
    setSettings(hideByValue);
    expect(isFieldShouldBeVisible('someKey', 'someValue')).toBe(true);
    expect(isFieldShouldBeVisible('second', 'someValue')).toBe(false);

    setSettings(hideBySeveralValues);
    expect(isFieldShouldBeVisible('someKey', 'someValue')).toBe(true);
    expect(isFieldShouldBeVisible('second', 'someValue')).toBe(false);
  });

  it('Hide by key and value', () => {
    setSettings(removeByKeyAndValue);
    expect(isFieldShouldBeVisible('someKey', 'someValue')).toBe(true);
    expect(isFieldShouldBeVisible('second', 'someValue')).toBe(false);
    expect(isFieldShouldBeVisible('someKey', null)).toBe(false);
    expect(isFieldShouldBeVisible('second', null)).toBe(false);
  });
});
