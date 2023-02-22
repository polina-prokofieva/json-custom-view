import { getNewKeyFromOld } from '../settings';
import { KeysMap } from '../types';

const removeAbbrFromBegin = (word: string): string => {
  const count = (word.match(/[A-Z]/g) || []).length;
  const isAbbr = /^[A-Z]+$/.test(word);

  if (count > 1 && !isAbbr) {
    return word.slice(0, count - 1) + ' ' + word.slice(count - 1);
  }

  return word;
};

export const convertKey = (key: string): string => {
  const words = key.split(/[\s_\-]/);
  const nonEmptyWords = words.filter((word) => word);
  const wordPattern = /([A-Z]+$)|(\d+[a-z]+)|(\d+)|(((^[a-z])|[A-Z]+)[a-z]*)/g;
  let parts: string[] = [];

  for (let word of nonEmptyWords) {
    const newParts = word.match(wordPattern) || [word];
    parts = parts.concat(newParts);
  }

  return parts ? parts.map((word) => removeAbbrFromBegin(word)).join(' ') : key;
};

export const convertByMask = (
  value: { [key: string]: any },
  mask: string,
  keysOldToNew: KeysMap = {}
): string => {
  const partPattern = /\{([\w\.\@\#\*])+?\}/g;

  if (mask.search(partPattern) === -1) {
    return value[keysOldToNew[mask] || mask] || '-';
  }

  const key = mask.replace(partPattern, (part) => {
    const path = part.slice(1, -1).split('.');

    let convertedKey = value[getNewKeyFromOld(path[0])];

    for (let i = 1; i < path.length; i++) {
      const actualKey = getNewKeyFromOld(path[i]);
      if (convertedKey && convertedKey[actualKey]) {
        convertedKey = convertedKey[actualKey];
      } else {
        convertedKey = '-';
        break;
      }
    }

    return convertedKey || '-';
  });

  return key;
};
