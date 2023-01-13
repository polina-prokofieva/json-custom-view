const types = ['warning', 'error'];

export const notifications = [
  {
    type: types[0],
    text: "You can hide all warning notifications. But it's recommended to keep them visible during development process",
  },
];

export const addNotification = (type, text) => {
  if (type === types[0]) {
    notifications.push({ type, text });
  } else {
    notifications.unshift({ type, text });
  }
};
