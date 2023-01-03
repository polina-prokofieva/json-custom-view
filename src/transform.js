import { isFieldShouldBeVisible } from './utils/converting.js';
import { isEmptyObjectOrArray } from './utils/isEmpty.js';
import { valueAppearence } from './utils/appearence.js';
import { convertKey } from './utils/formatKeys.js';

export const transform = (data, settings) => {
  if (!settings || !Object.keys(settings).length) return data;

  const transformed = Array.isArray(data) ? [] : {};

  const { isFormatKeys, hideEmpty } = settings;

  for (const key in data) {
    const newKey = isFormatKeys ? convertKey(key) : key;

    if (isFieldShouldBeVisible(key, data[key], settings)) {
      if (data[key] && typeof data[key] === 'object') {
        const transformedBranch = transform(data[key], settings);

        if (!hideEmpty || !isEmptyObjectOrArray(transformedBranch)) {
          transformed[newKey] = transformedBranch;
        }
      } else {
        transformed[newKey] = valueAppearence(data[key], settings);
      }
    }
  }

  return transformed;
};
