import { transform } from './transform.js';
import { render } from './render.js';
import { addNotification } from './notifications.js';
import { defaultSettings } from './defaultSettings.js';

export let settings = defaultSettings;

export const convert = data => {
  try {
    const parsed = JSON.parse(data);
    const converted = transform(parsed);

    return converted;
  } catch (error) {
    addNotification('error', error.message);
    return null;
  }
};

export const setSettings = customSettings => {
  settings = { ...defaultSettings, ...customSettings };
  Object.freeze(settings);
};

export const generate = (data, customSettings, nodeElement) => {
  setSettings(customSettings);
  render(convert(data), nodeElement);
};
