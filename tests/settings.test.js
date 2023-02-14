import expect from 'expect';
import {
  setSettings,
  getSettings,
  clearSettings,
  createRootArray,
  isNeedToSaveKey,
} from '../src/settings';

const defaultSettings = {
  root: [],
  isFormatKeys: false,
  hideArrayElements: false,
  hideEmpty: true,
  isMergeSingleFields: false,
  showNotifications: true,
  keysDict: {},
  keysOldToNew: {},
  arraysAsTable: [],
  keysForArrays: {},
};

describe('Set and get settings correctly', () => {
  it('clear', () => {
    clearSettings();
    expect(getSettings()).toStrictEqual(defaultSettings);
  });

  it('set dummy settings', () => {
    setSettings({
      hideEmpty: false,
      arraysAsTable: ['accounts'],
    });
    const settings = getSettings();
    expect(getSettings()).toStrictEqual({
      ...defaultSettings,
      hideEmpty: false,
      arraysAsTable: ['accounts'],
    });
  });
});

describe('createRootArray', () => {
  it('nullable data', () => {
    expect(createRootArray(null)).toStrictEqual([]);
    expect(createRootArray([])).toStrictEqual([]);
    expect(createRootArray()).toStrictEqual([]);
  });
});

describe('isNeedToSaveKey', () => {
  setSettings({
    arraysAsTable: ['accounts'],
    keysForArrays: {
      lbo_bookout: 'lbo_base_value',
    },
  });

  it('simple tests', () => {
    expect(isNeedToSaveKey('account', [])).toBeTruthy;
    expect(isNeedToSaveKey('lbo_bookout', [])).toBeTruthy;
    expect(isNeedToSaveKey('account', {})).toBeFalsy;
    expect(isNeedToSaveKey('lbo_bookout', {})).toBeFalsy;
    expect(isNeedToSaveKey('account', 123)).toBeFalsy;
    expect(isNeedToSaveKey('lbo_bookout', 123)).toBeFalsy;
    expect(isNeedToSaveKey('bookout', 123)).toBeFalsy;
    expect(isNeedToSaveKey('bookout', [])).toBeFalsy;
  });
});
