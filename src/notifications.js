const types = ['warning', 'error'];

export const notifications = [];

export const addNotification = (type, text) => {
  if (type === types[0]) {
    notifications.push({ type, text });
  } else {
    notifications.unshift({ type, text });
  }
};
