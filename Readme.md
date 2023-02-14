## Functions

---

`generate(data, root, settings)` - convert `data` according with converting `settings` and render it to `root`.

| **Name**     | **Type**         | **Default** | **Description**                            |
| ------------ | ---------------- | ----------- | ------------------------------------------ |
| **data**     | String or Object | `''`        | a string which is json or an object        |
| **root**     | DOM Element      | `undefined` | a DOM-node where the data will be rendered |
| **settings** | Object           | `{}`        | an object of settings                      |

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
| **keysForArrays**         | Object               | `undefined` | an abject where keys are names of arrays and values are properties which will be shown as keys for corresponding arrays                                                                                                                                                                              |
| **arraysAsTable**         | Array of Strings     | `[]`        | array of keys of parameters which contain an array and which will be presented as a table                                                                                                                                                                                                            |
| **showNotifications**     | Boolean              | `true`      | if it's `true` all **errors** and **warnings** will be visible                                                                                                                                                                                                                                       |

## Usage

---

```
import { generate } from 'json-custom-view';

const root = document.querySelector('#main');

generate(JSONdata, root, settings);
```
