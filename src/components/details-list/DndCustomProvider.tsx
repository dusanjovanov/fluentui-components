import React, { createContext, useState } from 'react'
import { DndProvider } from 'react-dnd'

export const DndContext = createContext([{}, () => {}])

export const DndCustomProvider = (props: any) => {
  const [state, setState] = useState({ dragging: false })

  return (
    <DndProvider backend={props.backend}>
      <DndContext.Provider value={[state, setState]}>
        {props.children}
      </DndContext.Provider>
    </DndProvider>
  )
}
