import { isObject } from './isObject.js';
import { isEmptyObjectOrArray } from './isEmpty.js';
import { getSettings } from '../settings.js';

export const isFieldShouldBeVisible = (key, value) => {
  const settings = getSettings();
  const { hidePropertiesByValue, hidePropertiesByKey, hideEmpty } = settings;

  if (!hidePropertiesByKey && !hidePropertiesByValue && !hideEmpty) return true;

  if (
    !isObject(value) &&
    hidePropertiesByValue &&
    hidePropertiesByValue.includes(value)
  ) {
    return false;
  }

  if (key && hidePropertiesByKey && hidePropertiesByKey.includes(key)) {
    return false;
  }

  if (isEmptyObjectOrArray(value) && hideEmpty) return false;

  return true;
};
