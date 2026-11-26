import { addError } from '../notifications';
import { getSettings } from '../settings';

export const isNodeElement = (node: unknown): node is HTMLElement =>
  !!node && typeof (node as HTMLElement).appendChild === 'function';

export const getNoDataMessage = (): string => {
  const { root } = getSettings();

  return Array.isArray(root) && root.length
    ? `There is no data at root "${root.join('.')}".`
    : 'There is no data to render.';
};

export const reportError = (error: unknown): void => {
  const message = error instanceof Error ? error.message : String(error);

  addError(message);
  // eslint-disable-next-line no-console
  console.error(message);
};
