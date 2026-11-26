# json-custom-view

[![npm version](https://img.shields.io/npm/v/json-custom-view.svg)](https://www.npmjs.com/package/json-custom-view)
[![npm downloads](https://img.shields.io/npm/dm/json-custom-view.svg)](https://www.npmjs.com/package/json-custom-view)
[![license](https://img.shields.io/npm/l/json-custom-view.svg)](https://github.com/polina-prokofieva/json-custom-view/blob/main/package.json)
[![CI](https://github.com/polina-prokofieva/json-custom-view/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/polina-prokofieva/json-custom-view/actions/workflows/test.yml)

The JavaScript (frontend module) which process JSON data and render it on a web page with various settings.

## Demo

---

Try it in the [demo app](https://polina-prokofieva.github.io/json-custom-view-app/) ([source code](https://github.com/polina-prokofieva/json-custom-view-app)).

## Functions

---

`generate(data, root, settings)` - convert `data` according with converting `settings` and render it to `root`.

| **Name**     | **Type**         | **Default** | **Description**                            |
| ------------ | ---------------- | ----------- | ------------------------------------------ |
| **data**     | String or Object | `''`        | a string which is json or an object        |
| **root**     | DOM Element      | `undefined` | a DOM-node where the data will be rendered |
| **settings** | Object           | `{}`        | an object of settings                      |

`generate` doesn't throw for invalid input. If `data` is not valid JSON, there is no data at `root`, or it can't be converted or rendered, the error is logged with `console.error` and shown as an error notification in `root` (unless `showNotifications` is `false`). In that case no data is rendered. If `root` is missing, the error is only logged.

---

`transform(data, settings)` - convert `data` according with converting `settings`. Returns converted Object.

| **Name**     | **Type** | **Default** | **Description**       |
| ------------ | -------- | ----------- | --------------------- |
| **data**     | Object   | `''`        | an object             |
| **settings** | Object   | `{}`        | an object of settings |

## Fields of settings object

---

| **Name**                  | **Type**             | **Default** | **Description**                                                                                                                                                                                                                                                                                      |
| ------------------------- | -------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **root**                  | String or Array      | `''`        | root of json which should be presented. Could be `string` or `array`. If it is `""` the whole json will be presented. If it is a `string` will be returned `data[root]`. `Array` is a path to concrete value. E.g. if to use `['key1', 'key2', ... 'keyn']` you will get `data[key1][key2]...[keyn]` |
| **isFormatKeys**          | Boolean              | `false`     | if it is `true` all keys in CamesCase, snake_case, and kebab-case will be formatted to separate words                                                                                                                                                                                                |
| **nullAppearence**        | String               | `undefined` | string by which will be replaced `null` values                                                                                                                                                                                                                                                       |
| **boolAppearence**        | Array of two Strings | `undefined` | array of strings by which will be replaced `true` and `false` values                                                                                                                                                                                                                                 |
| **hidePropertiesByValue** | Array of Strings     | `undefined` | array of values by which will be hided parameters of your json                                                                                                                                                                                                                                       |
| **hidePropertiesByKey**   | Array of Strings     | `undefined` | array of keys by which will be hided parameters of your json                                                                                                                                                                                                                                         |
| **hideEmpty**             | Boolean              | `true`      | hide fields with an empty object and empty arrays as a value. Fields could also become empty after hiding inner fields                                                                                                                                                                               |
| **isMergeSingleFields**   | Boolean              | `false`     | if there is only one field in an Object or only one element is in an Array it merges to parents field                                                                                                                                                                                                |
| **keysForArrays**         | Object               | `undefined` | an object where keys are names of arrays and values are properties which will be shown as keys for corresponding arrays. For the root array use the last key of `root`, or `''` if `root` is not set (see [Root arrays](#root-arrays))                                                                                                                                                                              |
| **arraysAsTable**         | Array of Strings     | `[]`        | array of keys of parameters which contain an array of objects and which will be presented as a table. For the root array use the last key of `root`, or `''` if `root` is not set (see [Root arrays](#root-arrays))                                                                                                                                                                                                            |
| **showNotifications**     | Boolean              | `true`      | if it's `true` all **errors** and **warnings** will be visible                                                                                                                                                                                                                                       |
| **capitalizeKeys**        | Boolean              | `undefined` | if it's `true` all **keys** will start from capital letter                                                                                                                                                                                                                                           |

## Usage

---

```
import { generate } from 'json-custom-view';

const root = document.querySelector('#main');

generate(JSONdata, root, settings);
```

## Keyboard navigation

---

Keys of the rendered data can be focused with <kbd>Tab</kbd>. While focus is inside the rendered view, <kbd>↑</kbd> and <kbd>↓</kbd> move between visible keys, and <kbd>→</kbd> and <kbd>←</kbd> open and close objects and arrays.

Arrow keys pressed outside the view are not handled, so they keep working as usual on the rest of the page (scrolling, inputs). Before version 1.2.1 the view listened for arrow keys on the whole page.

## Root arrays

---

When the rendered data is an array, `arraysAsTable` and `keysForArrays` refer to it by the last key of `root`. If `root` is not set, the key is `''`.

```
// data: { addresses: [{ city: 'Kyiv', street: '...' }, ...] }

// show the addresses as a table
generate(data, root, { root: 'addresses', arraysAsTable: ['addresses'] });

// show the addresses as a list, using `city` as each element's key
generate(data, root, { root: 'addresses', keysForArrays: { addresses: 'city' } });

// data is the array itself
generate(addresses, root, { arraysAsTable: [''] });
```

## Contributing

---

Bug reports, ideas and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) to get started, and please follow the [Code of Conduct](CODE_OF_CONDUCT.md). To report a security issue, see [SECURITY.md](SECURITY.md).
