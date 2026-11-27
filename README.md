# json-custom-view

[![npm version](https://img.shields.io/npm/v/json-custom-view.svg)](https://www.npmjs.com/package/json-custom-view)
[![npm downloads](https://img.shields.io/npm/dm/json-custom-view.svg)](https://www.npmjs.com/package/json-custom-view)
[![license](https://img.shields.io/npm/l/json-custom-view.svg)](https://github.com/polina-prokofieva/json-custom-view/blob/main/packages/core/package.json)
[![CI](https://github.com/polina-prokofieva/json-custom-view/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/polina-prokofieva/json-custom-view/actions/workflows/test.yml)

A customizable JSON viewer for the browser. It renders JSON data as a collapsible HTML tree or tables, with settings to hide, format and transform values. Written in TypeScript, with no runtime dependencies.

Try it in the [demo app](https://polina-prokofieva.github.io/json-custom-view-app/) ([source code](https://github.com/polina-prokofieva/json-custom-view-app)).

## Packages

This repository is a monorepo with these packages:

| Package | Folder | Description |
| ------- | ------ | ----------- |
| [`json-custom-view`](https://www.npmjs.com/package/json-custom-view) | [`packages/core`](packages/core) | The viewer itself. Framework independent. **Full documentation is in its [README](packages/core/README.md).** |
| `@json-custom-view/react` | [`packages/react`](packages/react) | React component that wraps the viewer. Not published yet. |

## Quick start

```sh
npm install json-custom-view
```

```js
import { generate } from 'json-custom-view';

generate({ name: 'Harry', house: 'Gryffindor' }, document.querySelector('#main'), { isFormatKeys: true });
```

See the [json-custom-view README](packages/core/README.md) for every function and setting.

## Contributing

Bug reports, ideas and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) to get started, and please follow the [Code of Conduct](CODE_OF_CONDUCT.md). To report a security issue, see [SECURITY.md](SECURITY.md).
