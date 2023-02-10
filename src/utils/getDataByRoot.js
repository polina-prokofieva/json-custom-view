const getDataFromRootArray = (data, root) =>
  root.reduce((acc, curr) => acc[curr], data);

export const getDataByRoot = (data, root = '') => {
  if (!root || root === '') return data;

  if (Array.isArray(root)) {
    return getDataFromRootArray(data, root);
  } else {
    const splitted = root.replaceAll('[', '.').replaceAll(']', '').split('.');
    return getDataFromRootArray(data, splitted);
  }
};
