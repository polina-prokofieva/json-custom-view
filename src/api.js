import { transform } from './transform.js';
import { render } from './render/general.js';
import { addNotification } from './notifications.js';
import { setSettings, checkSettings } from './settings.js';

export const convert = data => {
  try {
    const parsed = JSON.parse(data);
    const converted = transform(parsed);

    return converted;
  } catch (error) {
    throw error;
  }
};

export const generate = (data, nodeElement, customSettings) => {
  let convertedData;

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
    addNotification('error', error.message);
    console.error(error.message);
  }

  nodeElement && render(convertedData, nodeElement);
};
