export const valueAppearence = (
  value: any,
  {
    nullAppearence,
    boolAppearence,
  }: { nullAppearence?: string; boolAppearence?: [string, string] }
): any => {
  if (boolAppearence && typeof value === 'boolean') {
    return boolAppearence[+value];
  }

  if (nullAppearence && value === null) {
    return nullAppearence;
  }

  return value;
};
