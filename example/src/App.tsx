import { Pivot, PivotItem } from 'office-ui-fabric-react'
import React from 'react'
import { DetailsListExample } from './DetailsListExample'
import { FluentReactSelectAsyncExample } from './FluentReactSelectAsyncExample'
import { FluentReactSelectExample } from './FluentReactSelectExample'
import { InfiniteDetailsListExample } from './InfiniteDetailsListExample'
import { CheckboxDropdownExample } from './CheckboxDropdownExample'
import { DragAndDrop } from 'fluentui-components'

const App = () => {
  return (
    <DragAndDrop>
      <Pivot>
        <PivotItem headerText='React Select'>
          <FluentReactSelectExample />
          <FluentReactSelectAsyncExample />
        </PivotItem>
        <PivotItem headerText='Checkbox Dropdown'>
          <CheckboxDropdownExample />
        </PivotItem>
        <PivotItem headerText='Details List'>
          <Pivot>
            <PivotItem headerText='Details List'>
              <DetailsListExample />
            </PivotItem>{' '}
            <PivotItem headerText='Infinite Details List'>
              <InfiniteDetailsListExample />
            </PivotItem>
          </Pivot>
        </PivotItem>
      </Pivot>
    </DragAndDrop>
  )
}

export default App
