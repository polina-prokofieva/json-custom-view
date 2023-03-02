import { getSettings } from '../settings';
import { ArrayOrObjectValueType, ValueType } from '../types';

export const getDataByRoot = (data: ArrayOrObjectValueType): ValueType => {
  const settings = getSettings();
  const { root } = settings;

  return Array.isArray(root)
    ? root.reduce((acc: any, curr: string) => acc[curr], data)
    : data;
};
