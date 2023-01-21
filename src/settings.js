import { addNotification } from './notifications';

const defaultSettings = {
  root: '',
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

export const setSettings = customSettings => {
  settings = { ...defaultSettings, ...customSettings };
};

export const getSettings = () => ({ ...settings });

export const saveKey = (oldKey, newKey) => {
  if (settings.keysDict[newKey] && settings.keysDict[newKey] !== oldKey) {
    addNotification(
      'warning',
      `There is more that one field with transformed key ${newKey} with different original keys`
    );
  }
  settings.keysDict[newKey] = oldKey;

  if (
    settings.keysOldToNew[oldKey] &&
    settings.keysOldToNew[oldKey] !== newKey
  ) {
    addNotification(
      'warning',
      `There is more that one field with original key ${oldKey} with different transformed keys`
    );
  }
  settings.keysOldToNew[oldKey] = newKey;
};

export const getNewKeyFromOld = oldKey =>
  settings.keysOldToNew[oldKey] || oldKey;

export const getOldKey = key => settings.keysDict[key] || key;

export const checkSettings = () => {
  const { keysForArrays, arraysAsTable = [] } = settings;

  if (!Array.isArray(arraysAsTable)) {
    addNotification('warning', '"arraysAsTable" should be an array');
  } else if (keysForArrays) {
    arraysAsTable.forEach(arrayKey => {
      if (keysForArrays[arrayKey]) {
        addNotification(
          'warning',
          'There is the same array in "keysForArrays" and "arraysAsTable" settings. These settings couldn\'t be setted both.'
        );
      }
    });
  }
};
