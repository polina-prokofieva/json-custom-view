import { getSettings } from '../settings';

export const getDataByRoot = data => {
  const settings = getSettings();
  const { root } = settings;

  return root.reduce((acc, curr) => acc[curr], data);
};
