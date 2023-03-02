export interface keysForArraysType {
  [key: string]: string;
}

export type RootType = string | string[];

export interface SettingsType {
  [key: string]: any;
  root?: RootType;
  isFormatKeys?: boolean;
  nullAppearence?: string;
  boolAppearence?: [string, string];
  hidePropertiesByValue?: string[];
  hidePropertiesByKey?: string[];
  hideEmpty?: boolean;
  isMergeSingleFields?: boolean;
  keysForArrays?: keysForArraysType;
  arraysAsTable?: string[];
  showNotifications?: boolean;
}

export type KeysMap = { [key: string]: string };

export interface InnerSettingsType {
  keysDict: KeysMap;
  keysOldToNew: KeysMap;
}

export type NotificationType = 'warning' | 'error';

export interface NotificationObjectType {
  type: NotificationType;
  text: string;
}

export type ValueType =
  | string
  | number
  | boolean
  | null
  | ValueType[]
  | ObjectValueType;

export type ObjectValueType = { [key: string]: ValueType };

export type ArrayOrObjectValueType = ValueType[] | ObjectValueType;
