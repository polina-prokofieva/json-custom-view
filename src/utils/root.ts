import { getSettings } from '../settings';
import { isObject } from './isObject';
import { ArrayOrObjectValueType, ObjectValueType, ValueType } from '../types';

export const getDataByRoot = (data: ArrayOrObjectValueType): ValueType => {
  const settings = getSettings();
  const { root } = settings;

  return Array.isArray(root)
    ? root.reduce(
      (acc: ValueType, curr: string) => (acc as ObjectValueType)[curr],
      data
    )
    : data;
};

/**
 * The key under which the root data lives: the last part of `root`,
 * or '' when the whole JSON is rendered.
 */
export const getLastRootKey = (): string => {
  const { root } = getSettings();

  return (Array.isArray(root) && root[root.length - 1]) || '';
};

export const isRootTable = (data: ValueType): boolean => {
  const { arraysAsTable = [] } = getSettings();

  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every((item) => isObject(item)) &&
    arraysAsTable.includes(getLastRootKey())
  );
};
