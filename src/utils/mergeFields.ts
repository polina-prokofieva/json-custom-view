import { ArrayOrObjectValueType, ObjectValueType, ValueType } from '../types';

export const isSingle = (data: ArrayOrObjectValueType): boolean =>
  (Array.isArray(data) && data.length === 1) || Object.keys(data).length === 1;

export const mergeSingleFieldsToOneLevel = (
  key: string | number,
  value: ArrayOrObjectValueType
): { key: string | number; value: ValueType } => {
  let singleKey: string | number;
  let singleValue: ValueType;

  if (Array.isArray(value)) {
    singleKey = key;
    singleValue = value[0];
  } else {
    singleKey = Object.keys(value)[0];
    singleValue = (value as ObjectValueType)[singleKey];
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

export const mergeSingleFields = (
  key: string | number,
  value: ValueType
): { key: string | number; value: ValueType } =>
  value && typeof value === 'object' && isSingle(value)
    ? mergeSingleFieldsToOneLevel(key, value)
    : { key, value };
