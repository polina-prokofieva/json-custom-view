import { addWarning } from './notifications';

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

let settings = defaultSettings;

export const splitPathRoot = root =>
  root.replaceAll('[', '.').replaceAll(']', '').split('.');

export const createRootArray = root => {
  if (!root) return [];
  if (typeof root === 'string') return splitPathRoot(root);
  return root;
};

export const setSettings = customSettings => {
  settings = {
    ...defaultSettings,
    ...customSettings,
    root: createRootArray(customSettings.root),
  };
};

export const clearSettings = () => {
  settings = defaultSettings;
};

export const getSettings = () => ({ ...settings });

const isNeedToSaveKey = (key, value) => {
  const { arraysAsTable, keysForArrays } = settings;
  const isKeyShouldBeSaved =
    arraysAsTable?.includes(key) || keysForArrays?.includes(key);
  return Array.isArray(value) && isKeyShouldBeSaved;
};

export const saveKey = (oldKey, newKey, value) => {
  if (!isNeedToSaveKey(oldKey, value) || oldKey === newKey) return;

  if (settings.keysDict[newKey] && settings.keysDict[newKey] !== oldKey) {
    addWarning(
      `There is more that one field with transformed key ${newKey} with different original keys`
    );
  }
  settings.keysDict[newKey] = oldKey;

  if (
    settings.keysOldToNew[oldKey] &&
    settings.keysOldToNew[oldKey] !== newKey
  ) {
    addWarning(
      `There is more that one field with original key ${oldKey} with different transformed keys`
    );
  }
  settings.keysOldToNew[oldKey] = newKey;
};

export const getNewKeyFromOld = oldKey =>
  settings.keysOldToNew[oldKey] || oldKey;

export const getOldKey = key => settings.keysDict[key] || key;

export const checkSettings = () => {
  const {
    root,
    keysForArrays,
    arraysAsTable = [],
    hidePropertyByKey,
  } = settings;

  if (!Array.isArray(arraysAsTable)) {
    addWarning('"arraysAsTable" should be an array');
  } else if (keysForArrays) {
    arraysAsTable.forEach(arrayKey => {
      if (keysForArrays[arrayKey]) {
        addWarning(
          `There is the same array in "keysForArrays" and "arraysAsTable" settings. These settings couldn't be setted both.`
        );
      }
    });
  }

  const sameKeys = [];

  root.forEach(key => {
    hidePropertyByKey.includes(key) && sameKeys.push(key);
  });

  if (sameKeys.length !== 0) {
    addWarning(
      `Keys: ${sameKeys} are the same in "root" and in "hidePropertyByKey"`
    );
  }
};
