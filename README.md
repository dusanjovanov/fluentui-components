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

```javascript
import { DetailsList } from 'fluentui-components'

const [cols, setCols] = useState([
  {
    key: 'column1',
    label: 'Column 1',
    width: 300,
  }
  ...
])

const [rows, setRows] = useState([...])

<DetailsList
  id='myList'
  cols={cols}
  rows={rows}
  columnCount={cols.length}
  rowCount={rows.length}
  columnWidth={({ index }: any) => cols[index].width}
  fixedColumnCount={fixedCols}
  height={500}
  width={width}
  rowHeight={40}
  onSectionRendered={() => {
    // do something when new part of table is rendered
    // e.g. ReactTooltip.rebuild() if you use react-tooltip library which I recommend
  }}
  onClickCell={({ row, col }) => {
    // do something with cell or row
  }}
  sort={sort}
  onClickHeader={({ col }: any) => {
    // do something with header cell
  }}
  isLoading={isLoading}
  noDataMessage='No data to show'
  onResizeCol={({ col, x }: any) => {
    // update columns state with the new column width
    // x is actually deltaX 
  }}
/>
```

Features:

- Horizontal scrolling
- Fixed columns
- Sort (controlled - you're gonna have to pass the sort state, and update it yourself. You can update sort state in `onClickHeaderCell` callback)
- Column resize (controlled - `onResizeCol` callback)

### InfiniteDetailsList

Like `DetailsList` but with infinite scroll

```javascript
import { InfiniteDetailsList } from 'fluentui-components'

<InfiniteDetailsList 
  ...allStandardDetailsListProps
  loadRows={async ({startIndex, stopIndex}) => {
    const skip = startIndex;
    const top = stopIndex - startIndex;
    const res = await API.getData(skip, top);
    // if res.data is an array
    return res.data;
  }}
  // just put an absurdely large number here
  rowCount={1000000}
  // if you want to fetch 30 by 30 rows, then you give 31 as min batch size (because we do stopIndex - startIndex to calculate top)
  // if you wanted 50 by 50 you would put 51 here
  minimumBatchSize={31}
  // threshold 15 means when there are 15 rows which are not visible (not yet been scrolled to), call loadRows 
  threshold={15}
/>

```

### CheckboxDropdown

A dropdown with a checkbox list that is optionally searchable. Can be used to filter a list for example.

### FluentReactSelect

Props to pass to a `react-select` `Select` component. It styles the `Select` in FluentUI's style. <br />
If you want to pass additional custom styles to `Select` you can do so like this:

```javascript
import Select, { mergeStyles } from 'react-select'

<Select
  styles={mergeStyles(FluentReactSelect.styles, yourStyles)}
  {...FluentReactSelect}
/>

```

### Select and AsyncSelect - Recommended

Standalone Select and AsyncSelect components with FluentReactSelect styles,theme and components props automatically merged with your own.
Your props override the FluentReactSelect ones.

```javascript
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

You have to wrap your app with the `DragAndDrop` component exported from this package. Internally it renders `DndProvider` from `react-dnd` package.
It's used for resizing columns.

## License

MIT © [dusanjovanov](https://github.com/dusanjovanov)
