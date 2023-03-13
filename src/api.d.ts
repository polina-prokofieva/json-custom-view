declare module 'json-custom-view' {
  export type ValueType =
    | string
    | number
    | boolean
    | null
    | ValueType[]
    | ObjectValueType;

  export type ObjectValueType = { [key: string]: ValueType };

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
    capitalizeKeys?: boolean;
  }

  export const generate: (
    data: ValueType,
    nodeElement: HTMLElement,
    customSettings?: SettingsType
  ) => void;

  export const transform: (
    data: ValueType,
    customSettings?: SettingsType
  ) => object;
}
