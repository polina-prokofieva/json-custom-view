import { transform } from '../transform';
import { ValueType } from '../types';

export const convert = (data: ValueType): ValueType => {
  const parsed = typeof data === 'string' ? JSON.parse(data) : data;

  return transform(parsed);
};

export { generate } from './generate';
export { transform };
