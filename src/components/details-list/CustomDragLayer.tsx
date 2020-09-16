import clsx from 'clsx'
import React from 'react'
import { useDragLayer } from 'react-dnd'
import styled from 'styled-components'

export const CustomDragLayer = () => {
  const { clientOffset, isDragging, canDrop } = useDragLayer((monitor) => {
    let canDrop = true
    const item = monitor.getItem()
    if (item) {
      const colWidth = item.col.width
      const diffClientOffset = monitor.getDifferenceFromInitialOffset()
      if (diffClientOffset) {
        const newWidth = colWidth + diffClientOffset.x
        if (newWidth < 20) canDrop = false
      }
    }
    return {
      clientOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
      canDrop
    }
  })

  if (!isDragging) {
    return null
  }

  return (
    <Root>
      <Line
        style={{ left: clientOffset?.x }}
        className={clsx({ cantDrop: !canDrop })}
      />
    </Root>
  )
}

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
`

export const Line = styled.div`
  width: 2px;
  height: 100%;
  background-color: #0078d4;
  position: absolute;
  cursor: col-resize;
  &.cantDrop {
    background: red;
  }
`
