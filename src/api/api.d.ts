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
    [key: string]: unknown;
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

  /**
   * Converts `data` with `customSettings` and renders it into `nodeElement`.
   *
   * Never throws for invalid input. If `data` is not valid JSON, the settings
   * are broken, there is no data at `root` or the data cannot be rendered,
   * the error goes to `console.error` and, if `showNotifications` is on, an
   * error notification is rendered into `nodeElement`. No data is rendered
   * in that case. If `nodeElement` is missing at runtime, the error is only
   * logged.
   *
   * Arrow-key navigation is handled only while focus is inside the
   * rendered view.
   */
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
