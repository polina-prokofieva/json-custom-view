import { isFieldShouldBeVisible } from './utils/converting.js';
import { isEmptyObjectOrArray } from './utils/isEmpty.js';
import { valueAppearence } from './utils/appearence.js';
import { convertKey } from './utils/formatKeys.js';
import { mergeSingleFields, isSingle } from './utils/mergeFields.js';
import { getDataByRoot } from './utils/getDataByRoot.js';
import {
  setSettings,
  checkSettings,
  getSettings,
  saveKey,
} from './settings.js';

export const transform = (data, customSettings) => {
  let settings;

  if (customSettings) {
    setSettings(customSettings);
    checkSettings();
  }
  settings = getSettings();
  const dataFromRoot = getDataByRoot(data);

  return transformValue(dataFromRoot);
};

const transformValue = data => {
  const settings = getSettings();
  const isArray = Array.isArray(data);
  const transformed = isArray ? [] : {};
  const { isMergeSingleFields, isFormatKeys } = settings;

  for (const key in data) {
    if (!isFieldShouldBeVisible(key, data[key])) continue;

    let newKey = isFormatKeys ? convertKey(key) : key;

    if (data[key] && typeof data[key] === 'object') {
      const transformedBranch = transformBranch(
        newKey,
        key,
        data[key],
        isArray
      );
      if (transformedBranch)
        transformed[transformedBranch.key] = transformedBranch.value;
    } else {
      const { nullAppearence, boolAppearence } = settings;
      transformed[newKey] = valueAppearence(data[key], {
        nullAppearence,
        boolAppearence,
      });
    }
  }

  return isArray && transformed.length === 1 && isMergeSingleFields
    ? transformed[0]
    : transformed;
};

const transformBranch = (key, oldKey, value, isArrayElement) => {
  const settings = getSettings();
  const { hideEmpty, isMergeSingleFields } = settings;

  let newKey = key;
  let transformedBranch = transformValue(value);

  if (hideEmpty && isEmptyObjectOrArray(transformedBranch)) return;

  if (isMergeSingleFields && !isArrayElement && isSingle(transformedBranch)) {
    const merged = mergeSingleFields(key, transformedBranch);
    newKey = merged.key;
    transformedBranch = merged.value;
    saveKey(Object.keys(value)[0], newKey, transformedBranch);
  } else {
    saveKey(oldKey, newKey, transformedBranch);
  }

  return { key: newKey, value: transformedBranch };
};
