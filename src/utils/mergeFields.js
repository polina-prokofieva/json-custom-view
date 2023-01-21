export const isSingle = data =>
  (Array.isArray(data) && data.length === 1) || Object.keys(data).length === 1;

export const mergeSingleFieldsToOneLevel = (key, value) => {
  let singleKey;
  let singleValue;

  if (Array.isArray(value)) {
    singleKey = key;
    singleValue = value[0];
  } else {
    singleKey = Object.keys(value)[0];
    singleValue = value[singleKey];
  }

  const { key: processedKey, value: processedValue } = mergeSingleFields(
    singleKey,
    singleValue
  );

  return {
    key: Array.isArray(value) ? processedKey : `${key} > ${processedKey}`,
    value: processedValue,
  };
};

export const mergeSingleFields = (key, value) =>
  value && typeof value === 'object' && isSingle(value)
    ? mergeSingleFieldsToOneLevel(key, value)
    : { key, value };
