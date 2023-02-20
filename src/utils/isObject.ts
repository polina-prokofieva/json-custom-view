export const isObject = (data: any): boolean =>
  typeof data === 'object' && !Array.isArray(data) && data !== null;
