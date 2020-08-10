import { Pivot, PivotItem } from 'office-ui-fabric-react'
import React from 'react'
import { DetailsListExample } from './DetailsListExample'
import { FluentReactSelectAsyncExample } from './FluentReactSelectAsyncExample'
import { FluentReactSelectExample } from './FluentReactSelectExample'
import { InfiniteDetailsListExample } from './InfiniteDetailsListExample'

const App = () => {
  return (
    <>
      <Pivot>
        <PivotItem headerText='React Select'>
          <FluentReactSelectExample />
          <FluentReactSelectAsyncExample />
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
    </>
  )
}

export default App
