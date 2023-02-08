export const defaultSettings = {
  root: '',
  isFormatKeys: true,
  hideEmpty: true,
  nullAppearence: '-',
  boolAppearence: ['No', 'Yes'],
  hidePropertiesByValue: [null, 0, ''],
  hidePropertiesByKey: ['OverdraftLimit', 'Description', 'Id'],
  dateAppearence: {
    keys: ['Date'],
  },
  hideArrayElements: false,
  showSearchPanel: true,
  arraysAsTable: ['lbo_bookout', 'applicant_data', 'lbo_options'],
  keysForArrays: {
    options: '{name} | {code}',
  },
};

export const removeFalseFields = {
  hidePropertiesByValue: [false],
};

export const removeNullFields = {
  hidePropertiesByValue: [null],
};

export const hideFalseAndNull = {
  hidePropertiesByValue: [false, null],
};

export const removeByKeyAndValue = {
  hidePropertiesByValue: [null],
  hidePropertiesByKey: ['second'],
};

export const hideByValue = {
  hidePropertiesByKey: ['second'],
};

export const hideBySeveralValues = {
  hidePropertiesByKey: ['second', 'third', 'p1'],
};

export const nullAndBoolSettings = {
  nullAppearence: '-',
  boolAppearence: ['No', 'Yes'],
};
