export const isObject = (data: unknown): boolean =>
  typeof data === 'object' && !Array.isArray(data) && data !== null;
