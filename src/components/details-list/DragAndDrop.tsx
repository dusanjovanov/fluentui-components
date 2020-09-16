import { DndProvider, createDndContext } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import React, { Fragment, ReactNode, useRef } from 'react'

const RNDContext = createDndContext(HTML5Backend)

function useDNDProviderElement({ children }: { children: ReactNode }) {
  const manager = useRef(RNDContext)

  if (!children) return null

  return (
    <DndProvider manager={manager.current.dragDropManager!}>
      {children}
    </DndProvider>
  )
}

export default function DragAndDrop(props: any) {
  const DNDElement = useDNDProviderElement(props)
  return <Fragment>{DNDElement}</Fragment>
}
