export const getDataByRoot = (data, root) => {
  if (root === '') return data;

  if (Array.isArray(root)) {
    return root.reduce((acc, curr) => acc[curr], data);
  } else return data[root];
};
