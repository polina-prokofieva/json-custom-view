import { transform } from './transform';

export const convert = (data, settings = {}) => {
  try {
    const parsed = JSON.parse(data);
    const converted = transform(parsed, settings);

    return converted;
  } catch (error) {
    // console.error && console.error(error.message);
    return 'Invalid JSON';
  }
};
