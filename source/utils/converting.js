import { isObject } from './isObject';

export const isFieldShouldBeVisible = (key, value, settings) => {
  const { hidePropertiesByValue, hidePropertiesByKey } = settings;

  if (!hidePropertiesByKey && !hidePropertiesByValue) return true;

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

  return true;
};
