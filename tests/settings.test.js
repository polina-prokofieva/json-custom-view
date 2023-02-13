import expect from 'expect';
import {
  setSettings,
  getSettings,
  clearSettings,
  createRootArray,
  splitPathRoot,
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
