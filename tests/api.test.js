import { describe, expect, test } from '@jest/globals';
import {
  emptyJson,
  invalidJson,
  jsonObjectOfBoolians,
  jsonOneLevel,
} from '../data/constants.js';
import { defaultSettings, removeFalseFields } from '../data/settings';
import { convert } from '../src/api.js';

describe('Convert w/o settings object', () => {
  it('Invalid JSON', () => {
    const converted = convert(invalidJson);

    expect(converted).toEqual(null);
  });

  it('Convert empty object', () => {
    const converted = convert(emptyJson);

    expect(converted).toMatchObject({});
  });
});

describe('Remove some fields by value', () => {
  it('Remove false (only) fields from one level', () => {
    const converted = convert(jsonObjectOfBoolians, removeFalseFields);
    expect(converted).toMatchObject({
      first: true,
      third: true,
      fourth: 'something else',
    });
  });
  it('Remove false and null fields from one level', () => {
    const converted = convert(jsonOneLevel, {
      hidePropertiesByValue: [false, null],
    });
    expect(converted).toMatchObject({
      first: true,
      third: true,
      fourth: 'something else',
      seventh: 'string',
      ninth: 0,
      tenth: 'zero',
    });
  });
  it('Remove 0 field from one level', () => {
    const converted = convert(jsonOneLevel, {
      hidePropertiesByValue: [0],
    });
    expect(converted).toMatchObject({
      first: true,
      second: false,
      third: true,
      fourth: 'something else',
      fifth: null,
      sixth: false,
      seventh: 'string',
      eighth: null,
      tenth: 'zero',
    });
  });
  it('Remove "zero" field from one level', () => {
    const converted = convert(jsonOneLevel, {
      hidePropertiesByValue: ['zero'],
    });
    expect(converted).toMatchObject({
      first: true,
      second: false,
      third: true,
      fourth: 'something else',
      fifth: null,
      sixth: false,
      seventh: 'string',
      eighth: null,
      ninth: 0,
    });
  });
  it('Remove several fields different types from one level', () => {
    const converted = convert(jsonOneLevel, {
      hidePropertiesByValue: [false, 0, null, 'zero'],
    });
    expect(converted).toMatchObject({
      first: true,
      third: true,
      fourth: 'something else',
      seventh: 'string',
    });
    expect(converted.first).toBeDefined();
    expect(converted.third).toBeDefined();
    expect(converted.fourth).toBeDefined();
    expect(converted.seventh).toBeDefined();
  });
  it('Remove false and null fields from one level', () => {
    const converted = convert(jsonOneLevel, {
      hidePropertiesByValue: [false, null],
    });
    expect(converted).toMatchObject({
      first: true,
      third: true,
      fourth: 'something else',
      seventh: 'string',
      ninth: 0,
      tenth: 'zero',
    });
  });
  it('Remove 0 field from one level', () => {
    const converted = convert(jsonOneLevel, {
      hidePropertiesByValue: [0],
    });
    expect(converted).toMatchObject({
      first: true,
      second: false,
      third: true,
      fourth: 'something else',
      fifth: null,
      sixth: false,
      seventh: 'string',
      eighth: null,
      tenth: 'zero',
    });
  });
  it('Remove "zero" field from one level', () => {
    const converted = convert(jsonOneLevel, {
      hidePropertiesByValue: ['zero'],
    });
    expect(converted).toMatchObject({
      first: true,
      second: false,
      third: true,
      fourth: 'something else',
      fifth: null,
      sixth: false,
      seventh: 'string',
      eighth: null,
      ninth: 0,
    });
  });
  it('Remove several fields different types from one level', () => {
    const converted = convert(jsonOneLevel, {
      hidePropertiesByValue: [false, 0, null, 'zero'],
    });
    expect(converted).toMatchObject({
      first: true,
      third: true,
      fourth: 'something else',
      seventh: 'string',
    });
    expect(converted.first).toBeDefined();
    expect(converted.third).toBeDefined();
    expect(converted.fourth).toBeDefined();
    expect(converted.seventh).toBeDefined();
  });
});
