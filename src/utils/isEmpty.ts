export const isEmptyObjectOrArray = (value: any): boolean => {
  if (value && typeof value === 'object') {
    if (
      (Array.isArray(value) && value.length === 0) ||
      Object.keys(value).length === 0
    )
      return true;
  }

  return false;
};
