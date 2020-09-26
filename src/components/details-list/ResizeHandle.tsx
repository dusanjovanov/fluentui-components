import clsx from 'clsx'
import React, { Fragment, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import styled from 'styled-components'
import { DetailsListColumn } from './types'
import { dragTypes } from './DetailsList'

type Props = {
  col: DetailsListColumn
  colIndex: number
}

export const ResizeHandle = ({ col, colIndex }: Props) => {
  const [{ isDragging }, dragRef, preview] = useDrag({
    item: { type: dragTypes.DETAILS_LIST_COLUMN_RESIZE, col, colIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      sourceClientOffset: monitor.getSourceClientOffset(),
      clientOffset: monitor.getClientOffset()
    })
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  return (
    <Fragment>
      <Resizer
        onClick={(e) => e.stopPropagation()}
        className={clsx({ isDragging })}
        ref={dragRef}
      >
        <Line />
      </Resizer>
    </Fragment>
  )
}

export const Line = styled.div`
  width: 2px;
  height: 100%;
  background-color: transparent;
`

export const Resizer = styled.div`
  width: 16px;
  height: 100%;
  z-index: 2;
  cursor: col-resize;
  display: flex;
  justify-content: center;
  position: absolute;
  right: -8px;
  &:hover {
    ${Line} {
      background-color: #0078d4;
    }
  }
  &.isDragging {
    ${Line} {
      visibility: hidden;
    }
  }
`
