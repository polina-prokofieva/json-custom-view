import { addWarning } from './notifications';
import { RootType, SettingsType, InnerSettingsType } from './types';

const defaultSettings: SettingsType = {
  root: [],
  isFormatKeys: false,
  hideArrayElements: false,
  hideEmpty: true,
  isMergeSingleFields: false,
  showNotifications: true,
  arraysAsTable: [],
  keysForArrays: {},
};

const innerSettings: InnerSettingsType = {
  keysDict: {},
  keysOldToNew: {},
};

let settings: SettingsType = defaultSettings;

export const splitPathRoot = (root: string): string[] =>
  root.replaceAll('[', '.').replaceAll(']', '').split('.');

export const createRootArray = (root?: RootType): string[] => {
  if (!root) return [];
  if (typeof root === 'string') return splitPathRoot(root);
  return root;
};

export const setSettings = (customSettings: SettingsType): void => {
  settings = {
    ...defaultSettings,
    ...customSettings,
    root: createRootArray(customSettings.root),
  };
};

export const clearSettings = (): void => {
  settings = defaultSettings;
  innerSettings.keysDict = {};
  innerSettings.keysOldToNew = {};
};

export const getSettings = (): SettingsType => ({ ...settings });

export const isNeedToSaveKey = (key: string, value: any): boolean => {
  const { arraysAsTable, keysForArrays } = settings;
  const isKeyShouldBeSaved =
    arraysAsTable?.includes(key) ||
    (keysForArrays && Object.keys(keysForArrays).includes(key));
  return Array.isArray(value) && !!isKeyShouldBeSaved;
};

export const saveKey = (oldKey: string, newKey: string, value: any): void => {
  if (!isNeedToSaveKey(oldKey, value) || oldKey === newKey) return;

  if (
    innerSettings.keysDict[newKey] &&
    innerSettings.keysDict[newKey] !== oldKey
  ) {
    addWarning(
      `There is more that one field with transformed key ${newKey} with different original keys`
    );
  }
  innerSettings.keysDict[newKey] = oldKey;

  if (
    innerSettings.keysOldToNew[oldKey] &&
    innerSettings.keysOldToNew[oldKey] !== newKey
  ) {
    addWarning(
      `There is more that one field with original key ${oldKey} with different transformed keys`
    );
  }
  innerSettings.keysOldToNew[oldKey] = newKey;
};

export const getNewKeyFromOld = (oldKey: string): string =>
  innerSettings.keysOldToNew[oldKey] || oldKey;

export const getOldKey = (key: string): string =>
  innerSettings.keysDict[key] || key;

export const checkSettings = (): void => {
  const {
    root,
    keysForArrays,
    arraysAsTable = [],
    hidePropertyByKey,
  } = settings;

  if (!Array.isArray(arraysAsTable)) {
    addWarning('"arraysAsTable" should be an array');
  } else if (keysForArrays) {
    arraysAsTable.forEach((arrayKey) => {
      if (keysForArrays[arrayKey]) {
        addWarning(
          `There is the same array in "keysForArrays" and "arraysAsTable" settings. These settings couldn't be setted both.`
        );
      }
    });
  }

  const sameKeys: string[] = [];

  Array.isArray(root) &&
    root.forEach((key) => {
      hidePropertyByKey &&
        hidePropertyByKey.includes(key) &&
        sameKeys.push(key);
    });

  if (sameKeys.length !== 0) {
    addWarning(
      `Keys: ${sameKeys} are the same in "root" and in "hidePropertyByKey"`
    );
  }
};
