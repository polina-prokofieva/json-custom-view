import { getSettings } from '../settings';

export const getDataByRoot = (data: object): any => {
  const settings = getSettings();
  const { root } = settings;

  return Array.isArray(root)
    ? root.reduce((acc: any, curr: string) => acc[curr], data)
    : data;
};
