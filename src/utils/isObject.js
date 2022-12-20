export const isObject = data =>
  typeof data === 'object' && !Array.isArray(data) && data !== null;
