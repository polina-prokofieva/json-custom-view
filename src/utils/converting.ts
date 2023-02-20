import { isObject } from './isObject';
import { isEmptyObjectOrArray } from './isEmpty';
import { getSettings } from '../settings';

export const isFieldShouldBeVisible = (key: string, value: any): boolean => {
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
