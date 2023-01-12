import { addNotification } from './notifications';

const defaultSettings = {
  root: '',
  isFormatKeys: false,
  hideArrayElements: false,
  hideEmpty: true,
  isSplitSingleFields: false,
};

let settings = defaultSettings;

export const setSettings = customSettings => {
  settings = { ...defaultSettings, ...customSettings };
};

export const getSettings = () => ({ ...settings });

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
