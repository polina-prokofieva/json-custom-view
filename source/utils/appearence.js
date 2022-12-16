export const valueAppearence = (value, { nullAppearence, boolAppearence }) => {
  if (boolAppearence && typeof value === 'boolean') {
    return boolAppearence[+value];
  }

  if (nullAppearence && value === null) {
    return nullAppearence;
  }

  return value;
};
