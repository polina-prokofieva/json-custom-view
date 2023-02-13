import { transform } from './transform.js';
import { render } from './render/general.js';
import { clearNotifications, addError } from './notifications.js';
import { setSettings, checkSettings } from './settings.js';

export const convert = data => {
  try {
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    const converted = transform(parsed);

    return converted;
  } catch (error) {
    throw error;
  }
};

export const generate = (data, nodeElement, customSettings) => {
  let convertedData;

  clearNotifications();

  try {
    if (!nodeElement) {
      throw new Error(
        'The second parameter of the "generate" function should be a node element.'
      );
    }

    setSettings(customSettings);
    checkSettings();

    convertedData = convert(data);
  } catch (error) {
    addError(error.message);
    console.error(error.message);
  }

  nodeElement && render(convertedData, nodeElement);
};

export { transform };
