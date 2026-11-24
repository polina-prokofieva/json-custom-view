import { transform } from './transform';
import { renderData, renderNotificationsInto } from './render/general';
import { clearNotifications, addError } from './notifications';
import { setSettings, checkSettings } from './settings';
import { SettingsType, ValueType } from './types';

export const convert = (data: ValueType): ValueType => {
  const parsed = typeof data === 'string' ? JSON.parse(data) : data;

  return transform(parsed);
};

const isNodeElement = (node: unknown): node is HTMLElement =>
  !!node && typeof (node as HTMLElement).appendChild === 'function';

const reportError = (error: unknown): void => {
  const message = error instanceof Error ? error.message : String(error);

  addError(message);
  // eslint-disable-next-line no-console
  console.error(message);
};

/**
 * Converts `data` with `customSettings` and renders it into `nodeElement`.
 *
 * Never throws for invalid input. If `data` is not valid JSON, the settings
 * are broken or the data cannot be rendered, the error goes to
 * `console.error` and, if `showNotifications` is on, an error notification
 * is rendered into `nodeElement`. No data is rendered in that case.
 * If `nodeElement` is missing, the error is only logged.
 */
export const generate = (
  data: ValueType,
  nodeElement: HTMLElement,
  customSettings?: SettingsType
): void => {
  clearNotifications();

  if (!isNodeElement(nodeElement)) {
    reportError(
      'The second parameter of the "generate" function should be a node element.'
    );
    return;
  }

  let mainElement: HTMLElement | null = null;

  try {
    setSettings(customSettings);
    checkSettings();

    mainElement = renderData(convert(data));
  } catch (error) {
    reportError(error);
  }

  renderNotificationsInto(nodeElement);

  if (mainElement) {
    nodeElement.appendChild(mainElement);
  }
};

export { transform };
