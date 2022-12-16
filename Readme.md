# view-json doc draft

`transform(data, settings)` - convert `data` according with converting `settings`.

**`data`** - an object
**`settings`** - an object of settings

## Settings Syntax

**`settings`** shoud have next fromat:

```
{
  "root": "",
  "formatKeys": false,
  "formatDate": false,
  "nullAppearence": "-",
  "boolAppearence": ["No", "Yes"],
  "hidePropertiesByValue": [
    null,
    0,
    ""
  ],
  "hidePropertiesByKey": [
    "OverdraftLimit",
    "Description",
    "Id"
  ],
  "dateAppearence": {
    "keys": [
      "Date"
    ]
  },
  "arraysAsTable": [
    "Transactions"
  ],
  "keysForArrays": {
    "Accounts": "Title"
  }
}
```

**`root`** — root of json which should be presented. Could be `string` or `array`. If it is `""` the whole json will be presented. If it is a `string` will be returned `data[root]`. `Array` is a path to concrete value. E.g. if to use `['key1', 'key2', ... 'keyn']` you will get `data[key1][key2]...[keyn]`.

**`formatKeys`** — if it is **`true`** all keys in CamesCase, snake_case and kebab-case will be formatted to separate words.

<!-- **`formatDate`** — format of date values. -->

**`nullAppearence`** — string by which will be replaced **`null`** values.

**`boolAppearence`** — array of strings by which will be replased **`true`** and **`false`** values.

**`hidePropertiesByValue`** — array of values by which will be hided parameters of your json.

**`hidePropertiesByKey`** — array of keys by which will be hided parameters of your json.

<!-- **`dateAppearence`** — key which will be detected as date. -->

<!-- **`arraysAsTable`** — array of keys of parameters which contain an array and which will be presented as a table. -->

<!-- **`keysForArrays`** — an abject where keys are names of arrays and values are properties which will be shown as keys for corresponding arrays. -->
