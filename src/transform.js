import { isFieldShouldBeVisible } from './utils/converting.js';
import { isEmptyObjectOrArray } from './utils/isEmpty.js';
import { valueAppearence } from './utils/appearence.js';
import { convertKey } from './utils/formatKeys.js';
import { mergeSingleFields, isSingle } from './utils/mergeFields.js';
import { getSettings, saveKey } from './settings.js';

export const transform = data => {
  const settings = getSettings();
  if (!settings || !Object.keys(settings).length) return data;

  const isArray = Array.isArray(data);
  const { isFormatKeys, hideEmpty, isMergeSingleFields } = settings;
  const transformed = isArray ? [] : {};

  for (const key in data) {
    if (!isFieldShouldBeVisible(key, data[key])) continue;

    let newKey = isFormatKeys ? convertKey(key) : key;

    if (data[key] && typeof data[key] === 'object') {
      const transformedBranch = transformBranch(newKey, data[key], isArray);
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

const transformBranch = (key, value, isArrayElement) => {
  const settings = getSettings();
  const { hideEmpty, isMergeSingleFields } = settings;

  let newKey = key;
  let transformedBranch = transform(value);

  if (hideEmpty && isEmptyObjectOrArray(transformedBranch)) return;

  if (isMergeSingleFields && !isArrayElement && isSingle(transformedBranch)) {
    const merged = mergeSingleFields(key, transformedBranch);
    newKey = merged.key;
    transformedBranch = merged.value;
    saveKey(Object.keys(value)[0], newKey);
  } else {
    saveKey(key, newKey);
  }

  return { key: newKey, value: transformedBranch };
};
