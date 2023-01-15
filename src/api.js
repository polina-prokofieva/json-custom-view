import { transform } from './transform.js';
import { render } from './render/general.js';
import { addNotification } from './notifications.js';
import { settings, setSettings, checkSettings } from './settings.js';

export const convert = data => {
  try {
    const parsed = JSON.parse(data);
    const converted = transform(parsed);

    return converted;
  } catch (error) {
    addNotification('error', error.message);
    console.error(error.message);
    return null;
  }
};

export const generate = (data, customSettings, nodeElement) => {
  setSettings(customSettings);
  checkSettings();
  render(convert(data), nodeElement);
};
