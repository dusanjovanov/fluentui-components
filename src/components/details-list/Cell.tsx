import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { GridCellProps } from 'react-virtualized'
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
  const { rowIndex, style } = cellProps
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
      style={{
        ...style,
        textAlign: col.align ? col.align : 'left'
      }}
      className={(rowIndex % 2 !== 0 ? 'odd' : 'even') + ' ' + className}
      data-rowindex={rowIndex}
      {...props}
    >
      {children}
    </Root>
  )
}

export const DefaultCell = styled.div`
  padding: 11px 12px 11px 12px;
`

const Root = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  border-bottom: 1px solid #f3f2f1;
  &.even {
    background-color: ${(p) => p.theme.detailsList.evenRow.background};
    color: ${(p) => p.theme.detailsList.evenRow.text};
  }
  &.odd {
    background-color: ${(p) => p.theme.detailsList.oddRow.background};
    color: ${(p) => p.theme.detailsList.oddRow.text};
  }
  &.hover {
    background-color: ${(p) => p.theme.detailsList.hoverRow.background};
    color: ${(p) => p.theme.detailsList.hoverRow.text};
  }
`
