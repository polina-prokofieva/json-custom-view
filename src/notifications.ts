import { NotificationType, NotificationObjectType } from './types';

export const notifications: NotificationObjectType[] = [];

export const addNotification = (type: NotificationType, text: string): void => {
  const notification: NotificationObjectType = { type, text };

  if (type === 'warning') {
    notifications.push(notification);
  } else {
    notifications.unshift(notification);
  }
};

export const addWarning = (text: string): void => {
  addNotification('warning', text);
};

export const addError = (text: string): void => {
  addNotification('error', text);
};

export const clearNotifications = (): void => {
  notifications.splice(0, notifications.length);
};
