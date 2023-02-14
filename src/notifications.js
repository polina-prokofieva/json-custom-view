const types = ['warning', 'error'];

export const notifications = [];

export const addNotification = (type, text) => {
  if (type === types[0]) {
    notifications.push({ type, text });
  } else {
    notifications.unshift({ type, text });
  }
};

export const addWarning = text => {
  addNotification('warning', text);
};

export const addError = text => {
  addNotification('error', text);
};

export const clearNotifications = () => {
  notifications.splice(0, notifications.length);
};
