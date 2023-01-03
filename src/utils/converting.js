import { isObject } from './isObject.js';
import { isEmptyObjectOrArray } from './isEmpty.js';

export const isFieldShouldBeVisible = (key, value, settings) => {
  const { hidePropertiesByValue, hidePropertiesByKey, hideEmpty } = settings;

  if (!hidePropertiesByKey && !hidePropertiesByValue && !hideEmpty) return true;

  if (
    !isObject(value) &&
    hidePropertiesByValue &&
    hidePropertiesByValue.includes(value)
  ) {
    return false;
  }

  if (hidePropertiesByKey && hidePropertiesByKey.includes(key)) {
    return false;
  }

  if (isEmptyObjectOrArray(value) && hideEmpty) return false;

  return true;
};
