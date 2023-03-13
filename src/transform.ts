import { isFieldShouldBeVisible } from './utils/converting';
import { isEmptyObjectOrArray } from './utils/isEmpty';
import { valueAppearence } from './utils/appearence';
import { convertKey } from './utils/formatKeys';
import { mergeSingleFields, isSingle } from './utils/mergeFields';
import { getDataByRoot } from './utils/getDataByRoot';
import { setSettings, checkSettings, getSettings, saveKey } from './settings';
import { ObjectValueType, SettingsType, ValueType } from './types';

export const transform = (
  data: ValueType,
  customSettings?: SettingsType
): ValueType => {
  if (customSettings) {
    setSettings(customSettings);
    checkSettings();
  }

  const dataFromRoot =
    data && typeof data === 'object' ? getDataByRoot(data) : data;

  return transformValue(dataFromRoot);
};

const transformValue = (data: ValueType): ValueType => {
  if (Array.isArray(data)) {
    return transformArray(data);
  }

  if (data && typeof data === 'object') {
    return transformObject(data);
  }

  return data;
};

const transformArray = (data: ValueType[]): ValueType => {
  const settings = getSettings();
  const { isMergeSingleFields } = settings;
  const transformed: ValueType[] = [];

  data.forEach((item: ValueType, key: number) => {
    if (!isFieldShouldBeVisible(key, item)) return;

    if (data[key] && typeof data[key] === 'object') {
      const transformedBranch = transformBranch(key, data[key], true);

      if (transformedBranch && typeof transformedBranch.key === 'number')
        transformed[transformedBranch.key] = transformedBranch.value;
    } else {
      const { nullAppearence, boolAppearence } = settings;
      if (transformed && typeof transformed === 'object')
        transformed[key] = valueAppearence(data[key], {
          nullAppearence,
          boolAppearence,
        });
    }
  });

  return transformed.length === 1 && isMergeSingleFields
    ? transformed[0]
    : transformed;
};

const transformObject = (data: ObjectValueType): ValueType => {
  const settings = getSettings();
  const { isFormatKeys, capitalizeKeys } = settings;
  const transformed: ObjectValueType = {};

  for (const key in data) {
    if (!isFieldShouldBeVisible(key, data[key])) continue;

    let newKey = isFormatKeys ? convertKey(key) : key;
    if (capitalizeKeys) newKey = `${newKey[0].toUpperCase()}${newKey.slice(1)}`;

    if (data[key] && typeof data[key] === 'object') {
      const transformedBranch = transformBranch(newKey, data[key], false, key);
      if (transformedBranch)
        transformed[transformedBranch.key] = transformedBranch.value;
    } else {
      const { nullAppearence, boolAppearence } = settings;
      transformed[newKey] = valueAppearence(data[key], {
        nullAppearence,
        boolAppearence,
      });
    }
  }

  return transformed;
};

const transformBranch = (
  key: string | number,
  value: ValueType,
  isArrayElement: boolean,
  originalKey?: string
): { key: string | number; value: ValueType } | null => {
  const settings = getSettings();
  const { hideEmpty, isMergeSingleFields } = settings;

  let newKey = key;
  let transformedBranch = transformValue(value);
  let oldKey = originalKey;

  if (hideEmpty && isEmptyObjectOrArray(transformedBranch)) return null;

  if (
    transformedBranch &&
    typeof transformedBranch === 'object' &&
    isMergeSingleFields &&
    !isArrayElement &&
    isSingle(transformedBranch)
  ) {
    const merged = mergeSingleFields(key, transformedBranch);
    newKey = merged.key;
    transformedBranch = merged.value;
    oldKey = Object.keys(value)[0];
  }

  if (typeof newKey === 'string' && oldKey) {
    saveKey(oldKey, newKey, transformedBranch);
  }

  return { key: newKey, value: transformedBranch };
};
