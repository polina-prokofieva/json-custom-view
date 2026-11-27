import { ValueType } from '../types';

export const valueAppearence = (
  value: ValueType,
  {
    nullAppearence,
    boolAppearence,
  }: { nullAppearence?: string; boolAppearence?: [string, string] }
): ValueType => {
  if (boolAppearence && typeof value === 'boolean') {
    return boolAppearence[+value];
  }

  if (nullAppearence && value === null) {
    return nullAppearence;
  }

  return value;
};
