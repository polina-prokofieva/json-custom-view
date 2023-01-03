import { transform } from './transform.js';
import { render } from './render.js';
import { defaultSettings } from './defaultSettings.js';

export const convert = (data, customSettings = {}) => {
  const settings = { ...defaultSettings, ...customSettings };

  try {
    const parsed = JSON.parse(data);
    const converted = transform(parsed, settings);

    return converted;
  } catch (error) {
    // console.error && console.error(error.message);
    return 'Invalid JSON';
  }
};

export const generate = (data, settings, nodeElement) => {
  render(convert(data, settings), nodeElement);
};
