import { renderData, renderNotificationsInto } from '../render/general';
import { clearNotifications } from '../notifications';
import { setSettings, checkSettings } from '../settings';
import { GenerateResult, SettingsType, ValueType } from '../types';
import { convert } from './api';
import { isNodeElement, getNoDataMessage, reportError } from './helpers';

/**
 * Converts `data` with `customSettings` and renders it into `nodeElement`.
 *
 * Never throws for invalid input. If `data` is not valid JSON, the settings
 * are broken, there is no data at `root` or the data cannot be rendered,
 * the error goes to
 * `console.error` and, if `showNotifications` is on, an error notification
 * is rendered into `nodeElement`. No data is rendered in that case.
 * If `nodeElement` is missing, the error is only logged.
 */
export const generate = (
  data: ValueType,
  nodeElement: HTMLElement,
  customSettings?: SettingsType
): GenerateResult => {
  clearNotifications();

  const result: GenerateResult = {
    isRendered: false,
    errors: []
  };

  if (!isNodeElement(nodeElement)) {
    const isNotNodeElementErrorMessage = 'The second parameter of the "generate" function should be a node element.';

    reportError(isNotNodeElementErrorMessage);
    return {
      isRendered: false,
      errors: [isNotNodeElementErrorMessage]
    };
  }

  let mainElement: HTMLElement | null = null;

  try {
    setSettings(customSettings);
    checkSettings();

    const converted = convert(data);

    if (converted === undefined) {
      throw new Error(getNoDataMessage());
    }

    mainElement = renderData(converted);

    result.isRendered = true;

  } catch (error) {
    result.errors.push(error instanceof Error ? error.message : String(error));
    reportError(error);
  }

  renderNotificationsInto(nodeElement);

  if (mainElement) {
    nodeElement.appendChild(mainElement);
  }

  return result;
};
