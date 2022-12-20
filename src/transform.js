import { isFieldShouldBeVisible } from './utils/converting.js';
import { valueAppearence } from './utils/appearence.js';
import { convertKey } from './utils/formatKeys.js';

export const transform = (data, settings) => {
  if (!settings || !Object.keys(settings).length) return data;

  const transformed = Array.isArray(data) ? [] : {};

  const { isFormatKeys } = settings;

  for (const key in data) {
    const newKey = isFormatKeys ? convertKey(key) : key;

    if (isFieldShouldBeVisible(key, data[key], settings)) {
      if (data[key] && typeof data[key] === 'object') {
        transformed[newKey] = transform(data[key], settings);
      } else {
        transformed[newKey] = valueAppearence(data[key], settings);
      }
    }
  }

  return transformed;
};
