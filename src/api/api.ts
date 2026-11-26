import { transform } from '../transform';
import { renderData, renderNotificationsInto } from '../render/general';
import { clearNotifications, addError } from '../notifications';
import { setSettings, checkSettings, getSettings } from '../settings';
import { GenerateResult, SettingsType, ValueType } from '../types';

export const convert = (data: ValueType): ValueType => {
  const parsed = typeof data === 'string' ? JSON.parse(data) : data;

  return transform(parsed);
};

const isNodeElement = (node: unknown): node is HTMLElement =>
  !!node && typeof (node as HTMLElement).appendChild === 'function';

const getNoDataMessage = (): string => {
  const { root } = getSettings();

  return Array.isArray(root) && root.length
    ? `There is no data at root "${root.join('.')}".`
    : 'There is no data to render.';
};

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

export { transform };
