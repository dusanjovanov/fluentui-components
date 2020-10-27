# fluentui-components

> Additional components for the FluentUI (Fabric) React library

[![NPM](https://img.shields.io/npm/v/fluentui-components.svg)](https://www.npmjs.com/package/fluentui-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save fluentui-components
```

or

```bash
yarn add fluentui-components
```

---

## Components

### DetailsList

It's `react-virtualized`'s MultiGrid styled like FluentUI's DetailsList.

Features:

- Horizontal scrolling
- Fixed columns
- Sort (controlled - you're gonna have to pass the sort state, and update it yourself. You can update sort state in `onClickHeaderCell` callback)
- Column resize (controlled - `onResizeCol` callback)

### InfiniteDetailsList

Like `DetailsList` but with infinite scroll

### CheckboxDropdown

A dropdown with a checkbox list that is optionally searchable. Can be used to filter a list for example.

### FluentReactSelect

Props to pass to a `react-select` `Select` component. It styles the `Select` in FluentUI's style. <br />
If you want to pass additional custom styles to `Select` you can do so like this:

```
    import Select, {mergeStyles} from 'react-select'

    <Select
       styles={
           mergeStyles(
               FluentReactSelect.styles,
               yourStyles
           )
       }
       {...FluentReactSelect}
     />
```

### Select and AsyncSelect - Recommended

Standalone Select and AsyncSelect components with FluentReactSelect styles,theme and components props automatically merged with your own.
Your props override the FluentReactSelect ones.

```
  import {Select} from 'fluentui-components'

    <Select
       value={...}
       onChange={() => ...}
       options={[]}
       styles={{
         control: (p) => {
           return {
             ...p,
             backgroundColor: "red"
           }
         }
       }}
       ...
     />
```

---

## Roadmap

- Remove `styled-components` as a dependency and write style in plain css or scss.
- FluentReactSelect: Instead of exporting props to apply to a `Select` component, export the entire component with styles applied already and
  add auto windowing to the dropdown list if the list is larger than say, 300 items.

## ⚠️ Note

You have to wrap your app with the `DragAndDrop` component exported from this package. Internally it render `DndProvider` from `react-dnd` package.
It's used for resizing columns.

## License

MIT © [dusanjovanov](https://github.com/dusanjovanov)
