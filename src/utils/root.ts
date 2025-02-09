import { getSettings } from '../settings';
import { ArrayOrObjectValueType, ValueType } from '../types';

export const getDataByRoot = (data: ArrayOrObjectValueType): ValueType => {
  const settings = getSettings();
  const { root } = settings;

  return Array.isArray(root)
    ? root.reduce((acc: any, curr: string) => acc[curr], data)
    : data;
};

export const getLastRootKey = (): string => {
  const settings = getSettings();
  const { root } = settings;

  console.log('root', root);

  return root[root.length - 1] || '';
};

export const isRootTable = (): boolean => {
  const { arraysAsTable } = getSettings();

  return arraysAsTable.includes(getLastRootKey());
};
