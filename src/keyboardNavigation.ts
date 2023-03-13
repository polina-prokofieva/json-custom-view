import styles from './assets/style.module.less';
import { closeField, isOpen, openField } from './render/object';

type DirectionType = 'up' | 'down' | 'right' | 'left';

const canBeOpen = (fieldElement: HTMLElement): boolean =>
  fieldElement.classList.contains(styles.object) ||
  fieldElement.classList.contains(styles.array);

const verticalNavigation = (
  keys: HTMLElement[],
  currentIndex: number,
  direction: 'up' | 'down'
): void => {
  const nextIndex = direction === 'down' ? currentIndex + 1 : currentIndex - 1;
  keys[nextIndex]?.focus();
};

const openAndClose = (
  fieldElement: HTMLElement,
  direction: 'right' | 'left'
): void => {
  direction === 'right' ? openField(fieldElement) : closeField(fieldElement);
};

const getAllVisibleKeys = (mainElement: HTMLElement): HTMLElement[] => {
  const fields = [...mainElement.children];

  const keys: HTMLElement[] = fields
    .map((fieldNode: HTMLElement) => {
      const ownKey = fieldNode.querySelector<HTMLElement>(`.${styles.key}`);
      if (isOpen(fieldNode)) {
        return [
          ownKey,
          ...getAllVisibleKeys(fieldNode.querySelector(`.${styles.value}`)),
        ];
      } else {
        return ownKey;
      }
    })
    .flat();

  return keys;
};

export const onKeyPress = (
  evt: KeyboardEvent,
  mainElement: HTMLElement
): void => {
  if (!evt.key.includes('Arrow')) return;

  const activeElement = document.activeElement as HTMLElement;
  const direction = evt.key
    .replace('Arrow', '')
    .toLocaleLowerCase() as DirectionType;

  const fieldElement = activeElement?.parentElement;
  const allVisibleKeys = getAllVisibleKeys(mainElement);
  const indexOfFocusElement = allVisibleKeys.indexOf(activeElement);

  if (indexOfFocusElement === -1) {
    allVisibleKeys[0].focus();
    return;
  }

  if (direction === 'up' || direction === 'down') {
    verticalNavigation(allVisibleKeys, indexOfFocusElement, direction);
    return;
  }

  if (!canBeOpen(fieldElement)) return;

  openAndClose(fieldElement, direction as 'right' | 'left');
};
