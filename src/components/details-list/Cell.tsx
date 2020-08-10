import React, { ReactNode } from 'react'
import { GridCellProps } from 'react-virtualized'
import styled from 'styled-components'
import { DetailsListColumn } from './types'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  cellProps: GridCellProps
  children: ReactNode
  col: DetailsListColumn
}

export const Cell = ({
  cellProps,
  children,
  className,
  col,
  ref,
  style: _style,
  ...props
}: Props) => {
  const { rowIndex, columnIndex, style } = cellProps
  return (
    <Root
      onMouseOver={() => {
        document
          .querySelectorAll('.hover')
          .forEach((el) => (el as HTMLElement).classList.remove('hover'))
        document
          .querySelectorAll(`[data-rowindex="${rowIndex}"]`)
          .forEach((el) => {
            ;(el as HTMLElement).classList.add('hover')
          })
      }}
      style={style}
      className={((rowIndex - 1) % 2 !== 0 ? 'odd' : 'even') + ' cell'}
      data-columnindex={columnIndex}
      data-rowindex={rowIndex}
      data-columnkey={col.key}
      {...props}
    >
      {children}
    </Root>
  )
}

export const DefaultCell = styled.div<{ justifyContent: string }>`
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 100%;
  justify-content: ${(p) => p.justifyContent};
`

const Root = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  border-bottom: 1px solid #f3f2f1;
  box-sizing: border-box;
  &.hover {
    background-color: #f3f2f1;
  }
`
