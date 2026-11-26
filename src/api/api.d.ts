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

  export interface GenerateResultType {
    /** `true` if the data was rendered into `nodeElement`. */
    isRendered: boolean;
    /** Error messages collected during the call; empty on success. */
    errors: string[];
  }

  /**
   * Converts `data` with `customSettings` and renders it into `nodeElement`.
   *
   * Returns a `GenerateResultType`: `isRendered` tells whether the data was
   * rendered, and `errors` lists the error messages from the call (empty on
   * success). Warnings are not included in `errors`.
   *
   * Still never throws for invalid input. If `data` is not valid JSON, the
   * settings are broken, there is no data at `root` or the data cannot be
   * rendered, the error is reported in `errors`, goes to `console.error`
   * and, if `showNotifications` is on, an error notification is rendered
   * into `nodeElement`. No data is rendered in that case. If `nodeElement`
   * is missing at runtime, the error is reported in `errors` and logged,
   * but nothing is rendered.
   *
   * Arrow-key navigation is handled only while focus is inside the
   * rendered view.
   */
  export const generate: (
    data: ValueType,
    nodeElement: HTMLElement,
    customSettings?: SettingsType
  ) => GenerateResultType;

  export const transform: (
    data: ValueType,
    customSettings?: SettingsType
  ) => object;
}
