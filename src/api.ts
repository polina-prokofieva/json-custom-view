import { transform } from './transform';
import { render } from './render/general';
import { clearNotifications, addError } from './notifications';
import { setSettings, checkSettings } from './settings';
import { SettingsType, ValueType } from './types';

export const convert = (data: ValueType): ValueType => {
  const parsed = typeof data === 'string' ? JSON.parse(data) : data;

  return transform(parsed);
};

export const generate = (
  data: ValueType,
  nodeElement: HTMLElement,
  customSettings?: SettingsType
): void => {
  let convertedData: ValueType;

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
    // eslint-disable-next-line no-console
    console.error(error.message);
  }

  if (nodeElement) {
    render(convertedData, nodeElement);
  }
};

export { transform };
