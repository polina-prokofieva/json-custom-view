# @json-custom-view/react

React component for [json-custom-view](https://www.npmjs.com/package/json-custom-view), a customizable JSON viewer that renders JSON as a collapsible tree or tables.

```sh
npm install @json-custom-view/react
```

## Usage

```jsx
import { useMemo } from 'react';
import { JsonCustomView } from '@json-custom-view/react';

export const Viewer = ({ data }) => {
  const settings = useMemo(() => ({ isFormatKeys: true, hideEmpty: true }), []);

  return (
    <JsonCustomView
      data={data}
      settings={settings}
      className="json-viewer"
      onRender={({ isRendered, errors }) => {
        if (!isRendered) console.warn(errors);
      }}
    />
  );
};
```

## Props

| **Name**     | **Type**                                 | **Description**                                                                                                                                                                 |
| ------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **data**     | String or Object                         | JSON string or parsed value to render                                                                                                                                           |
| **settings** | Object                                   | [json-custom-view settings](https://github.com/polina-prokofieva/json-custom-view/tree/main/packages/core#fields-of-settings-object). Keep it stable (for example with `useMemo`), because a new object renders the view again |
| **onRender** | `(result: GenerateResultType) => void`   | called after every render with the result of `generate`                                                                                                                         |
| other props  | `<div>` attributes                       | passed to the wrapping `<div>`, for example `className`, `style` or `id`                                                                                                        |

The view is rendered again when `data` or `settings` change. React 17 or newer is required.
