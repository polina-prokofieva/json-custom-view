import { isFieldShouldBeVisible } from './utils/converting.js';
import { isEmptyObjectOrArray } from './utils/isEmpty.js';
import { valueAppearence } from './utils/appearence.js';
import { convertKey } from './utils/formatKeys.js';
import { splitSingleFields, isSingle } from './utils/splitFields.js';
import { getSettings, saveKey } from './settings.js';

export const transform = data => {
  const settings = getSettings();
  if (!settings || !Object.keys(settings).length) return data;

  const isArray = Array.isArray(data);
  const { isFormatKeys, hideEmpty, isSplitSingleFields } = settings;
  const transformed = isArray ? [] : {};

  for (const key in data) {
    let newKey = isFormatKeys ? convertKey(key) : key;

    if (key !== newKey) {
      saveKey(key, newKey);
    }

    if (!isFieldShouldBeVisible(key, data[key])) continue;

    if (data[key] && typeof data[key] === 'object') {
      let transformedBranch = transform(data[key]);

      if (hideEmpty && isEmptyObjectOrArray(transformedBranch)) continue;

      if (isSplitSingleFields && !isArray && isSingle(transformedBranch)) {
        const splitted = splitSingleFields(newKey, transformedBranch);
        newKey = splitted.key;
        transformedBranch = splitted.value;
        saveKey(Object.keys(data[key])[0], newKey);
      }

      transformed[newKey] = transformedBranch;
    } else {
      const { nullAppearence, boolAppearence } = settings;
      transformed[newKey] = valueAppearence(data[key], {
        nullAppearence,
        boolAppearence,
      });
    }
  }

  return isArray && transformed.length === 1 && isSplitSingleFields
    ? transformed[0]
    : transformed;
};
